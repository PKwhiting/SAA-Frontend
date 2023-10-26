// axios.js
import axios from 'axios';
axios.defaults.xsrfHeaderName = "X-CSRFTOKENs";
axios.defaults.xsrfCookieName = "csrftokens";

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_PROD_API_URL : process.env.VUE_APP_API_URL,
  // Other Axios configurations (e.g., headers) can be added here
});

export default api;