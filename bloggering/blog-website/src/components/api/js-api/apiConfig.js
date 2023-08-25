import axios from 'axios';

const http = axios.create({
    baseURL: 'http://127.0.0.1:8080/',
});

// Set up default headers for cors
http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE';
http.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type';

export default http;