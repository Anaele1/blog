const express = require('express');
const accountController = require('../controllers/accountController');
const { tokenAuth, JWT } = require('../middlewares/auth');
const upload = require('../config/multer');
const router = express.Router();

// Image Upload route
router.post('/add', upload.single('image'), accountController.addImage);

// Form route
router.get('/form', accountController.forms);

// Dashboard route
router.get('/dashboard', JWT, accountController.dashboard);

// Profile route
router.get('/profile', JWT, accountController.profile);

// Create Account route
router.post('/create', accountController.signup);

// Login to Account route
router.post('/login', accountController.signin);

// Retrieve all writers route
router.get('/', accountController.getAllWriter);

// Delete a writer route
router.post('/delete', accountController.deleteWriter);

// Update writer address route
router.patch('/update_address/:id', accountController.updateWriterAddress);

// Update writer name route
router.patch('/update_name/:id', accountController.updateWriterName);

// Forgot password request route
router.post('/forgotpassword', accountController.forgotPassword);

// Forgot password reset route
router.put('/resetpassword/:resetToken', accountController.resetForgotPassword);

// Bio Data changes route
router.post('/bio', accountController.bioDataChanges);

// Change password for a logged in user route
router.patch('/resetpassword/:id', accountController.loggedInResetPassword);

// Logout writer route
router.get('/logout', accountController.logout);


module.exports = router;