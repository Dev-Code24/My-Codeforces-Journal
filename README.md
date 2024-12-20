# My Codeforces Journal

**My Codeforces Journal** is a Chrome extension that helps Codeforces users track the problems they've solved. With just a click, the extension stores the details of the current problem to a Google Spreadsheet that the user has connected. This makes it easy to maintain a personal log of problems solved over time.

![video](https://github.com/user-attachments/assets/c59884bf-e87a-4a47-a028-e18eaf783d4a)

## New Version 1.1.0

The new update adds the following feature:

1. Feature to update the problem details of problems already added to your spreadsheet

Requirements for this new update:

1. Update AppScript
2. New Version of chrome-extension

## How to update AppScript:

- Your web app url remains the same even after updating your deploy

https://github.com/user-attachments/assets/84484cb1-668b-4abb-afa9-b84a803c4d82

## Contribute

Want to contribute to this Chrome extension? Check out the repository here: [My Codeforces Journal Development](https://github.com/Dev-Code24/My-Codeforces-Journal-Development).

### Steps to Get Started:

1. **Clone the Repository**  
   Clone this repo to your local machine:

   ```bash
   git clone https://github.com/Dev-Code24/My-Codeforces-Journal-Development.git
   ```

2. **Navigate to the Repository Directory**  
   Open the directory where the repo is cloned and ensure you are at the root:

   ```bash
   cd My-Codeforces-Journal-Development
   ```

3. **Create a Development Environment File**  
   Run the following command to create an `.env.development` file:

   ```bash
   touch .env.development
   ```

4. **Add Environment Variables**  
   Open the `.env.development` file and add the following configuration:

   ```env
   VITE_DEV_OR_PROD="development"
   DEV_CODEFORCES_ID="your codeforces profile URL"
   DEV_APPSCRIPT_URL="your appscript URL"
   ```

   - Replace `your codeforces profile URL` with the URL of your Codeforces profile.
   - Replace `your appscript URL` with your Apps Script URL.

5. **Run the Development Server**  
   Start the development server:

   ```bash
   npm run dev:chrome
   ```

6. **Load the Extension in Chrome/Brave**
   - Open Chrome or Brave and go to `chrome://extensions`.
   - Turn on **Developer Mode** (toggle in the top-right corner).
   - Click on **Load unpacked** and select the `dist` folder located in the root of the repo you cloned.

## Features

- **One-click Storage**: Save the current Codeforces problem you’ve solved with a single click.
- **Spreadsheet Integration**: Link your own Google Spreadsheet to store and organize problems in a format that suits you.
- **Problem Details Captured**: The extension stores key information such as problem URL, problem name, and problem rating.

## Getting Started

Watch this youtube video: [How to get started with My Codeforces Journal](https://youtu.be/1vlqXxdEqFI)

### Prerequisites

Before you can use the extension, make sure you have the following:

- A Google Spreadsheet where the problems will be stored.
- The Codeforces Journal Chrome extension installed and authorized to access your spreadsheet.
- Make sure to read [COMMON ERRORS SECTION](#common-errors) at the end of this.

### Installation

1. Download the `dist` folder from the following link: [My Codeforces Journal](https://github.com/Dev-Code24/My-Codeforces-Journal)
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** in the top right corner.
4. Click on **Load unpacked** and select the folder where the `dist` folder is saved.
5. The extension should now be visible on your extensions page.
6. Pin the extension on the toolbar for easy use.

### Spreadsheet Setup

1. Create a new Google Spreadsheet.
2. Name the Spreadsheet as you prefer.
3. Click on the "Extensions" menu, and then click on "App Script."
4. Click on "Untitled" and rename this App Script file to match the name of your Spreadsheet.
5. Copy the code below and paste it into the App Script editor, and save by keypressing `cmd + S`/`ctrl + S`
6. Click on the "Deploy" button in the top right and choose "New Deployment."
7. Add a description of your choice ( could be same as your SpreadSheet's name ).
8. Set "Who has access" to "Anyone."
9. Click "Deploy" and authorize the App Script,
10. Upon clicking authorize, select the Google Account you used to create the SpreadSheet, and then you'll be shown a "Google hasn't verified this app" message
11. Click on Advanced at the bottom and,
12. Click on the name of the AppScript project shown, then click Allow
13. Redeploy the AppScript project just to make sure your project has been authorized properly
14. Copy the script URL, as this is your AppScript URL, and save it for later use in the extension.

#### How to Re-deploy AppScript Project

1. Again click on "Deploy" button
2. Select "Manage deployments", and then a modal will show up
3. Click on the "Edit" button ( the Pen icon ), and now the "deploy" button at the bottom will become active
4. Click on deploy
5. If there exists some error with authorization, then you will be shown the authorize button again, or else you'll be shown to copy the script URL

#### App Script Code

```javascript
var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
function doPost(e) {
  try {
    // Parse the incoming request data
    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      return ContentService.createTextOutput('{"status":"error","message":"Invalid JSON format."}').setMimeType(ContentService.MimeType.TEXT);
    }

    // Check if the request is to check for an existing problem
    if (data.action === "checkProblem") {
      const problemNameColumn = sheet
        .getRange("B2:B" + sheet.getLastRow())
        .getValues()
        .flat();
      const problemExists = problemNameColumn.includes(data.problemName);

      return ContentService.createTextOutput(JSON.stringify({ status: "success", exists: problemExists })).setMimeType(ContentService.MimeType.JSON);
    }

    // Existing 'initialize' and 'addProblem' logic here
    if (data.action === "initialize") {
      var headers = ["Rating", "Problem", "Status", "Remarks", "Date", "Takeaway", "Topics"];
      if (sheet.getLastRow() === 0 || sheet.getRange("A1").getValue() === "") {
        // Initialization logic remains the same
        sheet.getRange("A1:G1").merge();
        sheet.getRange("A1").setValue("Codeforces Sheet");
        sheet.getRange("A1").setFontSize(13).setHorizontalAlignment("center").setBackground("#ffd966");
        sheet.getRange("A2:G2").setValues([headers]);
        sheet.getRange("A2:G2").setFontSize(12).setHorizontalAlignment("center").setBackground("#93c47d");
        sheet.setColumnWidth(1, 75);
        sheet.setColumnWidth(2, 185);
        sheet.setColumnWidth(3, 155);
        sheet.setColumnWidth(4, 290);
        sheet.setColumnWidth(5, 80);
        sheet.setColumnWidth(6, 530);
        sheet.setColumnWidth(7, 190);
        sheet.getRange("A2:G1000").setVerticalAlignment("middle");
        sheet.getRange("C2:C1000").setWrap(true);
        sheet.getRange("D2:D1000").setWrap(true);
        sheet.getRange("F2:F1000").setWrap(true);
        sheet.getRange("G2:G1000").setWrap(true);
        sheet.getRange("A2:A1000").setHorizontalAlignment("center");
        sheet.getRange("B2:B1000").setHorizontalAlignment("center");
        sheet.getRange("E2:E1000").setHorizontalAlignment("center");
        sheet.getRange("G2:G1000").setHorizontalAlignment("center");
        var newDate = new Date();
        sheet.getRange("E3:E1000").setNumberFormat("dd-mmm-yyyy");
        sheet.insertRowBefore(3);
        sheet
          .getRange("A3:G3")
          .setValues([
            [9999, "Problem9999Z", "Solved", "Could not implement my intuition", newDate, "I understood how recursion works", "Recursion, DP, Graph"],
          ]);
        return ContentService.createTextOutput(
          '{"status":"success","message":"Headers initialized with formatting, custom column widths, and row added."}'
        ).setMimeType(ContentService.MimeType.TEXT);
      } else {
        return ContentService.createTextOutput('{"status":"success","message":"Verified !."}').setMimeType(ContentService.MimeType.TEXT);
      }
    } else if (data.action === "addProblem") {
      try {
        const newRow = [data.problemRating, data.problemName, data.problemStatus, data.remarks, data.dateSolved, data.takeaways, data.problemTopics];
        const lastRow = sheet.getLastRow() + 1;
        sheet.appendRow(newRow);

        const problemNameCell = sheet.getRange(lastRow, 2);
        if (data.problemUrl) {
          problemNameCell.setValue(data.problemName).setFormula(`=HYPERLINK("${data.problemUrl}", "${data.problemName}")`);
        }

        return ContentService.createTextOutput('{"status":"success","message":"Problem data added with hyperlink."}').setMimeType(
          ContentService.MimeType.JSON
        );
      } catch (addError) {
        return ContentService.createTextOutput('{"status":"error","message":"Failed to add problem data."}').setMimeType(
          ContentService.MimeType.TEXT
        );
      }
    }

    // New feature: Update problem data
    if (data.action === "updateProblem") {
      const rows = sheet.getDataRange().getValues();
      const problemName = data.problemName;

      // Find the row with the matching problem name
      for (let i = 0; i < rows.length; i++) {
        if (rows[i][1] === problemName) {
          // Assuming column B has the problem name
          sheet.getRange(i + 1, 3).setValue(data.problemStatus); // Update "Status" in column C
          sheet.getRange(i + 1, 4).setValue(data.remarks); // Update "Remarks" in column D
          sheet.getRange(i + 1, 6).setValue(data.takeaways); // Update "Takeaway" in column F

          return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Problem data updated successfully." })).setMimeType(
            ContentService.MimeType.JSON
          );
        }
      }

      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Problem not found." })).setMimeType(
        ContentService.MimeType.JSON
      );
    }
  } catch (error) {
    return ContentService.createTextOutput('{"status":"error","message":"' + error.message + '"}').setMimeType(ContentService.MimeType.TEXT);
  }
}

// New feature: Handle GET requests for fetching problem data
function doGet(e) {
  const problemName = e.parameter.problemName;
  const data = sheet.getDataRange().getValues();

  // Find the row with the matching problem name
  const row = data.find((row) => row[1] === problemName); // Assuming column B has the problem name
  if (row) {
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        problem: {
          status: row[2], // Assuming "Status" is column C
          remarks: row[3], // Assuming "Remarks" is column D
          takeaways: row[5], // Assuming "Takeaway" is column F
        },
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } else {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Problem not found." })).setMimeType(
      ContentService.MimeType.JSON
    );
  }
}
```

## Usage

1. Open any Codeforces problem page.
2. Once you’ve solved the problem, click on the My Codeforces Journal extension icon, and then click on "Add Problem."
3. Fill in the form, and press "Submit."
4. The problem details will be automatically saved to the connected spreadsheet.

## Permissions

This extension requires the following permissions:

- **Active Tab**: To access the URL of the current tab when saving the problem.
- **Storage**: To store your connected spreadsheet details.
- **Scripting**: To run JavaScript

## Common Errors

### 1. **"Error! Something bad happened!" when submitting Codeforces ID**

- **Cause**: This typically occurs if a non-existing Codeforces ID was submitted.
- **Solution**: Double-check the ID and ensure it's correct.

### 2. **"APPSCRIPT NOT FOUND!" when submitting AppScript URL**

- **Cause**: This error generally means the AppScript URL provided is incorrect.
- **Solution**: Verify the URL and use the correct AppScript URL.
- **Additional Tip**: This error may also appear if your AppScript Project hasn’t been properly authorized. To ensure proper authorization:
  - During the spreadsheet setup, deploy your AppScript Project twice; the second deployment will help confirm the AppScript Project is fully authorized.

### 3. **"Solve the problem first, then submit!" when submitting a problem to the Spreadsheet**

- **Cause**: This occurs if the problem you’re trying to add has not been solved within your last 40 submissions on Codeforces.
- **Solution**: Ensure you’ve solved the problem recently. If not, attempt it on Codeforces before adding it to the Spreadsheet.
