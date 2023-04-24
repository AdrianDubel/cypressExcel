
/// <reference types="cypress-downloadfile"/>
describe('test', () => { 
    const url = " https://go.microsoft.com/fwlink/?LinkID=521962"

    before(() =>{
        cy.downloadFile(url,'cypress/mydownloads','example.xlsx')

    })
    it('test', () => {

        
        

        
    });

    after(() => {
    cy.task('deleteFile', 'cypress/mydownloads/example.xlsx');
  });
    
});
