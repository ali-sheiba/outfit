import axios from 'axios';
import Session from 'utils/session';

// Inspired from
// https://github.com/infinitered/ignite-ir-boilerplate-andross/blob/master/boilerplate/App/Services/Api.js
const Api = (baseURL = '/v1/') => {
  // define axios-base , and make it private by not return it
  const api = axios.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: Session.getBearerToken(),
    },
    timeout: 10000,
  });

  // return only api calls
  return {
    // Session APIs
    login: params => api.post('/auth/login', params),
    register: params => api.post('/auth/register', params),
    logout: params => api.delete('/auth/logout', params),

    // Profile APIs
    getProfile: params => api.get('/me', { params }),
    updateProfile: params => api.put('/me', params),

    // Items APIs
    getItems: params => api.get('/items', { params }),
    getItemsOptions: params => api.get('/items/options', { params }),
    createItem: params => api.post('/items', params),
    getItem: (id, params) => api.get(`/items/${id}`, { params }),
    updateItem: (id, params) => api.put(`/items/${id}`, params),
    deleteItem: (id, params) => api.delete(`/items/${id}`, { params }),
  };
};

export default Api;
