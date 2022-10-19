const monoose = require("mongoose");

const { Schema } = monoose;

const Shippingmodel = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
});

module.exports = monoose.model("shipping", Shippingmodel);
