const { defineConfig } = require("cypress");
const { downloadFile } = require("cypress-downloadfile/lib/addPlugin");
const fs = require("fs");
const XLSX = require("xlsx");
const path = require("path");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", { downloadFile });
      on("task", { deleteFile });
      on("task", {
        convertXlsxToJson(filePath) {
          const workbook = XLSX.readFile(filePath);
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);

          const fileName = path.basename(filePath, ".xlsx");
          const jsonFilePath = `cypress/fixtures/${fileName}.json`;

          fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
          return null;
        },
      });

      function deleteFile(filePath) {
        fs.unlinkSync(filePath);
        return null;
      }
    },
  },
});
