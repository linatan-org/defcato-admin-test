import axios from 'axios';
import {BASE_URL} from '../constants/data';

export const getApi = () => {};

const motilApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});
