const mongoose = require("mongoose");

const { Schema } = mongoose;

const rentalmodel = new Schema({
  productname: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Avaible",
  },
});

module.exports = mongoose.model("rental", rentalmodel);
