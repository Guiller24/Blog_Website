import http from './apiConfig';

const retrieveUsers = () => {
    console.log('Requesting all users');
    return http.get('/api/users');
}

const createUser = (userInfo) => {
    console.log('Requesting to create a user');
    return http.post('/api/users', userInfo);
}

const updateUser = (userId, userInfo) => {
    console.log('Requesting to update a user');
    return http.put(`/api/users/${userId}`, userInfo);
}

const deleteUserById = (userId) => {
    console.log('Requesting to delete a user');
    return http.delete(`/api/users/${userId}`);
}

export default {
    retrieveUsers,
    createUser,
    updateUser,
    deleteUserById
};