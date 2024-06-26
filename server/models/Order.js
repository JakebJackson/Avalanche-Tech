const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  parts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Part'
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
