const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
    
    title:{ type: String, required: true},

    description:{ type: String, required: true },

    content:{ type: String},

    writerId:{ type:mongoose.Schema.Types.ObjectId, ref: 'Writer', required: true }
},{
    timestamps: true
});

module.exports = mongoose.model('Article', articleSchema);