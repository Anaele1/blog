const jwt = require('jsonwebtoken');
const writerModel = require('../models/writerModel');

async function JWT(req, res, next) {
  // JWT logic
  const token = req.cookies.accessToken;
    if (!token) return res.redirect('/api/form');

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
        const writer = await writerModel.findById(decoded.id);
    if (!writer) return res.redirect('/api/form');
        req.user = writer;
        next();
    } catch (err) {
        return res.redirect('/api/form');
    }
};

module.exports = {JWT};