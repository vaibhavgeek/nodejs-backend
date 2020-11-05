const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const citySchema = mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
  state: {
    type: String,
  }
});

// add plugin that converts mongoose to json
citySchema.plugin(toJSON);
citySchema.plugin(paginate);

citySchema.pre('save', async function (next) {  
  next();
});

/**
 * @typedef City
 */
const City = mongoose.model('City', citySchema);

module.exports = City;
