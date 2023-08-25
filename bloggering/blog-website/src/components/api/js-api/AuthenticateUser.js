import http from './apiConfig';

const authenticateUser = async (email, password) => {
    return http.post('/api/users-login', { email, password });
};

const getToken = () => {
    return localStorage.getItem('token');
}

export default {
    authenticateUser,
    getToken
};