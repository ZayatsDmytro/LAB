import React from 'react';

//https://docs.cypress.io/guides/references/best-practices#How-It-Works
import App from './App';

// document.querySelector('#id|.my-class|element|[data-testid="svsf"]');
describe('<App />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<App/>);
        cy.get('[data-testid="app"]').should('have.text', 'Hello world');
    });
});
