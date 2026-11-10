/**
 * EDITING CREW - Google Sheets Web App Backend
 * 
 * Columns in Google Sheet:
 * Column A: Date
 * Column B: Your Name
 * Column C: Email Address *
 * Column D: Phone / WhatsApp
 * Column E: Project Type
 * Column F: Target Duration (minutes)
 * 
 * Instructions to Update Google Apps Script:
 * 1. Open your Google Sheet: https://sheets.google.com
 * 2. Click "Extensions" (Erweiterungen) -> "Apps Script"
 * 3. Replace all code in Code.gs with this entire script.
 * 4. Click "Deploy" (Bereitstellen) -> "Manage deployments" (Bereitstellungen verwalten)
 *    - Click the Edit (pencil) icon next to your active Web app deployment
 *    - In "Version", select "New version" (Neue Version)
 *    - Click "Deploy" (Bereitstellen)
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
    var date = data.date || Utilities.formatDate(new Date(), "Europe/Berlin", "dd.MM.yyyy, HH:mm");
    var name = (data.name || data["Your Name"] || "").toString().trim();
    var email = (data.email || data["Email Address *"] || data["Email"] || "").toString().trim();
    var phone = (data.realPhone || data.phone || data.phoneNumber || data["Phone / WhatsApp"] || "").toString().trim();
    var projectType = (data.realProjectType || data["Project Type"] || (data.projectType !== phone ? data.projectType : "") || "General Enquiry").toString().trim();
    var duration = data.realDuration || data["Target Duration (minutes)"] || data.duration || 1;

    // Prefix phone with a single quote so Google Sheets stores +49... as text instead of a formula
    var formattedPhone = phone ? ("'" + phone.replace(/^'+/, '')) : "";

    var lastCol = sheet.getLastColumn();
    var lastRow = sheet.getLastRow();

    if (lastRow === 0 || lastCol === 0) {
      // Sheet is completely empty, create default 6 headers
      var defaultHeaders = [
        "Date",
        "Your Name",
        "Email Address *",
        "Phone / WhatsApp",
        "Project Type",
        "Target Duration (minutes)"
      ];
      sheet.appendRow(defaultHeaders);
      
      // Style headers
      var headerRange = sheet.getRange(1, 1, 1, defaultHeaders.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#1E293B"); // Slate-800
      headerRange.setFontColor("#FFFFFF");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
      
      sheet.appendRow([
        date,
        name,
        email,
        formattedPhone,
        projectType,
        duration
      ]);
    } else {
      // Smart Header-to-Column Mapping based on existing Row 1 headers
      var headerValues = sheet.getRange(1, 1, 1, Math.min(lastCol, 20)).getValues()[0];
      var newRow = new Array(headerValues.length);
      
      var dateAssigned = false;
      var nameAssigned = false;
      var emailAssigned = false;
      var phoneAssigned = false;
      var projectAssigned = false;
      var durationAssigned = false;

      for (var i = 0; i < headerValues.length; i++) {
        var header = (headerValues[i] || "").toString().toLowerCase().trim();

        // Skip completely empty headers or old removed fields like "Tell us..." / "Total"
        if (!header || header.indexOf("tell") !== -1 || header.indexOf("idea") !== -1 || 
            header.indexOf("product") !== -1 || header.indexOf("total") !== -1 || 
            header.indexOf("price") !== -1 || header.indexOf("preis") !== -1) {
          newRow[i] = "";
          continue;
        }

        if (!dateAssigned && (header.indexOf("date") !== -1 || header.indexOf("datum") !== -1)) {
          newRow[i] = date;
          dateAssigned = true;
        } else if (!nameAssigned && header.indexOf("name") !== -1) {
          newRow[i] = name;
          nameAssigned = true;
        } else if (!emailAssigned && (header.indexOf("email") !== -1 || header.indexOf("e-mail") !== -1 || header.indexOf("mail") !== -1)) {
          newRow[i] = email;
          emailAssigned = true;
        } else if (!phoneAssigned && (header.indexOf("phone") !== -1 || header.indexOf("whatsapp") !== -1 || header.indexOf("telefon") !== -1 || header.indexOf("handy") !== -1 || /(^|[^a-z])tel(\.|$|\s)/i.test(header))) {
          newRow[i] = formattedPhone;
          phoneAssigned = true;
        } else if (!projectAssigned && (header.indexOf("project") !== -1 || header.indexOf("projekttyp") !== -1)) {
          newRow[i] = projectType;
          projectAssigned = true;
        } else if (!durationAssigned && (header.indexOf("duration") !== -1 || header.indexOf("dauer") !== -1 || header.indexOf("minute") !== -1)) {
          newRow[i] = duration;
          durationAssigned = true;
        } else {
          newRow[i] = "";
        }
      }

      // Positional guarantee for exact 6 columns if any was missed
      if (!phoneAssigned && headerValues.length >= 4) {
        newRow[3] = formattedPhone;
      }
      if (!projectAssigned && headerValues.length >= 5) {
        newRow[4] = projectType;
      }
      if (!durationAssigned && headerValues.length >= 6) {
        newRow[5] = duration;
      }

      sheet.appendRow(newRow);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: "success", 
        message: "Entry recorded successfully" 
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

// Support GET requests for health check testing and optional direct parameter submissions
function doGet(e) {
  if (e && e.parameter && (e.parameter.name || e.parameter.email || e.parameter.phone)) {
    return doPost(e);
  }
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: "active", 
      service: "Editing Crew Lead Collector" 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
