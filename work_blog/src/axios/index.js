import axios from "axios";

const instance = axios.create({
    method: 'get',
    baseURL: 'http://127.0.0.1:3001',
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
  });

  // Add a request interceptor
  instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Do something with response data
    return response.data;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

  export default instance