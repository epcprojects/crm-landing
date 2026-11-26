const SPREADSHEET_ID = "1ZGfHDDIVlZjpJEtzzG95_BHKuPFqBJsny6tPWclWKeY";
const SHEET_NAME = "Leads";
const HEADERS = [
  "Timestamp",
  "Business name",
  "Team size",
  "Challenge",
  "Full name",
  "Phone",
  "Email",
];

function setupDemoRequestsSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  const currentHeaders = sheet.getRange(1, 1, 1, HEADERS.length).getDisplayValues()[0];
  if (currentHeaders.some((value) => value) && currentHeaders.join("|") !== HEADERS.join("|")) {
    throw new Error("The Leads header row already contains different columns.");
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

    const requestCache = CacheService.getScriptCache();
    if (requestCache.get(payload.requestId)) {
      return jsonResponse_({ ok: true, duplicate: true });
    }

    if (isExistingLead_(sheet, payload.email, payload.phone)) {
      requestCache.put(payload.requestId, "duplicate", 21600);
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
    ]);
    requestCache.put(payload.requestId, "saved", 21600);

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
  ];

  required.forEach((field) => {
    if (typeof payload[field] !== "string" || !payload[field].trim()) {
      throw new Error(`Missing field: ${field}`);
    }
  });
}

function isExistingLead_(sheet, email, phone) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;

  const submittedEmail = normalizeEmail_(email);
  const submittedPhone = normalizePhone_(phone);
  const contacts = sheet.getRange(2, 6, lastRow - 1, 2).getDisplayValues();

  return contacts.some((row) => {
    const existingPhone = normalizePhone_(row[0]);
    const existingEmail = normalizeEmail_(row[1]);
    return existingEmail === submittedEmail && existingPhone === submittedPhone;
  });
}

function normalizeEmail_(value) {
  return String(value).trim().toLowerCase();
}

function normalizePhone_(value) {
  let digits = String(value).replace(/\D/g, "");

  if (digits.startsWith("0092")) digits = digits.slice(4);
  else if (digits.startsWith("92") && digits.length === 12) digits = digits.slice(2);
  else if (digits.startsWith("0") && digits.length === 11) digits = digits.slice(1);

  return digits;
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
