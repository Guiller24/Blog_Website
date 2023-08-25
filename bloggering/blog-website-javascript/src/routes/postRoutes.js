const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');
const multer = require('multer');
const upload = multer();




// Routes
//Create a new Post
router.post('/posts', async ( req, res ) => {
    const postInfo = req.body;
    try {
        await postController.createPost(postInfo);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

//Get all Posts
router.get('/posts', async (req, res) => {
    try{
        const posts = await postController.getAllPosts(req, res);
    }catch(err){
        res.status(500).json({error: err.message});
    };
});

//Read a Post by ID
router.get('/posts/:postId', postController.getPostById);

//Update Post by ID
router.put('/posts/:postId?', async (req, res) => {
    const postId = req.params.postId;
    const postInfo = req.body;
    try{
        await postController.updatePost(postId, postInfo);
        res.status(204).send();
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});

//Delete Post by ID
router.delete('/posts/:postId?', async (req, res) => {
        const postId = req.params.postId;
        try{
            await postController.deletePost(postId);
            res.status(204).send();
        }catch(err){
            res.status(500).json({error: err.message});
        }
});


module.exports = router;