const express = require('express');
const articleController = require('../controllers/articleController');
const { JWT } = require('../middlewares/auth');
const router = express.Router();


// Create post route
router.post('/create-post', JWT, articleController.createPost);
// Get fields to create post
router.get('/get-create-post',JWT, articleController.getCreatePost);
// each user views it posts
router.get('/my-posts', JWT, articleController.eachUserPostsView);

// User view each post
router.get('/each-post/:_id', JWT, articleController.userViewEacPostInDetails);

// Retrieve post route 
router.get('/get-posts', JWT, articleController.getAllPosts);
router.patch('/update-content/:id', articleController.updateContent);
router.get('/post-per-writer/:id', articleController.postsByAWriter);

module.exports = router;
