const mongoose = require('mongoose');
const { hashPassword, getResetPasswordToken } = require('../utils/writerUtils');
const { string } = require('joi');

const writerSchema = mongoose.Schema({
    
    name:{ type: String}, 

    username: { type: String, unique: true },

    address:{ type: String},

    password:{ type: String, required: true },

    email:{ type: String, required: true, trim: true, lowercase: true, unique: true},

    image:{ type: String},

    resetPasswordToken: { type: String },

    resetPasswordExpire: { type: Date }
},{
    timestamps: true
});

// Attach methods and middleware
// writerSchema.pre('save', hashPassword);
// writerSchema.methods.getResetPasswordToken = getResetPasswordToken;


module.exports = mongoose.model('Writer', writerSchema);