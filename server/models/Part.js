const mongoose = require('mongoose');

const { Schema } = mongoose;

const partSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  // Link to manufacturors page
  manuLink: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

const Part = mongoose.model('Part', partSchema);

module.exports = Part;