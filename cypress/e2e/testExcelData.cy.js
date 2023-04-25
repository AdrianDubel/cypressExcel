/// <reference types="cypress-downloadfile"/>
const path = require("path");

describe("Test Excel data", () => {
  const url =
    "https://megawrzuta.pl/files/24988ad8c6263be5bb74a719569b47a4.xlsx";
  const xlsxPath = "./cypress/mydownloads/example.xlsx";
  const jsonName = path.basename(xlsxPath.replace(".xlsx", ".json"));

  before(() => {
    cy.downloadFile(url, "cypress/mydownloads", "example.xlsx");
    cy.task("convertXlsxToJson", xlsxPath);
  });

  beforeEach(() => {
    cy.fixture(jsonName).as("companiesData");
  });

  it("Verify if file includes data of 8 companies", () => {
    cy.get("@companiesData").should("have.length", 8);
  });

  it("Verify if each comapny data contains non-empty values", () => {
    cy.get("@companiesData").then((companies) => {
      for (const company of companies) {
        expect(company["Company Name"]).to.not.be.empty;
        expect(company["Product"]).to.not.be.empty;
        expect(company["City"]).to.not.be.empty;
        expect(company["Email"]).to.not.be.empty;
      }
    });
  });

  it("Verify if each company data contains unique emails", () => {
    cy.get("@companiesData").then((companies) => {
      const emails = companies.map((company) => company.Email);
      const uniqueEmails = new Set(emails);

      expect(uniqueEmails.size).to.equal(emails.length);
    });
  });

  after(() => {
    cy.task("deleteFile", "cypress/mydownloads/example.xlsx");
    cy.task("deleteFile", "cypress/fixtures/example.json");
    cy.log("All data cleared");
  });
});
