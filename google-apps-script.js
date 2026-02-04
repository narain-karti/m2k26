/**
 * ============================================================================
 * MEREDITH 2K26 - GOOGLE APPS SCRIPT BACKEND
 * ============================================================================
 * 
 * This script handles form submissions from the symposium registration form
 * and stores data in Google Sheets.
 * 
 * ============================================================================
 * SETUP INSTRUCTIONS:
 * ============================================================================
 * 
 * STEP 1: Open Google Sheets
 *         - Go to your Google Sheet: https://docs.google.com/spreadsheets/d/1sxOYtaKTfJ7qagbLz04YLLCARcg5XAa36nYjixxejwk/edit
 *         - Or create a new Google Spreadsheet
 * 
 * STEP 2: Open Apps Script Editor
 *         - Click on Extensions > Apps Script
 *         - Delete any existing code in Code.gs
 *         - Paste this entire script
 * 
 * STEP 3: Save the Script
 *         - Click the floppy disk icon or press Ctrl+S
 *         - Name your project (e.g., "MEREDITH Registration")
 * 
 * STEP 4: Deploy as Web App
 *         - Click "Deploy" > "New deployment"
 *         - Click the gear icon next to "Select type" and choose "Web app"
 *         - Set "Execute as" to "Me"
 *         - Set "Who has access" to "Anyone"
 *         - Click "Deploy"
 *         - Authorize the app when prompted (click through security warnings)
 * 
 * STEP 5: Copy the Web App URL
 *         - After deployment, copy the provided URL
 *         - It looks like: https://script.google.com/macros/s/xxxxx/exec
 *         - Paste this URL in script.js where it says:
 *           const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
 * 
 * ============================================================================
 * SHEET STRUCTURE:
 * ============================================================================
 * 
 * This script will automatically create:
 * 1. "All Registrations" - Master sheet with all registrations
 * 2. Individual sheets for each event (Paper Presentation, Quiz, etc.)
 * 
 * Each sheet will have columns:
 * - Timestamp
 * - Full Name
 * - College Name
 * - Age
 * - Email ID
 * - Contact Number
 * - City / State
 * - Selected Events (comma separated)
 * 
 * ============================================================================
 */

// Column headers for all sheets
const HEADERS = [
    "Timestamp",
    "Full Name",
    "College Name",
    "Age",
    "Email ID",
    "Contact Number",
    "City / State",
    "Selected Events"
];

// List of all events
const EVENT_LIST = [
    "Paper Presentation",
    "Poster Presentation",
    "Technical Quiz",
    "Debate Competition",
    "UDYAT",
    "Show Your Talent",
    "Free Fire Tournament",
    "Eat As Possible",
    "Explore The Topic",
    "Content Creation",
    "Fitness Challenge"
];

/**
 * Handles POST requests from the registration form
 */
