const mongoose = require('mongoose');

const subAddressSchema = new mongoose.Schema({
  country: { type: String, trim: true },
  state: { type: String, trim: true },
  city: { type: String, trim: true },
  street: { type: String, trim: true }
}, { _id: false });

const addressSchema = new mongoose.Schema({
  writerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Writer', required: true, unique: true },
  residentAddress: { type: subAddressSchema },
  homeAddress: { type: subAddressSchema }
}, { timestamps: true });

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;