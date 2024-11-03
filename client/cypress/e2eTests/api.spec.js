// cypress/e2e/user.spec.js

describe('User API Tests', () => {
  const baseUrl = 'https://localhost:44398';

  beforeEach(() => {
    cy.intercept('POST', `${baseUrl}/get`).as('getUser');
    cy.intercept('POST', `${baseUrl}/create`).as('createUser');
  });

  it('should get user details successfully', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/get`,
      body: { userId: 1 },
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      expect(response.status).to.eq(200);  
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('name');
    });
  });

  it('should create a new user successfully', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/create`,
      body: { name: 'John Doe', age: 30 }, 
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      expect(response.status).to.eq(201); 
      expect(response.body).to.have.property('id');
      expect(response.body.name).to.eq('John Doe');
    });
  });
});
