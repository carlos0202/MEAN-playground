const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
    enum: ['BMW', 'AUDI', 'SEAT']
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