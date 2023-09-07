const { Schema, model } = require('mongoose');

const locationSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
    address: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Location = model('Location', locationSchema);

module.exports = Location;
