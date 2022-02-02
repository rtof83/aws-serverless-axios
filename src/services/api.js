import axios from 'axios';

// YOUR API URL HERE
const url = '';

let api;
url ? api = axios.create({ baseURL: url }) : api = null

export default api;