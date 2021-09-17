import axios from '@/axios';

export default {
  getsearch(data) {
    return axios.get('category/all', { data });
  },
  getlist(data) {
    console.log(data, 'data');
    return axios.get('/products/all', { data });
  },
  remove(data) {
    return axios.delete(`/products/${data.id}`);
  },
  add(data) {
    return axios.post('/products/add', data);
  },
  edit(data) {
    return axios.put('/products/edit', data);
  },
  getid(data) {
    return axios.get(`/products/${data}`);
  },
};
