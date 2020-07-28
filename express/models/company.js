const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  country: {
    type: String,
    required: true
  },
  date:{
    type: Date,
    default: Date.now
  }
});

const Company = new mongoose.model("company", companySchema);

module.exports = Company;