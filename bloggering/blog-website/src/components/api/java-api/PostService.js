import config from "./config.json";
import http from "./apiURL";

function retrievePosts(){
    return http.get(config.baseURL + "/api/posts");
}

function createPost(postInfo){
    return http.post(config.baseURL + "/api/posts", postInfo);
}

function deletePostById(postId){
    return http.delete(config.baseURL + "/api/posts/" + postId);
}

function updatePost(postId, postInfo){
    return http.put(config.baseURL + "/api/posts/" + postId, postInfo);
}

export default {
    retrievePosts,
    createPost,
    deletePostById,
    updatePost,
};