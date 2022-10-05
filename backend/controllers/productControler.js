const Product = require("../models/product");
const APIFeatures = require("../utils/apiFeatures");
//create new product api/product/new

exports.newProduct = async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
  }
};
//get all product api/product/getallproduct?keyword=apple
exports.getProducts = async (req, res, next) => {
  try {
    const resPerPage = 4;
    const productsCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query);
    apiFeatures.search();
    apiFeatures.filter();
    apiFeatures.pagination(resPerPage);
    let products = await apiFeatures.query;
    setTimeout(() => {
      res.status(201).json({
        status: true,
        productsCount,
        products,
        resPerPage,
      });
    }, 1000);
  } catch (error) {
    console.log(error);
  }
};
//get single product api/product/getSingleProduct/:id

exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ status: false, msg: "Product not fund" });
    } else {
      res.status(201).json({
        status: true,
        product,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// Get all products (Admin)  =>   /api/v1/admin/products
exports.getAdminProducts = async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
};

//update product api/product/update/:id

exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ status: false, msg: "Product not fund" });
    } else {
      const reuset = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });

      res.status(201).json({
        status: true,
        reuset,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//update product api/product/delete/:id

exports.deleteProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ status: false, msg: "Product not fund" });
    }

    await product.remove();

    res.status(201).json({
      status: true,
      msg: "Product deleted Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

// Create new review   =>   /api/review
exports.createProductReview = async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    msg: "Rating added Successfully",
  });
};

//Get Product Reviews   =>   /api/reviews
exports.getProductReviews = async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
};

// Delete Product Review   =>   /api/v1/reviews
exports.deleteReview = async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  console.log(req.query.productId, req.query.id);

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    reviews,
  });
};
