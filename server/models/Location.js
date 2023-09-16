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
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  Description: {
    type: String,
  },
  type_of_recycling: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag',
  }],
});

const Location = model('Location', locationSchema);

module.exports = Location;
