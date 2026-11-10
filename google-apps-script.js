/**
 * THE EDITING CREW - Google Sheets Lead Capture Backend
 * 
 * Target Google Sheet Columns:
 * - Column A: Date & Time
 * - Column B: Name
 * - Column C: Phone Number
 * - Column D: City
 * - Column E: Package
 * - Column F: Package Price
 * - Column G: Start Date
 * - Column H: Frequency (Monthly / One Time)
 */

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    // Get primary sheet
    var sheet = ss.getActiveSheet();
    
    // Parse incoming data safely
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // Format individual values
    var date = data.date || Utilities.formatDate(new Date(), "Asia/Kolkata", "dd/MM/yyyy, hh:mm a");
    var name = (data.name || data["Name"] || data["Your Name"] || "").toString().trim();
    var phone = (data.phone || data["Phone Number"] || data.realPhone || data["Phone / WhatsApp"] || "").toString().trim();
    var city = (data.city || data["City"] || "").toString().trim();
    var packageTitle = (data.package || data["Package"] || data.packageDuration || "").toString().trim();
    var packagePrice = (data.packagePrice || "").toString().trim();
    var startDate = (data.startDate || data["Start Date"] || "").toString().trim();
    var billingType = (data.billingType || data["Monthly or One Time"] || data["Billing Type"] || "One Time").toString().trim();

    // Ensure phone starts with single quote so Sheets displays +91 as text
    var formattedPhone = phone ? ("'" + phone.replace(/^'+/, '')) : "";

    // Standard 8 Headers
    var headers = [
      "Date & Time",
      "Name",
      "Phone Number",
      "City",
      "Package",
      "Package Price",
      "Start Date",
      "Frequency (Monthly / One Time)"
    ];

    var lastRow = sheet.getLastRow();

    // If sheet is empty OR has old 6-column headers, setup/update Row 1 headers
    if (lastRow === 0) {
      sheet.appendRow(headers);
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#078465");
      headerRange.setFontColor("#FFFFFF");
      sheet.setFrozenRows(1);
    } else {
      // Check if Row 1 has fewer than 8 columns or has old headers like "Email" / "Duration"
      var currentHeaders = sheet.getRange(1, 1, 1, Math.min(sheet.getLastColumn() || 1, 10)).getValues()[0];
      var hasCityHeader = currentHeaders.some(function(h) { 
        return (h || "").toString().toLowerCase().indexOf("city") !== -1; 
      });

      if (!hasCityHeader || currentHeaders.length < 8) {
        // Upgrade Row 1 to the new 8 headers
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
        var headerRange = sheet.getRange(1, 1, 1, headers.length);
        headerRange.setFontWeight("bold");
        headerRange.setBackground("#078465");
        headerRange.setFontColor("#FFFFFF");
        sheet.setFrozenRows(1);
      }
    }

    // Append the lead row in exact order
    sheet.appendRow([
      date,
      name,
      formattedPhone,
      city,
      packageTitle,
      packagePrice,
      startDate,
      billingType
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: "success", 
        message: "Enquiry recorded successfully" 
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: "error", 
        message: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GET handler
function doGet(e) {
  if (e && e.parameter && (e.parameter.name || e.parameter.phone || e.parameter.city)) {
    return doPost(e);
  }
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: "active", 
      service: "The Editing Crew Lead Webhook",
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
