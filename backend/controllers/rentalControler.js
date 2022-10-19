// slider for admin
const Rental = require("../models/rental");
const fs = require("fs");
const { json } = require("body-parser");
exports.addrental = async (req, res, next) => {
  try {
    const files = req.files;
    console.log(files);

    const urll = req.protocol + "://" + req.get("host");

    const { address, phone, status, image, productname, price, desc } =
      req.body;
    const rental = await Rental.create({
      productname: productname,
      phone: phone,
      address: address,
      image: urll + "/images/" + req.files[0].filename,
      status: status,
      price: price,
      desc: desc,
      user: req.user.id,
    });
    console.log(req.body);
    res.status(200).json({
      status: true,
      msg: "your product addedd successfully",
      rental: rental,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getsinglerental = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental) {
      return res.status(404).json({ status: false, msg: "not found" });
    }
    res.status(200).json({ status: true, product: rental });
  } catch (error) {
    console.log(error);
  }
};

exports.getrentall = async (req, res) => {
  try {
    const rental = await Rental.find();

    if (!rental) {
      res.status(404).json({
        sataus: false,
        msg: "no found",
      });
    }

    res.status(200).json({
      sataus: true,
      total: rental.length,
      rental: rental,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.userrental = async (req, res) => {
  try {
    const rental = await Rental.find({ user: req.user.id });

    if (!rental) {
      res.status(404).json({
        sataus: false,
        msg: "no found",
      });
    }

    res.status(200).json({
      sataus: true,
      total: rental.length,
      rental: rental,
    });
  } catch (error) {
    console.log(error);
  }
};

//admin

exports.updaterental = async (req, res) => {
  try {
    const { status } = req.body;
    const rental = await Rental.findById(req.params.id);
    if (rental.status === "sold") {
      return res.status(400).json({
        status: false,
        msg: "this is sold please check another product",
      });
    }
    if (!rental) {
      res.status(404).json({ status: false, msg: "not found" });
    }
    const rentall = await Rental.findByIdAndUpdate(req.params.id, {
      $set: {
        status,
      },
    });

    res.status(200).json({ status: true, msg: "updated", rental: rentall });
  } catch (error) {
    console.log(error);
  }
};

exports.deleterental = async (req, res) => {
  try {
    let rental = await Rental.findById(req.params.id);
    if (!rental) {
      return res.status(404).json({ status: false, msg: "Product not fund" });
    }

    await Rental.findOneAndRemove(req.params.id);

    res.status(201).json({
      status: true,
      msg: "Product deleted Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
