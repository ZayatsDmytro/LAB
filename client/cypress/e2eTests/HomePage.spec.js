describe('HomePage', () => {

  const mockUserData = {
    name: 'Test User',
    username: 'testuser'
  };

  beforeEach(() => {
    cy.visit('/home', {
      onBeforeLoad: (win) => {
        win.localStorage.setItem('userData', JSON.stringify(mockUserData));
      }
    });
  });

  it('should display user name and username in profile section', () => {
    cy.get(`.${styles.profileName}`).should('contain.text', mockUserData.name);
    cy.get(`.${styles.profile} div`).eq(1).should('contain.text', `@${mockUserData.username}`);
  });

  it('should display navigation items in sidebar', () => {
    cy.get(`.${styles.navItem}`).contains('Home').should('be.visible');
    cy.get(`.${styles.navItem}`).contains('Explore').should('be.visible');
    cy.get(`.${styles.navItem}`).contains('Saved').should('be.visible');
    cy.get(`.${styles.navItem}`).contains('Create Post').should('be.visible');
    cy.get(`.${styles.navItem}`).contains('Logout').should('be.visible');
  });

  it('should navigate to login page on logout click', () => {
    cy.get(`.${styles.navItem}`).contains('Logout').click();
    cy.url().should('include', '/login');
  });

  it('should display main content with a sample post', () => {
    cy.get(`.${styles.heading}`).should('contain.text', 'Home Feed');
    cy.get(`.${styles.postTitle}`).should('contain.text', 'New stunning learning resource');
    cy.get(`.${styles.postText}`).should('contain.text', 'LearnHub offers tailored courses, tutorials, and guides in diverse fields.');
    cy.get(`.${styles.postImage}`).should('be.visible');
  });
});
