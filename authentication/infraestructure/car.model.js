const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50
  },
  color: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50
  },
  horsePower: {
    type: Number,
    required: true,
    min: 0,
    max: 9999
  },
  licensePlate: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50
  },
  registrationDate: {
    type: Date,
    required: false,
    default: Date.now,
    max: Date.now
  },
  createdAt: {
    type: Date,
    required: false,
    default: Date.now
  }
});

module.exports = mongoose.model("Car", carSchema);
