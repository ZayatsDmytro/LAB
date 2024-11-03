import { getUser, createUser } from '../../src/api/index'; 
import axios from 'axios';

describe('API calls (Unit Tests)', () => {
  before(() => {
    // Заглушка для axios.post
    cy.stub(axios, 'post').callsFake((url, data) => {
      if (url === 'https://localhost:44398/get') {
        return Promise.resolve({ data: { id: 1, name: 'John Doe' } }); 
      } else if (url === 'https://localhost:44398/create') {
        return Promise.resolve({ data: { success: true } }); 
      }
      return Promise.reject(new Error('Unknown API call')); 
    });
  });

  it('should call axios.post with correct URL and data when calling getUser', () => {
    const requestData = { id: 1 };

    return getUser(requestData).then((response) => {
      expect(response.data).to.deep.equal({ id: 1, name: 'John Doe' });
    }).then(() => {
      expect(axios.post).to.be.calledWith('https://localhost:44398/get', requestData);
    });
  });

  it('should call axios.post with correct URL and data when calling createUser', () => {
    const requestData = { name: 'Jane Doe' };

    return createUser(requestData).then((response) => {
      expect(response.data).to.deep.equal({ success: true });
    }).then(() => {
      expect(axios.post).to.be.calledWith('https://localhost:44398/create', requestData);
    });
  });
});
