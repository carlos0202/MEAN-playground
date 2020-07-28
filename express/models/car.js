const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company'
  },
  model: String,
  sold: Boolean,
  price: {
    type: Number,
    required: function(){
      return this.sold;
    }
  },
  year: {
    type: Number,
    min: 1990,
    max: 2050
  },
  extras: [String],
  date: {
    type: Date,
    default: Date.now
  }
});

const Car = new mongoose.model('car', carSchema);

module.exports = Car;