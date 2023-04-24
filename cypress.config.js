const { defineConfig } = require("cypress");
const {downloadFile} = require('cypress-downloadfile/lib/addPlugin')
const fs = require('fs');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', { downloadFile });
      on('task', { deleteFile });

      function deleteFile(filePath) {
        fs.unlinkSync(filePath);
        return null;
      }
    },
  },
});







