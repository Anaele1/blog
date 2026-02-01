const bcrypt = require("bcrypt");
const writerModel = require("../models/writerModel");
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { userDetailsOnTemplate } = require("../utils/templateConsistency");
const salts = 12;
// const sendEmail = require('../utils/sendEmail');
// const crypto = require('crypto');
// const { write } = require("fs");
// const { send } = require("process");

// Add image
exports.addImage = async (req, res) => {
     try {
        if (!req.file) {
            return res.status(401).json('req.file is empty')
        }
    const {id} = req.body;
   
    const imagePath = '/uploads/' + req.file.filename;  // URL path (not full disk path)

    const writerImage = await writerModel.findByIdAndUpdate(id, { image: imagePath });
    return res.status(200).json({ success: true, message: writerImage });

  } catch (err) {
    console.error(err);
    // return res.redirect('/api/profile');
     return res.status(500)
  }
}

// Form
exports.forms = (req, res) => {
    res.render('forms', {title: 'Forms', metaTitle: 'form'});
};

// Dashboard
exports.dashboard = (req, res) => {
    const user = userDetailsOnTemplate(req.user);
    res.render('dashboard', {title: 'Dashboard', metaTitle: 'dashboard',   user});
};

// Profile
exports.profile = (req, res) => {
    const user = userDetailsOnTemplate(req.user);
    res.render('profile', {title: 'Profile', metaTitle: 'profile',   user});
};

// Create Account
exports.signup = async (req, res) => {
    const { password, email, name} = req.body;
    try {
        if (!password || !email || !name) {
            console.log('Email or Password required')
            return res.status(401).json({ success: false, message: 'Email or Password required' })
        }

        const existingWriter = await writerModel.findOne({ email })
        if (existingWriter) {
            return res.status(401).json({ success: false, message: `Writer exist with this ${email}` })
        }

        const hashN = await bcrypt.hash(password, salts)
        console.log(hashN)

        const newWriter = new writerModel({ password: hashN, email, name })
        const result = await newWriter.save()
        result.password = undefined

        res.redirect('/api/form')
        // return res.status(201).json({ success: true, message: `Account created for the Writer with this email ${email}` })
    } catch (error) {
        console.log(error)
        return res.status(401).json({ success: false, message: 'Cannot create account' })
    }

};

// Login to Account
exports.signin = async (req, res) => {
    const { password, email } = req.body;
    try {
        if (!password || !email) {
            console.log('Email or Password required')
            return res.status(401).json({ success: false, message: 'Email or Password required' })
        }

        const existingWriter = await writerModel.findOne({ email })
        console.log(existingWriter)
        if (!existingWriter) {
            return res.status(401).json({ success: false, message: `Writer doesn't  exist with this ${email}` })
        }

        const result = await bcrypt.compare(password, existingWriter.password);
        console.log("RESULT", result);
        if (!result) {
            return res.status(401).json({ success: false, message: `Password doesn't  exist` })
        }

        // jwt payload
        const userData = {
            id: existingWriter._id,
            email: existingWriter.email,
            name: existingWriter.name,
            image: existingWriter.image,
            address: existingWriter.address
        };

        //Access Token creation using JWT : Payload, + Secret, + Expiration time
        const accessToken = jwt.sign(
            userData, // Payload
            process.env.ACCESS_SECRET, // Secret
            { expiresIn: process.env.ACCESS_TIMEOUT} // Expiration timme
        );
        console.log('Access Token:', accessToken)

        //Refresh Token creation using JWT : Payload, + Secret, + Expiration time
        const refreshToken = jwt.sign(
            userData, // Payload
            process.env.REFRESH_SECRET, // Secret
            { expiresIn: process.env.REFRESH_TIMEOUT} // Expiration timme
        );
        console.log('Refresh Token:', refreshToken)

        res.cookie('accessToken', accessToken,           
            {
                httpOnly: true,
                secure: 'proctected',
                maxAge: 10 * 60 * 1000
            }
        )
        
        res.redirect('/api/dashboard')
        // res.status(201).json({ success: true, message: `Logged in successfully` })
    } catch (error) {
        console.log(error);
    }

};

