const Posts = require('../models/Posts');

// Post Service
// Get all posts
const getAllPosts = () => Posts.findAll();

// Create new Post
const createPost =  (postInfo) => Posts.create(postInfo);

// Read a Post by ID
const getPostById = (postId) => Posts.findByPk(postId);

// Update Post by ID
const updatePost = (postId, postInfo) => {
    return Posts.update(postInfo, {
        where: {
            postId: postId
        }
    });
};

// Delete Post by ID
const deletePost = (postId) => {
    return Posts.destroy({
        where: {
            postId: postId
        }
    });
};

module.exports = {
    getAllPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost
}