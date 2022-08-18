import axios from 'axios';

export const getApi = () => {};

export const motilApi = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  data: {
    User: 'test',
    Password: '1234'
  }
});
