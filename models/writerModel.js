const mongoose = require('mongoose');

const writerSchema = mongoose.Schema({
    
    name:{ type: String}, 

    username: { type: String, unique: true, sparse: true },

    address:{ type: String},

    password:{ type: String, required: true },

    email:{ type: String, required: true, trim: true, lowercase: true, unique: true},

    image:{ type: String},

    resetPasswordToken: { type: String },

    resetPasswordExpire: { type: Date }
},{
    timestamps: true
});

module.exports = mongoose.model('Writer', writerSchema);