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
            const emailBody = `
Dear ${data.fullName},

Congratulations! You have successfully registered for MEREDITH 2K26 Symposium.

Registration Summary:
------------------------------------------
Full Name: ${data.fullName}
College: ${data.collegeName}
Selected Events: ${selectedEventsStr}
Registration Time: ${data.timestamp}
------------------------------------------

We are thrilled to have you join us. Please keep this email for your records. If you have any questions, feel free to contact the organizing committee.

Best Regards,
Organizing Committee
MEREDITH 2K26
        `.trim();

            const htmlBody = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #050a19; color: #ffffff; padding: 30px; border: 2px solid #00f0ff; border-radius: 15px;">
                <h2 style="color: #00f0ff; text-align: center; border-bottom: 2px solid #00f0ff; padding-bottom: 10px;">Registration Successful!</h2>
                <p>Dear <strong>${data.fullName}</strong>,</p>
                <p>We are excited to confirm your participation in <strong>MEREDITH 2K26</strong>. You have successfully registered for the following events:</p>
                
                <div style="background: rgba(0, 240, 255, 0.1); padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <ul style="list-style: none; padding: 0;">
                        <li style="margin-bottom: 10px;">🛡️ <strong>Selected Events:</strong> <span style="color: #00f0ff;">${selectedEventsStr}</span></li>
                        <li style="margin-bottom: 10px;">🏫 <strong>College:</strong> ${data.collegeName}</li>
                        <li style="margin-bottom: 10px;">📅 <strong>Date:</strong> ${data.timestamp}</li>
                    </ul>
                </div>
                
                <p>Please make sure to arrive at the venue on time. We look forward to an electrifying experience!</p>
                
                <div style="margin-top: 30px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; font-size: 0.9em; opacity: 0.8;">
                    <p>Best Regards,<br><strong>Team MEREDITH 2K26</strong></p>
                </div>
            </div>
        `;

            MailApp.sendEmail({
                to: data.email,
                subject: emailSubject,
                body: emailBody, // Fallback plain text
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
