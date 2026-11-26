# Google Sheets demo-request webhook

The landing-page form sends validated submissions through the Next.js server to a Google Apps Script web app. The webhook secret stays server-side.

## One-time Google setup

1. Open the target spreadsheet and choose **Extensions → Apps Script**.
2. Replace the editor contents with `demo-requests.gs` from this folder.
3. In **Project Settings → Script properties**, add `WEBHOOK_SECRET` with a long random value.
4. Run `setupDemoRequestsSheet` once and approve the requested permissions. It creates the `Leads` tab and its seven-column header row without replacing an existing non-empty header.
5. Choose **Deploy → New deployment → Web app**.
6. Set **Execute as** to **Me** and **Who has access** to **Anyone**, then deploy.
7. Copy the deployment URL ending in `/exec`.

## Website environment variables

Add these variables locally and in the Vercel project. Do not prefix either variable with `NEXT_PUBLIC_`.

```text
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
GOOGLE_SHEETS_WEBHOOK_SECRET=the-same-random-value-from-script-properties
```

Restart the local development server after adding or changing environment variables. Redeploy the Vercel project after configuring production variables.

When the Apps Script code changes, create a new deployment version so the live `/exec` endpoint uses the update.

## SMTP lead notifications

The Next.js demo-enquiry route sends a notification after Google Sheets confirms that a new row was saved. Add these server-only variables locally and in Vercel:

```text
SMTP_HOST=mail.example.com
SMTP_PORT=465
SMTP_USER=info@endpointleads.com
SMTP_PASSWORD=your-mailbox-password-or-app-password
SMTP_FROM="EndPoint Clients Website <info@endpointleads.com>"
LEAD_NOTIFICATION_EMAIL=info@endpointleads.com
```

Use port `465` for implicit TLS or `587` for STARTTLS. Never prefix these variables with `NEXT_PUBLIC_`. If SMTP is unavailable, the lead remains saved in Google Sheets and the failure is written to the server logs.
