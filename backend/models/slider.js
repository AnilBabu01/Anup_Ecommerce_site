const monoose = require("mongoose");

const { Schema } = monoose;

const Slidermodel = new Schema({
  image: {
    type: String,
    required: true,
  },
});

module.exports = monoose.model("slider", Slidermodel);
