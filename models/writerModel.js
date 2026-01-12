const mongoose = require('mongoose');
const { hashPassword, getResetPasswordToken } = require('../utils/writerUtils');

const writerSchema = mongoose.Schema({
    
    name:{ type: String},

    address:{ type: String},

    password:{ type: String, required: true },

    email:{ type: String, required: true, trim: true, lowercase: true, unique: true},

    resetPasswordToken: { type: String },

    resetPasswordExpire: { type: Date }
},{
    timestamps: true
});

// Attach methods and middleware
// writerSchema.pre('save', hashPassword);
// writerSchema.methods.getResetPasswordToken = getResetPasswordToken;


module.exports = mongoose.model('Writer', writerSchema);