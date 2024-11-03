// cypress/component/HomePage.cy.js
import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../../src/pages/HomePage/index';

describe('HomePage Component', () => {
  const mockUserData = {
    name: 'Test User',
    username: 'testuser',
  };

  beforeEach(() => {
    mount(
      <MemoryRouter>
        <HomePage userData={mockUserData} />
      </MemoryRouter>
    );
  });

  it('renders the component correctly', () => {
    cy.get('.logo').should('contain', 'Vibely');
    cy.get('.profileName').should('contain', 'Test User');
    cy.get('.profileName').should('contain', 'testuser');
    cy.get('.heading').should('contain', 'Home Feed');
    cy.get('.postTitle').should('contain', 'New stunning learning resource');
    cy.get('.postText').should('contain', 'LearnHub offers tailored courses, tutorials, and guides in diverse fields.');
  });

  it('renders default user data when no userData is provided', () => {
    mount(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    cy.get('.profileName').should('contain', 'user');
    cy.get('.profileName').should('contain', 'username');
  });

  it('navigates to login on logout click', () => {
    cy.get('a.navItem').contains('Logout').click();
    cy.url().should('include', '/login'); // Проверяем, что URL изменился на /login
  });
});
