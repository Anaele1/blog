const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const {connectDB} = require('../config/db');
const { extname } = require('path/win32');
// const hbs = require('hbs');
const app = express();
require('dotenv').config();

connectDB();

app.set('view engine', 'hbs');
app.set('views', './views'); // OR app.set('views', path.join(__dirname, 'views'));

// app.engine('hbs',
//     hbs({
//     layoutsDir: __dirname + '/views/layouts',
//     extname: 'hbs'
// }));

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/api/article', require('../models/articleModel'));
app.use('/api/writer', require('../models/writerModel'));
app.use('/api', require('../routers/accountRouter'));
app.use('/api/post', require('../routers/postRouter'));


app.get('/', (req, res) => {
    //res.send(home)
    res.json({
        message: 'Welcome',
    })
})

// // Connect to MongoDB
//  mongoose
// // //comment out '.connect(process.env.MongoUrlOnline)' below for online hosting of db
// // //.connect(process.env.MongoUrlOnline) // Mongo hosted online
//  .connect(process.env.MongoUrlLocal) // Mongo hosted locally
//  .then(() => {console.log('Connected to MongoDB')})
//  .catch(err => {console.error('Connection error:', err)});

module.exports = app;