const articleModel = require("../models/articleModel");

// Create post
exports.createPost = async (req, res) => {
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
    try {
        res.render('posts/createPost', { title: 'Create Post', metaTitle: 'create-post' });
    } catch (error) {
        console.log(error);  
    }
}

// Get Create post
exports.eachUserPostsView = async (req, res) => {
    try {
        const userPosts = await articleModel.find()
        const results = userPosts.map(writer => writer.toObject());
        //const results = allPost;
        return res.render('posts/myPosts', { results})
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
        return res.render('posts/postFeeds', { results})
        //return res.status(201).json({Message: 'POSTS', result}) 
    } catch (error) {
        console.log(error);
        return res.status(401).json('failled to retrieve all posts')   
    }
};

// Retrieve posts
exports.postViewPerOne = async (req, res) => {
    const {writerId, title} = req.body;
    try {
        const allPost = await articleModel.find(writerId, title).populate('writerId');
        const results = allPost.map(writer => writer.toObject());
        //const results = allPost;
        return res.render('posts/postFeeds', { results})
        //return res.status(201).json({Message: 'POSTS', result}) 
    } catch (error) {
        console.log(error);
        return res.status(401).json('failled to retrieve all posts')   
    }
};

// Update Post Content
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

// Posts from a particular writer
exports.postsByAWriter = async (req, res) => {
    const {writerId} = req.params;

    try {
        const postsPerwriter = await articleModel.find({writerId})
        if (postsPerwriter.length == 0){
            return res.status(401).json('Post do not exists for the writer')  
        }
        const result = postsPerwriter
        return res.status(200).json({Message: 'Success', result})
    } catch (error) {
        console.log(error);
        return res.status(401).json('failled to retrieve posts for the writer')
    };
};