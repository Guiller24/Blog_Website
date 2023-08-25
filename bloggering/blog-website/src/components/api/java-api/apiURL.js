import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:8080/',
});



export default {
    get: (url, config) => http.get(url, config),
    post: (url, config) => http.post(url, config),
    put: (url, config) => http.put(url, config),
    delete: (url, config) => http.delete(url, config),
};


// http.interceptors.request.use(
//     (config) => {
//       const authToken = localStorage.getItem("authToken"); // Change this as needed

//       if (authToken) {
//         config.headers["Authorization"] = `Bearer ${authToken}`;
//       }

//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
// );