const TEAM_SIZES = new Set(["2–10", "11–25", "25–50", "50+"]);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REQUEST_ID_PATTERN = /^[0-9a-f-]{36}$/i;

type DemoEnquiry = {
  businessName: string;
  teamSize: string;
  challenge: string;
  fullName: string;
  phone: string;
  email: string;
  website?: string;
  requestId: string;
};

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isValidEnquiry(value: unknown): value is DemoEnquiry {
  if (!value || typeof value !== "object") return false;

  const enquiry = value as Record<string, unknown>;
  return (
    isString(enquiry.businessName) && enquiry.businessName.trim().length >= 2 && enquiry.businessName.trim().length <= 120 &&
    isString(enquiry.teamSize) && TEAM_SIZES.has(enquiry.teamSize) &&
    isString(enquiry.challenge) && enquiry.challenge.trim().length >= 2 && enquiry.challenge.trim().length <= 1000 &&
    isString(enquiry.fullName) && enquiry.fullName.trim().length >= 2 && enquiry.fullName.trim().length <= 120 &&
    isString(enquiry.phone) && enquiry.phone.trim().length >= 7 && enquiry.phone.trim().length <= 30 &&
    isString(enquiry.email) && enquiry.email.length <= 254 && EMAIL_PATTERN.test(enquiry.email.trim()) &&
    isString(enquiry.requestId) && REQUEST_ID_PATTERN.test(enquiry.requestId) &&
    (enquiry.website === undefined || isString(enquiry.website))
  );
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isValidEnquiry(body)) {
    return Response.json({ error: "Please check the submitted details." }, { status: 400 });
  }

  // Silently accept bot submissions so the honeypot cannot be probed.
  if (body.website?.trim()) {
    return Response.json({ ok: true });
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const webhookSecret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;

  if (!webhookUrl || !webhookSecret) {
    console.error("Google Sheets webhook environment variables are not configured.");
    return Response.json({ error: "Demo requests are temporarily unavailable." }, { status: 503 });
  }

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: webhookSecret,
        requestId: body.requestId,
        submittedAt: new Date().toISOString(),
        businessName: body.businessName.trim(),
        teamSize: body.teamSize,
        challenge: body.challenge.trim(),
        fullName: body.fullName.trim(),
        phone: body.phone.trim(),
        email: body.email.trim().toLowerCase(),
        source: "landing-page-demo",
        status: "New",
      }),
      cache: "no-store",
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });

    if (!webhookResponse.ok) {
      console.error("Google Sheets webhook returned a non-success status.", webhookResponse.status);
      return Response.json({ error: "The request could not be saved." }, { status: 502 });
    }

    const result = (await webhookResponse.json()) as { ok?: boolean; error?: string };
    if (!result.ok) {
      console.error("Google Sheets webhook rejected the request.", result.error);
      return Response.json({ error: "The request could not be saved." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Google Sheets webhook request failed.", error);
    return Response.json({ error: "The request could not be saved." }, { status: 502 });
  }
}