function doPost(e) {
    try {
        // Parse the incoming data
        const data = JSON.parse(e.postData.contents);

        // Get the active spreadsheet
        const ss = SpreadsheetApp.getActiveSpreadsheet();

        // Create or get the "All Registrations" sheet
        let masterSheet = ss.getSheetByName("All Registrations");
        if (!masterSheet) {
            masterSheet = ss.insertSheet("All Registrations");
            masterSheet.appendRow(HEADERS);
            // Format headers
            masterSheet.getRange(1, 1, 1, HEADERS.length)
                .setFontWeight("bold")
                .setBackground("#00f0ff")
                .setFontColor("#000000");
        }

        // Check if headers exist, if not add them
        if (masterSheet.getLastRow() === 0) {
            masterSheet.appendRow(HEADERS);
        }

        // Prepare row data
        const selectedEventsStr = data.selectedEvents.join(", ");
        const rowData = [
            data.timestamp,
            data.fullName,
            data.collegeName,
            data.age,
            data.email,
            data.contactNumber,
            data.cityState,
            selectedEventsStr
        ];

        // Append to master sheet
        masterSheet.appendRow(rowData);

        // Append to individual event sheets
        data.selectedEvents.forEach(eventName => {
            let eventSheet = ss.getSheetByName(eventName);
            if (!eventSheet) {
                eventSheet = ss.insertSheet(eventName);
                eventSheet.appendRow(HEADERS);
                // Format headers
                eventSheet.getRange(1, 1, 1, HEADERS.length)
                    .setFontWeight("bold")
                    .setBackground("#00f0ff")
                    .setFontColor("#000000");
            }

            // Check if headers exist
            if (eventSheet.getLastRow() === 0) {
                eventSheet.appendRow(HEADERS);
            }

            // Append registration to this event sheet
            eventSheet.appendRow(rowData);
        });

        // =========================================================================
        // SEND CONFIRMATION EMAIL
        // =========================================================================
        try {
            const emailSubject = `Confirmation: Your Registration for MEREDITH 2K26`;

            const htmlBody = `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #050a19; color: #ffffff; padding: 30px; border: 2px solid #00f0ff; border-radius: 15px;">
                    <h2 style="color: #00f0ff; text-align: center; border-bottom: 2px solid #00f0ff; padding-bottom: 15px;">Registration Successful! 🛡️</h2>
                    <p>Dear <strong>${data.fullName}</strong>,</p>
                    <p>We are thrilled to confirm your participation in <strong>MEREDITH 2K26</strong>. Your registration has been successfully recorded.</p>
                    <div style="background: rgba(0, 240, 255, 0.05); padding: 20px; border: 1px solid rgba(0, 240, 255, 0.3); border-radius: 10px; margin: 25px 0;">
                        <h3 style="color: #00f0ff; margin-top: 0; font-size: 1.1em;">📋 Registration Details</h3>
                        <table style="width: 100%; color: #ffffff; border-collapse: collapse;">
                            <tr><td style="padding: 5px 0; width: 140px; color: rgba(255,255,255,0.6);">Selected Events:</td><td style="padding: 5px 0; color: #00f0ff;"><strong>${selectedEventsStr}</strong></td></tr>
                            <tr><td style="padding: 5px 0; color: rgba(255,255,255,0.6);">Institution:</td><td style="padding: 5px 0;">${data.collegeName}</td></tr>
                        </table>
                    </div>
                    <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 10px; margin-bottom: 25px;">
                        <h3 style="color: #00f0ff; margin-top: 0; font-size: 1.1em;">📍 Venue: JANAKIRAMAN AUDITORIUM</h3>
                        <p style="margin: 5px 0; font-size: 0.9em; opacity: 0.8;">AMET Deemed to be University, ECR, Kanathur, Chennai.</p>
                    </div>
                    <p>If you have any queries, please reach us at: <strong>office@ametuniv.ac.in</strong></p>
                </div>
            `;

            MailApp.sendEmail({
                to: data.email,
                subject: emailSubject,
                body: "Registration Successful! Please view this email in a browser that supports HTML.",
                htmlBody: htmlBody
            });

        } catch (emailError) {
            console.error("Confirmation Email Error:", emailError);
            // Do not throw error here, so registration still succeeds even if email fails
        }

        // Return success response
        return ContentService
            .createTextOutput(JSON.stringify({
                status: "success",
                message: "Registration successful!"
            }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        // Log the error
        console.error("Registration Error:", error);

        // Return error response
        return ContentService
            .createTextOutput(JSON.stringify({
                status: "error",
                message: error.toString()
            }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

/**
 * Handles GET requests (for testing)
 */
function doGet(e) {
    return ContentService
        .createTextOutput(JSON.stringify({
            status: "ok",
            message: "MEREDITH 2K26 Registration API is running!"
        }))
        .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Utility function to initialize all event sheets
 * Run this once to pre-create all sheets
 */
function initializeSheets() {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // Create master sheet
    let masterSheet = ss.getSheetByName("All Registrations");
    if (!masterSheet) {
        masterSheet = ss.insertSheet("All Registrations");
    }
    if (masterSheet.getLastRow() === 0) {
        masterSheet.appendRow(HEADERS);
        masterSheet.getRange(1, 1, 1, HEADERS.length)
            .setFontWeight("bold")
            .setBackground("#00f0ff")
            .setFontColor("#000000");
    }

    // Create individual event sheets
    EVENT_LIST.forEach(eventName => {
        let eventSheet = ss.getSheetByName(eventName);
        if (!eventSheet) {
            eventSheet = ss.insertSheet(eventName);
        }
        if (eventSheet.getLastRow() === 0) {
            eventSheet.appendRow(HEADERS);
            eventSheet.getRange(1, 1, 1, HEADERS.length)
                .setFontWeight("bold")
                .setBackground("#00f0ff")
                .setFontColor("#000000");
        }
    });

    Logger.log("All sheets initialized successfully!");
}

// =========================================================================
// DEBUGGING & UTILITIES
// =========================================================================

/**
 * Run this function manually in the Apps Script editor (Select 'testEmail' from the dropdown and click 'Run')
 * This will trigger the Google authorization popup to grant 'Send Email' permissions.
 * It also verifies who the sender is.
 */
function testEmail() {
    const userEmail = Session.getActiveUser().getEmail();
    const recipient = "office@ametuniv.ac.in"; // Replace with your email to test

    Logger.log("--- Email Test Started ---");
    Logger.log("Sender Identity: " + userEmail);
    Logger.log("Attempting to send test email to: " + recipient);

    try {
        MailApp.sendEmail({
            to: recipient,
            subject: "🧪 Test Email: MEREDITH 2K26 Registration System",
            htmlBody: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #050a19; color: #ffffff; padding: 30px; border: 2px solid #00f0ff; border-radius: 15px;">
            <h2 style="color: #00f0ff;">Authorization Successful! ✅</h2>
            <p>If you are reading this, the <strong>MEREDITH 2K26</strong> registration script has permission to send emails.</p>
            <p><strong>Sender Address (Your Email):</strong> \${userEmail}</p>
            <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 20px 0;">
            <p>You can now use the registration form on your website. Any future registrations will automatically send this styled email.</p>
        </div>
      `
        });
        Logger.log("✅ Success! Test email sent. Please check your inbox and spam folder.");
    } catch (e) {
        Logger.log("❌ Error: " + e.toString());
        if (e.toString().indexOf("permission") !== -1) {
            Logger.log("HINT: You need to click 'Review Permissions' when you run this script.");
        }
    }
}

// END OF SCRIPT