// Retrieve all writers
exports.getAllWriter = async (req, res) => {
    try {
        const writers = await writerModel.find()
         // Convert each Mongoose document to a plain object
        const result = writers.map(writer => writer.toObject());
        //res.json(result)
        res.render('index', {result, title: 'Home Page', metaTitle: 'home'})
    } catch (error) {
        console.log(error)
	res.status(500).json({ error: error.message });
    }
};

// Delete a writer
exports.deleteWriter = async (req, res) => {
    const { id } = req.body;
    // if (id.length < 24) {
    //     console.log('Wrong id')
    //     return res.status(401).json({ success: false, message: 'Wrong id' })
    // }
    try {
        const deleteWriter = await writerModel.findByIdAndDelete(id);
        if (!deleteWriter) {
            console.log('Writer does not exist')
            return res.status(401).json({ success: false, message: 'Writer does not exist' })
        }

        return res.status(201).json({ success: true, message: `Writer with ${id} id deleted ` });

    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: 'Server error', error: error.message });
    }
};

// Update writer address
exports.updateWriterAddress = async (req, res) => {
    const { id } = req.params;
    const { address } = req.body;

    if (!address) {
        console.log('Not address')
        return res.status(401).json({ success: false, message: 'Not an address: address is required' })
    }

    try {
        const updateWriterAddress = await writerModel.findByIdAndUpdate(id, { address });

        return res.status(200).json({ success: true, message: updateWriterAddress });
    } catch (error) {
        console.log(error)
        error.error.messager
        res.status(400).json({ success: false, message: 'Server error' });
    }
};

// Update writer name
exports.updateWriterName = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        console.log('Not a name')
        return res.status(401).json({ success: false, message: 'Not a name: name is required' })
    }

    try {
        const updateWriterName = await writerModel.findByIdAndUpdate(id, { name });
        return res.status(200).json({ success: true, message: updateWriterName });
    } catch (error) {
        console.log(error)
        error.error.messager
        res.status(400).json({ success: false, message: 'Server error' });
    }
};

// Profile Bio-data changes api
exports.bioDataChanges = async (req, res) => {
    try {
        const {id, name, address} = req.body;
        if (!id) {
            console.log('Please logout and login again');
            return res.status(401).json('Please logout and login again');   
        }

        const profileDataUpdate = await writerModel.findByIdAndUpdate(id, {name, address})
        console.log(profileDataUpdate)
        return res.status(200).json('Success');
    } catch (error) {
        console.log(error);
    }
};

// Logout writer
exports.logout = async (req, res) => {
    try {
        res.clearCookie('accessToken', '', {maxAge: 0});
        res.redirect('/api/form');
    } catch (error) {
        console.log(error)
        error.error.messager
        res.status(400).json({ success: false, message: 'Server error' });
    }
};

/*==================================== Crypto,  Nodemailer forgot and reset password functions =======================================*/
// // @desc    Forgot Password
// // @route   POST /api/writers/forgotpassword
// // @access  Public
// exports.forgotPassword = async (req, res, next) => {
//     const { email } = req.body;
//     if (!email) {
//         return res.status(404).json({ success: false, message: 'Email is required' });
//     }

//     // 1. Check if writer exists
//     const writer = await writerModel.findOne({ email });
//     if (!writer) {
//         return res.status(404).json({ success: false, message: 'Writer not found' });
//     }

//     // 2. Generate reset token
//     const resetToken = writer.getResetPasswordToken();

//     // // 3. Save token to DB (without validation)
//     // await writer.save({ validateBeforeSave: false });
//     // console.log("WRITER", writer);

//     writer.resetPasswordToken = resetToken;
//     writer.resetPasswordExpire = Date.now() + 10 * 60 * 100;

