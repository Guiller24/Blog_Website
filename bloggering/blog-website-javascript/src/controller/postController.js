const db = require('../database/db');
const postService = require('../service/postService');

// Controllers
// Create a new Post
const createPost = async (postInfo) => {
    try {
        await postService.createPost(postInfo);
    } catch (err) {
        console.error(err);
    }
};

// Read all Posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Read a Post by ID
const getPostById = async (req, res) => {
    const { postId } = req.params;
    try {
        const post = await postService.getPostById(postId);
        res.status(200).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}

// Update Post by ID
const updatePost = async (postId, postInfo) => {
    try {
        await postService.updatePost(postId, postInfo);
    } catch (err) {
        console.error(err);

    }
};

// Delete Post by ID
const deletePost = async (postId) => {
    try{
        await postService.deletePost(postId);
    }catch(err){
        console.error(err);
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
}