import axios from 'axios';

const configureAPI = () =>
  axios.create({
    baseURL: `https://dummy-api-proxy.herokuapp.com/api`,
    timeout: 10000,
  });

export default configureAPI;
