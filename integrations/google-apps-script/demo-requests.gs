const SPREADSHEET_ID = "1ZGfHDDIVlZjpJEtzzG95_BHKuPFqBJsny6tPWclWKeY";
const SHEET_NAME = "Demo Requests";
const HEADERS = [
  "Timestamp",
  "Business name",
  "Team size",
  "Challenge",
  "Full name",
  "Phone",
  "Email",
  "Source",
  "Status",
  "Request ID",
];

function setupDemoRequestsSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  const currentHeaders = sheet.getRange(1, 1, 1, HEADERS.length).getDisplayValues()[0];
  if (currentHeaders.some((value) => value) && currentHeaders.join("|") !== HEADERS.join("|")) {
    throw new Error("The Demo Requests header row already contains different columns.");
  }

  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.getRange(1, 1, 1, HEADERS.length)
    .setBackground("#f1f3f4")
    .setFontWeight("bold")
    .setFontColor("#202124");
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, HEADERS.length);
}

function doPost(event) {
  const lock = LockService.getScriptLock();

  try {
    const payload = JSON.parse(event.postData.contents);
    const expectedSecret = PropertiesService.getScriptProperties().getProperty("WEBHOOK_SECRET");

    if (!expectedSecret || payload.secret !== expectedSecret) {
      return jsonResponse_({ ok: false, error: "Unauthorized" });
    }

    validatePayload_(payload);
    lock.waitLock(10000);

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) {
      throw new Error("Run setupDemoRequestsSheet before accepting submissions.");
    }

    if (isDuplicate_(sheet, payload.requestId)) {
      return jsonResponse_({ ok: true, duplicate: true });
    }

    sheet.appendRow([
      new Date(payload.submittedAt),
      safeCell_(payload.businessName),
      safeCell_(payload.teamSize),
      safeCell_(payload.challenge),
      safeCell_(payload.fullName),
      safeCell_(payload.phone),
      safeCell_(payload.email),
      safeCell_(payload.source),
      safeCell_(payload.status),
      safeCell_(payload.requestId),
    ]);

    return jsonResponse_({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse_({ ok: false, error: "Unable to save the request." });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function validatePayload_(payload) {
  const required = [
    "requestId",
    "submittedAt",
    "businessName",
    "teamSize",
    "challenge",
    "fullName",
    "phone",
    "email",
    "source",
    "status",
  ];

  required.forEach((field) => {
    if (typeof payload[field] !== "string" || !payload[field].trim()) {
      throw new Error(`Missing field: ${field}`);
    }
  });
}

function isDuplicate_(sheet, requestId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;

  return Boolean(
    sheet
      .getRange(2, 10, lastRow - 1, 1)
      .createTextFinder(requestId)
      .matchEntireCell(true)
      .findNext(),
  );
}

function safeCell_(value) {
  const text = String(value).trim();
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

function jsonResponse_(body) {
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
