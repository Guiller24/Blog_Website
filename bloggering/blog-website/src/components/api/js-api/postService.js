import http from "./apiConfig";

const retrievePosts = () => {
    return http.get("/api/posts");
};

const getPostById = (postId) => {
    return http.get(`/api/posts/${postId}`);
}

const createPost = (postInfo) => {
    const token = localStorage.getItem("token");
    const headers = {
        Authorization: `Bearer ${token}`
    }
    return http.post("/api/posts", postInfo, { headers });
};

const deletePostById = async (postId) => {
    try{
        const response = await http.delete(`/api/posts/${postId}`);
        return response.data;
    }catch(err){
        console.log(err);
        throw err;
    }
};

const updatePost = (postId, postInfo) => {
    return http.put(`/api/posts/${postId}`, postInfo);
};

export default {
    retrievePosts,
    createPost,
    getPostById,
    deletePostById,
    updatePost
}