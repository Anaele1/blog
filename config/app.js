const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const cors = require('cors');
const {connectDB} = require('../config/db');
const { extname } = require('path/win32');
const app = express();
require('dotenv').config();

connectDB();

// Handlebars setup
app.engine('hbs',
  exphbs.engine({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, '../views/layouts'),
    defaultLayout: 'main',
  })
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/jquery/dist')));
app.use('/api/article', require('../models/articleModel'));
app.use('/api/writer', require('../models/writerModel'));
app.use('/api', require('../routers/accountRouter'));
app.use('/api/post', require('../routers/postRouter'));

module.exports = app;