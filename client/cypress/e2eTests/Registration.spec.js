describe('RegisterPage', () => {

  beforeEach(() => {
    cy.visit('/register');
  });

  it('should display the registration form with all input fields and a submit button', () => {
     cy.get(`.${styles.input}[name="name"]`).should('be.visible');
    cy.get(`.${styles.input}[name="username"]`).should('be.visible');
    cy.get(`.${styles.input}[name="email"]`).should('be.visible');
    cy.get(`.${styles.input}[name="password"]`).should('be.visible');
    cy.get(`.${styles.button}`).contains('Sign Up').should('be.visible');
  });

  it('should allow input in form fields', () => {
    cy.get(`.${styles.input}[name="name"]`).type('Test Name').should('have.value', 'Test Name');
    cy.get(`.${styles.input}[name="username"]`).type('testuser').should('have.value', 'testuser');
    cy.get(`.${styles.input}[name="email"]`).type('testuser@example.com').should('have.value', 'testuser@example.com');
    cy.get(`.${styles.input}[name="password"]`).type('password123').should('have.value', 'password123');
  });

  it('should submit the form and show success message on successful registration', () => {
   cy.intercept('POST', '/create', { statusCode: 201, body: { message: 'User created successfully' } }).as('createUser');

    cy.get(`.${styles.input}[name="name"]`).type('Test Name');
    cy.get(`.${styles.input}[name="username"]`).type('testuser');
    cy.get(`.${styles.input}[name="email"]`).type('testuser@example.com');
    cy.get(`.${styles.input}[name="password"]`).type('password123');

    cy.get(`.${styles.form}`).submit();

   cy.wait('@createUser').then((interception) => {
      expect(interception.response.statusCode).to.equal(201);
      expect(interception.response.body.message).to.equal('User created successfully');
    });

   });

  it('should display error message on failed registration', () => {
    
    cy.intercept('POST', '/create', { statusCode: 400, body: { error: 'Error creating user' } }).as('createUser');

    cy.get(`.${styles.input}[name="name"]`).type('Test Name');
    cy.get(`.${styles.input}[name="username"]`).type('testuser');
    cy.get(`.${styles.input}[name="email"]`).type('testuser@example.com');
    cy.get(`.${styles.input}[name="password"]`).type('password123');

    cy.get(`.${styles.form}`).submit();

    cy.wait('@createUser').then((interception) => {
      expect(interception.response.statusCode).to.equal(400);
      expect(interception.response.body.error).to.equal('Error creating user');
    });

    cy.contains('Error creating user').should('be.visible');
  });

  it('should navigate to login page when "Log in" link is clicked', () => {
    cy.get(`.${styles.signUpLink}`).contains('Log in').click();
    cy.url().should('include', '/login');
  });
});
