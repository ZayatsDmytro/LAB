
describe('Authorisation Page', () => {
  
  beforeEach(() => {
    cy.visit('/'); // Update this path if the login page is different
  });

  it('should display the login form', () => {
    cy.get('input[name="username"]').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').contains('Log in').should('be.visible');
  });

  it('should allow inputting user data', () => {
    cy.get('input[name="username"]').type('testuser').should('have.value', 'testuser');
    cy.get('input[name="email"]').type('testuser@example.com').should('have.value', 'testuser@example.com');
    cy.get('input[name="password"]').type('password123').should('have.value', 'password123');
  });

  it('should successfully log in with correct credentials and navigate to home', () => {
    cy.intercept('POST', '**/get', {
      statusCode: 200,
      body: [{ id: 1, name: 'Test User' }],
    }).as('getUser');

    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('password123');

     cy.get('button[type="submit"]').click();

    cy.wait('@getUser');

    cy.url().should('include', '/home');
  });

  it('should display an error message on failed login', () => {
    cy.intercept('POST', '**/get', {
      statusCode: 401,
      body: { error: 'Invalid credentials' },
    }).as('getUser');

    cy.get('input[name="username"]').type('wronguser');
    cy.get('input[name="email"]').type('wrong@example.com');
    cy.get('input[name="password"]').type('wrongpassword');

    cy.get('button[type="submit"]').click();

    cy.wait('@getUser');

    cy.contains('Error creating user').should('be.visible');
  });

  it('should link to the register page if the user does not have an account', () => {
    
    cy.get('a').contains('Sign up').click();

    cy.url().should('include', '/register');
  });
});
