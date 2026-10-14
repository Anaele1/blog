const mongoose = require('mongoose');

const aboutSchema = mongoose.Schema({
    
    aboutme:{ type: String},
    occupation:{ type: String},
    writerId:{ type:mongoose.Schema.Types.ObjectId, ref: 'Writer', required: true }
},{
    timestamps: true
});

module.exports = mongoose.model('About', aboutSchema);