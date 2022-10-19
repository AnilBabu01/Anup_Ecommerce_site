// slider for admin
const Shipping = require("../models/shipping");
const fs = require("fs");
const { json } = require("body-parser");
exports.addshipping = async (req, res, next) => {
  try {
    const files = req.files;
    console.log(files);
    const { name, url, address, phone } = req.body;

    const urll = req.protocol + "://" + req.get("host");
    const sipping = await Shipping.create({
      name: name,
      url: url,
      address: address,
      phone: phone,
      image: urll + "/images/" + req.files[0].filename,
    });
    if (!sipping) {
      return res.status(400).json({ status: false, mgs: "not possible" });
    }
    res.status(200).json({
      status: true,
      mgs: "Added successfully shiiping",
      sipping: sipping,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getshipping = async (req, res) => {
  try {
    const shippings = await Shipping.find();

    if (!shippings) {
      res.status(404).json({
        sataus: false,
        msg: "no found",
      });
    }

    res.status(200).json({
      sataus: true,
      shippings: shippings,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getshipingbyid = async (req, res) => {
  const shipping = await Shipping.findById(req.params.id);
  if (!shipping) {
    res.status(404).json({ status: false, msg: "not found" });
  }
  res.status(200).json({ status: true, shipping: shipping });
};

exports.updateshipping = async (req, res) => {
  try {
    const { status } = req.body;
    const shippings = await Shipping.findById(req.params.id);
    if (shippings.status === "Delivered") {
      return res.status(400).json({
        success: true,
        msg: "You have already delivered this order",
      });
    }
    if (!shippings) {
      res.status(404).json({ status: false, msg: "not found" });
    }
    const shipping = await Shipping.findByIdAndUpdate(req.params.id, {
      $set: {
        status,
      },
    });

    res.status(200).json({ status: true, msg: "updated", shipping: shipping });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteshipping = async (req, res) => {
  try {
    let shipping = await Shipping.findById(req.params.id);
    if (!shipping) {
      return res.status(404).json({ status: false, msg: "Product not fund" });
    }
    if (shipping) {
      var str = shipping.image.substring(22);
      fs.unlinkSync(str);
      console.log("successfully deleted /tmp/hello", str);
    }
    await Shipping.findOneAndRemove(req.params.id);

    res.status(201).json({
      status: true,
      msg: "Product deleted Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
