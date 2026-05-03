const mongoose = require('mongoose');
const articleModel = require("../models/articleModel");
const writerModel = require("../models/writerModel");
const { userDetailsOnTemplate } = require("../utils/templateConsistency");

// Create post
exports.createPost = async (req, res) => {
    const user = userDetailsOnTemplate(req.user);
    const {writerId} = req.body;
    const { title, description, keywrds, content, summary } = req.body;
    try {
        if (!title || !description || !keywrds || !content || !summary) {
            console.log('Email or Password required')
            return res.status(401).json({ success: false, message: 'Email or Password required' })
        }

        const existingTitle = await articleModel.findOne({ title })
        if (existingTitle) {
            return res.status(401).json({ success: false, message: `Post exist with title: '${title}'` })
        }

        const newPost = new articleModel({ title, description, keywrds, content, summary, writerId })
        const result = await newPost.save()

        return res.status(201).json({ success: true, message: `Post with title: '${title}' created successfully` })
    } catch (error) {
        console.log(error)
        return res.status(401).json({ success: false, message: 'Cannot create post' })
    }

};

// Get Create post
exports.getCreatePost = async (req, res) => {
    const user = userDetailsOnTemplate(req.user);
    try {
        res.render('posts/createPost', { title: 'Create Post', metaTitle: 'create-post', user });
    } catch (error) {
        console.log(error);  
    }
}

// Get posts for a user
exports.eachUserPostsView = async (req, res) => {
    const user = userDetailsOnTemplate(req.user);
    try {
        const userPosts = await articleModel.find().populate('writerId');
        const results = userPosts.map(writer => writer.toObject());
        //const results = allPost;
        //return res.render('posts/myPosts', { results, user})
        //return res.status(201).json({Message: 'POSTS', result}) 
    } catch (error) {
        console.log(error);
        return res.status(401).json('failled to retrieve all posts')   
    }
}

// Retrieve posts
exports.getAllPosts = async (req, res) => {
    try {
        const allPost = await articleModel.find().populate('writerId');
        const results = allPost.map(writer => writer.toObject());
        //const results = allPost;
        return res.render('posts/postFeeds', { results});
        //return res.status(201).json({Message: 'POSTS', result}) 
    } catch (error) {
        console.log(error);
        return res.status(401).json('failled to retrieve all posts')   
    }
};

// Retrieve posts
exports.userViewEacPostInDetails = async (req, res) => {
    let workId = req.params._id.replace(/^:|:$/g, '').trim();;
console.log('This-work-id',workId);

    try {
        const eachPost = await articleModel.findById(workId).populate('writerId').lean();
        const results = eachPost;
        //console.log(results);
        
        return res.render('posts/viewPosts', { results})
        //return res.status(201).json({Message: 'POSTS', result}) 
    } catch (error) {
        console.log(error);
        return res.status(401).json('Error getting this work in details')   
    }
};

// Update Post Contents
exports.updateContent = async (req, res) => {
    const {id} = req.params;
    const {content} = req.body;

    try {
        if (!content){
            return res.status(401).json('Not a content field')  
        }

        const contentBody = await articleModel.findByIdAndUpdate(id, {content})
        const result = contentBody
        return res.status(200).json({Message: 'Content updated successfully', result})
    } catch (error) {
        console.log(error);
        return res.status(401).json('failled to update content')
    };
};

// Get Posts for a particular user
exports.postsByAWriter = async (req, res) => {
   try {
        // Sanitize the writerId (remove any extra characters)
        let writerId = req.params.id;
        writerId = writerId.replace(/^:|:$/g, '').trim();

         // Validate the ObjectId
        if (!mongoose.Types.ObjectId.isValid(writerId)) {
            return res.status(400).json({ error: 'Invalid writer ID' });
        }
        
        // Find all articles by the writer
        const postsPerwriter = await articleModel.find({ writerId }).populate('writerId', 'email username').lean();

        if (!postsPerwriter || postsPerwriter.length === 0) {
            return res.status(404).json({ message: 'No posts found for this writer' });
        }

        const results = postsPerwriter;
        return res.render('posts/myPosts', { results});
        //res.status(200).json({ success: true, articles });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