//     await writer.save();


//     // 4. Create reset URL
//     const resetUrl = `${req.protocol}://${req.get('host')}/api/writers/resetpassword/${resetToken}`;
//     console.log("resetUrl", resetUrl);

//     const options = {
//         instruction: "Reset Password",
//         email: email,
//         route: "resrt-password",
//         token: resetToken,
//         instruction: "Reset Password",
//     }



//     // 5. Send email
//     //const message = `You are receiving this email because you (or someone else) has requested a password reset. Please make a PUT request to: \n\n ${resetUrl}`;

//     try {
//         // await sendEmail({
//         //     from: writer.email,
//         //     to: 'profit383@gmail.com',
//         //     subject: 'Password Reset Token',
//         //     message
//         // });

//         await sendEmail(options);
//         res.status(200).json({ success: true, data: 'Email sent' });
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ success: false, message: 'Email could not be sent' });
//     }
// };

// // @desc    Reset Password
// // @route   PUT /api/writers/resetpassword/:resettoken
// // @access  Public
// exports.resetPassword = async (req, res, next) => {
//     // 1. Get hashed token from URL
//     const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');

//     // 2. Find writer by token and check if token is not expired
//     const writer = await Writer.findOne({
//         resetPasswordToken,
//         resetPasswordExpire: { $gt: Date.now() }
//     });

//     if (!writer) {
//         return res.status(400).json({ success: false, message: 'Invalid token' });
//     }

//     // 3. Set new password
//     writer.password = req.body.password;
//     writer.resetPasswordToken = undefined;
//     writer.resetPasswordExpire = undefined;

//     // 4. Save new password
//     await writer.save();

//     res.status(200).json({ success: true, data: 'Password reset successful' });
// };


/*==================================== JWT,  Nodemailer forgot and reset password functions =======================================*/

// Forgot password request
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(404).json({ success: false, message: 'Email is required' });
        }

        // 1. Check if writer exists
        const writer = await writerModel.findOne({ email });
        if (!writer) {
            return res.status(404).json({ success: false, message: 'Writer not found' });
        }

        const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '6m' });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },

        });

        const receiver = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Reset Password',
            text: `Click on this to reset your password: ${process.env.CLIENT_URL}/forgotpassword/${resetToken}`
        }

        await transporter.sendMail(receiver)

        return res.status(200).json({ messager: `password reset link sent successfully to this email: ${email}` })

    } catch (error) {
        console.log(error);
	res.status(500).json({ error: error.message });
    }
};

// Forgot password reset
exports.resetForgotPassword = async (req, res) => {
    const { password } = req.body;
    const { resetToken } = req.params;

    if (!password) {
        return res.status(400).json({ message: 'Password filed required' })
    };

    if (!resetToken) {
        return res.status(400).json({ message: 'Check and click on the link sent to the email you provided and follow the instruction to reset your password' })
    };

    

    try {
        const decode = jwt.verify(resetToken, process.env.JWT_SECRET)

        const writer = await writerModel.findOne({ email: decode.email })

        const hashN = await bcrypt.hash(password, salts)

        writer.password = hashN

        await writer.save();
        
        res.redirect('/api/form')
        // return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'Invalid or expired Token ' });
    }
};

// Change password for a logged in user
exports.loggedInResetPassword = async (req, res) => {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: 'Old and New password field are required' })
    };

    try {

        const writer = await writerModel.findById(id)
        if (!writer) {
            return res.status(400).json({ message: 'Writer does not exist' })
        };

        const oldpasswordMatch = await bcrypt.compare(oldPassword, writer.password)
        if (!oldpasswordMatch) {
            return res.status(400).json({ message: 'Incorrect old password' })
        };

        const hashNewPassword = await bcrypt.hash(newPassword, salts)

        writer.password = hashNewPassword
        await writer.save();


        // writer.password = hashN

        // await writer.save();

        return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'Cannot change your password ' });
    }
};
