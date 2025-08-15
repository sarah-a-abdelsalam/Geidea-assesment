/// <reference types="cypress" />

Cypress.on('uncaught:exception', function (error) {
  if (error.message.includes('solveSimpleChallenge')) {
    return false; // Prevent failures
  }
});

describe('Mercedes A Class Search', function () {
  var paginationCount = 0;
  var resultIndex = null;

  var keyword = "Mercedes A Class";
  var searchPattern = /(horsepower|engine\s+specifications)/i;

  function checkResults() {
    return cy.get('#search .tF2Cxc').then(function ($results) {
      var found = false;

      $results.each(function (i, el) {
        if (searchPattern.test(el.innerText) && resultIndex === null) {
          resultIndex = i + 1;
          found = true;
          cy.log('Matched text: ' + el.innerText); // Cypress log
          return false; 
        }
      });

      if (!found) {
        cy.get('#pnnext').then(function ($nextBtn) {
          if ($nextBtn.length && !$nextBtn.attr('aria-disabled')) {
            paginationCount++;
            cy.wrap($nextBtn).click();
            cy.wait(2000);
            return checkResults();
          }
        });
      }
    });
  }

  it('Finds engine specs or horsepower in search results', function () {
    cy.visit('https://www.google.com');

    cy.get('#SIvCob > a').click(); // Change language to english chrome

    cy.get('textarea[name="q"]').type(keyword + '{enter}');
    cy.pause(); // pause made to wait to skip capcha manually but needs resume after

    cy.wait(2000);

    checkResults().then(function () {
      cy.log('Found at Result #' + resultIndex + ' on Page ' + (paginationCount + 1));
    });
  });
});
