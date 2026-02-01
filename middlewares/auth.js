const jwt = require('jsonwebtoken');
const writerModel = require('../models/writerModel');

async function JWT(req, res, next) {
  // JWT logic
  const token = req.cookies.accessToken;
    if (!token) return res.redirect('/form');

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
        if (!decoded.id) {
            return res.redirect('/form');
        }

        const writer = await writerModel.findById(decoded.id);      
        if (!writer) return res.redirect('/form');
        req.user = writer;
        next();
    } catch (err) {
        return res.redirect('/form');
    }
};

module.exports = {JWT};