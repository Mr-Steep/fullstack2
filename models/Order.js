const mongoose = require('mongoose')
const Schema = mongoose.Schema
const orderSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  order: {
    type: Number,
    required: true
  },
  list: [
    {
      name: {
        type: String
      },
      quantity: {
        type: Number
      },
      cost: {
        type: Number
      }
    }
  ],
    user: {
    ref: 'users',
    type: Schema.Types.ObjectId
  },

  NameClient: {
    type: String
  },
  AddressClient: {
    type: String
  },
  PhoneClient: {
    type: String
  },
  CommitClient: {
    type: String
  },

})

module.exports = mongoose.model('orders', orderSchema)