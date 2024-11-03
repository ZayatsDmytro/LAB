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
    // Монтируем компонент перед каждым тестом
    mount(
      <MemoryRouter>
        <HomePage userData={mockUserData} />
      </MemoryRouter>
    );
  });

  it('renders the component correctly with user data', () => {
    cy.get('.logo').should('contain', 'Vibely'); // Проверка наличия логотипа
    cy.get('.profileName').should('contain', 'Test User'); // Проверка имени пользователя
    cy.get('.profileName').should('contain', 'testuser'); // Проверка имени пользователя
    cy.get('.heading').should('contain', 'Home Feed'); // Проверка заголовка
    cy.get('.postTitle').should('contain', 'New stunning learning resource'); // Проверка заголовка поста
    cy.get('.postText').should('contain', 'LearnHub offers tailored courses, tutorials, and guides in diverse fields.'); // Проверка текста поста
  });

  it('renders default user data when no userData is provided', () => {
    mount(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    cy.get('.profileName').should('contain', 'user'); // Проверка имени по умолчанию
    cy.get('.profileName').should('contain', 'username'); // Проверка имени пользователя по умолчанию
  });

  it('navigates to login on logout click', () => {
    cy.get('a.navItem').contains('Logout').click(); // Клик на ссылку "Logout"
    cy.url().should('include', '/login'); // Проверка, что URL изменился на /login
  });
});
