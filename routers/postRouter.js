const express = require('express');
const articleController = require('../controllers/articleController');
const { JWT } = require('../middlewares/auth');
const router = express.Router();


// Create post route
router.post('/create-post', articleController.createPost);
// Get fields to create post
router.get('/get-create-post', articleController.getCreatePost);
// each user views it posts
router.get('/my-posts', JWT, articleController.eachUserPostsView);


// Retrieve post route 
router.get('/get-posts', articleController.getAllPosts);
router.patch('/update-content/:id', articleController.updateContent);
router.get('/post-per-writer/:writerId', articleController.postsByAWriter);

module.exports = router;
