/**
 * THE EDITING CREW - Google Sheets Lead Capture Backend
 * 
 * Automatically captures customer inquiries from the website form:
 * - Column A: Date & Time
 * - Column B: Name
 * - Column C: Phone Number
 * - Column D: City
 * - Column E: Package
 * - Column F: Package Price
 * - Column G: Start Date
 * - Column H: Frequency (Monthly / One Time)
 * 
 * -------------------------------------------------------------
 * INSTRUCTIONS TO SETUP / DEPLOY:
 * -------------------------------------------------------------
 * 1. Open Google Sheets (https://sheets.google.com) and create a new sheet (or use existing).
 * 2. In the top menu, click "Extensions" -> "Apps Script".
 * 3. Delete everything in the script editor and paste this entire file.
 * 4. Click the Save icon (Ctrl+S or Cmd+S).
 * 5. Click the blue "Deploy" button at top right -> "New deployment".
 * 6. Under "Select type" (gear icon), select "Web app".
 * 7. Set configuration:
 *    - Description: "Editing Crew Lead Webhook"
 *    - Execute as: "Me (your email)"
 *    - Who has access: "Anyone" (VERY IMPORTANT: must be Anyone so website visitors can submit)
 * 8. Click "Deploy".
 * 9. Authorize access if prompted by Google (Click "Advanced" -> "Go to Untitled project (unsafe)" -> "Allow").
 * 10. Copy the "Web app URL" (it ends with /exec).
 * 11. Open your project's `.env` file and paste the URL:
 *     VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
 * -------------------------------------------------------------
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
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

    // Prefix phone with a single quote so Google Sheets stores +91... as text instead of formula
    var formattedPhone = phone ? ("'" + phone.replace(/^'+/, '')) : "";

    var lastCol = sheet.getLastColumn();
    var lastRow = sheet.getLastRow();

    // If sheet is completely empty, automatically generate formatted headers in Row 1
    if (lastRow === 0 || lastCol === 0) {
      var defaultHeaders = [
        "Date & Time",
        "Name",
        "Phone Number",
        "City",
        "Package",
        "Package Price",
        "Start Date",
        "Frequency (Monthly / One Time)"
      ];
      sheet.appendRow(defaultHeaders);
      
      // Style headers
      var headerRange = sheet.getRange(1, 1, 1, defaultHeaders.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#078465"); // Primary brand green
      headerRange.setFontColor("#FFFFFF");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
      
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
    } else {
      // Smart header-to-column mapping if row 1 headers already exist
      var headerValues = sheet.getRange(1, 1, 1, Math.min(lastCol, 20)).getValues()[0];
      var newRow = new Array(headerValues.length);
      
      var dateAssigned = false;
      var nameAssigned = false;
      var phoneAssigned = false;
      var cityAssigned = false;
      var packageAssigned = false;
      var priceAssigned = false;
      var startDateAssigned = false;
      var billingAssigned = false;

      for (var i = 0; i < headerValues.length; i++) {
        var header = (headerValues[i] || "").toString().toLowerCase().trim();

        if (!header) {
          newRow[i] = "";
          continue;
        }

        if (!dateAssigned && (header.indexOf("date") !== -1 && header.indexOf("start") === -1 && header.indexOf("தொடக்க") === -1)) {
          newRow[i] = date;
          dateAssigned = true;
        } else if (!nameAssigned && (header.indexOf("name") !== -1 || header.indexOf("பெயர்") !== -1)) {
          newRow[i] = name;
          nameAssigned = true;
        } else if (!phoneAssigned && (header.indexOf("phone") !== -1 || header.indexOf("whatsapp") !== -1 || header.indexOf("தொலைபேசி") !== -1)) {
          newRow[i] = formattedPhone;
          phoneAssigned = true;
        } else if (!cityAssigned && (header.indexOf("city") !== -1 || header.indexOf("நகரம்") !== -1)) {
          newRow[i] = city;
          cityAssigned = true;
        } else if (!packageAssigned && (header.indexOf("package") !== -1 || header.indexOf("project") !== -1 || header.indexOf("பேக்கேஜ்") !== -1)) {
          newRow[i] = packageTitle;
          packageAssigned = true;
        } else if (!priceAssigned && (header.indexOf("price") !== -1 || header.indexOf("கட்டணம்") !== -1)) {
          newRow[i] = packagePrice;
          priceAssigned = true;
        } else if (!startDateAssigned && (header.indexOf("start") !== -1 || header.indexOf("தொடக்க") !== -1)) {
          newRow[i] = startDate;
          startDateAssigned = true;
        } else if (!billingAssigned && (header.indexOf("monthly") !== -1 || header.indexOf("frequency") !== -1 || header.indexOf("one time") !== -1 || header.indexOf("மாதாந்திரம்") !== -1)) {
          newRow[i] = billingType;
          billingAssigned = true;
        } else {
          newRow[i] = "";
        }
      }

      // Default positional fallback if headers did not match standard keywords
      if (!nameAssigned && headerValues.length >= 2) newRow[1] = name;
      if (!phoneAssigned && headerValues.length >= 3) newRow[2] = formattedPhone;
      if (!cityAssigned && headerValues.length >= 4) newRow[3] = city;
      if (!packageAssigned && headerValues.length >= 5) newRow[4] = packageTitle;
      if (!priceAssigned && headerValues.length >= 6) newRow[5] = packagePrice;
      if (!startDateAssigned && headerValues.length >= 7) newRow[6] = startDate;
      if (!billingAssigned && headerValues.length >= 8) newRow[7] = billingType;

      sheet.appendRow(newRow);
    }

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

// Health check and direct test GET handler
function doGet(e) {
  if (e && e.parameter && (e.parameter.name || e.parameter.phone || e.parameter.city)) {
    return doPost(e);
  }
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: "active", 
      service: "The Editing Crew - Real Estate Lead Webhook",
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
