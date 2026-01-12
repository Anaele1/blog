const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Hash password before saving
const hashPassword = async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
};

// Generate password reset token
const getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    return resetToken;
};

module.exports = {
    hashPassword,
    getResetPasswordToken
};