# My Codeforces Journal

**My Codeforces Journal** is a Chrome extension that helps Codeforces users track the problems they've solved. With just a click, the extension stores the details of the current problem to a Google Spreadsheet that the user has connected. This makes it easy to maintain a personal log of problems solved over time.

## Contribute

Want to contribute to this chrom-extension? Go to this repo :[My Codeforces Journal Development](https://github.com/Dev-Code24/My-Codeforces-Journal-Development)

## Features

- **One-click Storage**: Save the current Codeforces problem you’ve solved with a single click.
- **Spreadsheet Integration**: Link your own Google Spreadsheet to store and organize problems in a format that suits you.
- **Problem Details Captured**: The extension stores key information such as problem URL, problem name, and problem rating.

## Getting Started

### Prerequisites

Before you can use the extension, make sure you have the following:

- A Google Spreadsheet where the problems will be stored.
- The Codeforces Journal Chrome extension installed and authorized to access your spreadsheet.

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
5. Copy the code below and paste it into the App Script editor.
6. Click on the "Deploy" button in the top right and choose "New Deployment."
7. Add a description of your choice.
8. Set "Who has access" to "Anyone."
9. Click "Deploy" and authorize the App Script.
10. Copy the script URL, as this is your AppScript URL, and save it for use in the extension.

#### App Script Code

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

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

    // (Your existing 'initialize' and 'addProblem' logic here)
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
        return ContentService.createTextOutput('{"status":"success","message":"Headers already exist."}').setMimeType(ContentService.MimeType.TEXT);
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
  } catch (error) {
    return ContentService.createTextOutput('{"status":"error","message":"' + error.message + '"}').setMimeType(ContentService.MimeType.TEXT);
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
