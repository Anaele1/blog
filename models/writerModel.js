const mongoose = require('mongoose');

const writerSchema = mongoose.Schema({
    
    name:{ type: String}, 

    phone:{ type: Number},

    dob:{ type: Date},

    username: { type: String, unique: true, sparse: true },

    password:{ type: String, required: true },

    email:{ type: String, required: true, trim: true, lowercase: true, unique: true},

    image:{ type: String},

    address:{ type:mongoose.Schema.Types.ObjectId, ref: 'Address'},

    resetPasswordToken: { type: String },

    resetPasswordExpire: { type: Date }
},{
    timestamps: true
});

module.exports = mongoose.model('Writer', writerSchema);

// const mongoose = require('mongoose');

// const writerSchema = new mongoose.Schema({
//   name: { type: String, required: true, trim: true },
//   occupation: { type: String, trim: true },
//   username: { type: String, unique: true, sparse: true, trim: true, lowercase: true },
//   password: { type: String, required: true, select: false },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     lowercase: true,
//     unique: true,
//     match: [/^\S+@\S+\.\S+$/, 'Invalid email']
//   },
//   image: { type: String, default: '' },
//   // FIX: Make it NOT required initially. You set it after creating address
//   address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
//   resetPasswordToken: { type: String },
//   resetPasswordExpire: { type: Date }
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model('Writer', writerSchema);