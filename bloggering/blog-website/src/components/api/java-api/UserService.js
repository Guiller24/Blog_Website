import config from "./config.json";
import http from "./apiURL";

function loginUser(credentials) {
    return http.post(config.baseURL + "/login", credentials);
}

function findByEmail(email){
    return http.get(config.baseURL + "/api/users/" + email);
}

function retrieveUsers(){
    return http.get(config.baseURL + "/api/users");
}

function createUser(userInfo){
    return http.post(config.baseURL + "/api/users", userInfo);
}

function deleteUserById(userId){
    return http.delete(config.baseURL + "/api/users/" + userId);
}

function updateUser(userId, userInfo){
    return http.put(config.baseURL + "/api/users/"+ userId, userInfo);
}

export default {
    loginUser,
    findByEmail,
    retrieveUsers,
    createUser,
    deleteUserById,
    updateUser,
};