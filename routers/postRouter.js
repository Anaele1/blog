const express = require('express');
const articleController = require('../controllers/articleController');
const router = express.Router();


// Create post route
router.post('/create-post/:writerId', articleController.createPost);
router.get('/get-posts/', articleController.getAllPosts);
router.patch('/update-content/:id', articleController.updateContent);
router.get('/post-per-writer/:writerId', articleController.postsByAWriter);

module.exports = router;
