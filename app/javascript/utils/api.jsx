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
    login: params => api.post('/auth/login', params, { headers: { Authorization: null } }),
    register: params => api.post('/auth/register', params, { headers: { Authorization: null } }),
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

    // Outfits APIs
    getOutfits: params => api.get('/outfits', { params }),
    getOutfitsOptions: params => api.get('/outfits/options', { params }),
    createOutfit: params => api.post('/outfits', params),
    getOutfit: (id, params) => api.get(`/outfits/${id}`, { params }),
    updateOutfit: (id, params) => api.put(`/outfits/${id}`, params),
    deleteOutfit: (id, params) => api.delete(`/outfits/${id}`, { params }),

    // Explore APIs
    exploreOutfits: params => api.get('/explores', { params }),
    exploreOutfit: (id, params) => api.get(`/explores/${id}`, { params }),
    likeOutfit: (id, params) => api.post(`/explores/${id}/like`, { params }),

    // Recommendations APIs
    getRecommendations: params => api.post('/recommendations', params),
  };
};

export default Api;
