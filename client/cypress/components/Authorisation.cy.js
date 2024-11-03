import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter } from 'react-router-dom';
import Authorisation from '../../src/pages/Authorisation/index';
import { getUser } from '../../src/api/index.js';

jest.mock('../../src/api/index.js'); 

describe('Authorisation Component', () => {
  const mockOnValueChange = cy.stub();

  beforeEach(() => {
    mount(
      <MemoryRouter>
        <Authorisation onValueChange={mockOnValueChange} />
      </MemoryRouter>
    );
  });

  it('renders the login form correctly', () => {
    cy.contains('Log in to your account').should('be.visible');
    cy.get('label[htmlFor="username"]').should('be.visible');
    cy.get('label[htmlFor="email"]').should('be.visible');
    cy.get('label[htmlFor="password"]').should('be.visible');
  });

  it('updates input fields on change', () => {
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('password123');

    cy.get('input[name="username"]').should('have.value', 'testuser');
    cy.get('input[name="email"]').should('have.value', 'testuser@example.com');
    cy.get('input[name="password"]').should('have.value', 'password123');

    cy.wrap(mockOnValueChange).should('have.callCount', 3); // Проверяем, что вызовы происходят
  });

  it('submits the form and calls getUser', () => {
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('password123');

    getUser.mockResolvedValueOnce({ data: [{ id: 1, name: 'Test User' }] });

    cy.get('button[type="submit"]').click();

    cy.wrap(getUser).should('have.been.calledWith', {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    });
  });
});
М