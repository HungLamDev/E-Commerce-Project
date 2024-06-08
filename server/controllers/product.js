const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createProduct = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  
  // Chuyển đổi chuỗi JSON thành mảng (nếu cần thiết)
  if (typeof req.body.images === 'string') {
    req.body.images = JSON.parse(req.body.images);
  }

  const newProduct = await Product.create(req.body);
  return res.status(200).json({
    success: newProduct ? true : false,
    createdProduct: newProduct ? newProduct : "cannot create new product",
  });
});

const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const product = await Product.findById(pid);
  return res.status(200).json({
    success: product ? true : false,
    Product: product ? product : "cannot get product",
  });
});

const getProducts = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);
  
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (matchedEl) => `$${matchedEl}`
  );
  const formatedQueries = JSON.parse(queryString);

  let colorQueryObject = {};
  if (queries?.title) formatedQueries.title = { $regex: queries.title, $options: 'i' };
  if (queries?.category) formatedQueries.category = { $regex: queries.category, $options: 'i' };
  if (queries?.color) {
    delete formatedQueries.color;
    const colorArr = queries.color?.split(',');
    const colorQuery = colorArr.map(el => ({ color: { $regex: el, $options: 'i' } }));
    colorQueryObject = { $or: colorQuery };
  }

  const q = { ...colorQueryObject, ...formatedQueries };
  let queryCommand = Product.find(q);

  if (req.query.sort) {
    const sortby = req.query.sort.split(",").join("");
    queryCommand = queryCommand.sort(sortby);
  }

  if (req.query.fields) {
    const fields = req.query.fields.split(",").join("");
    queryCommand = queryCommand.select(fields);
  }

  const page = req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);

  try {
    const response = await queryCommand;
    const counts = await Product.find(q).countDocuments();

    return res.status(200).json({
      success: response ? true : false,
      counts,
      Products: response ? response : "cannot get products",
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);

  // Chuyển đổi chuỗi JSON thành mảng (nếu cần thiết)
  if (typeof req.body.images === 'string') {
    req.body.images = JSON.parse(req.body.images);
  }

  const updateProduct = await Product.findByIdAndUpdate(pid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: updateProduct ? true : false,
    updateProduct: updateProduct ? updateProduct : "cannot update product",
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(pid);
  return res.status(200).json({
    success: deletedProduct ? true : false,
    updateProduct: deletedProduct ? deletedProduct : "cannot delete product",
  });
});

const ratings = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, pid } = req.body;
  if (!star || !pid) throw new Error("missing inputs");

  const ratingProduct = await Product.findById(pid);
  const alreadyRating = ratingProduct?.ratings?.find(
    (el) => el.postedBy.toString() === _id
  );

  if (alreadyRating) {
    await Product.updateOne(
      { ratings: { $elemMatch: alreadyRating } },
      { $set: { "ratings.$.star": star, "ratings.$.comment": comment } },
      { new: true }
    );
  } else {
    const response = await Product.findByIdAndUpdate(
      pid,
      { $push: { ratings: { star, comment, postedBy: _id } } },
      { new: true }
    );
  }

  const updatedProduct = await Product.findById(pid);
  const ratingCount = updatedProduct.ratings.length;
  const sumRatings = updatedProduct.ratings.reduce((sum, el) => sum + +el.star, 0);
  updatedProduct.totalRatings = Math.round((sumRatings * 10) / ratingCount) / 10;
  await updatedProduct.save();

  return res.status(200).json({
    status: true,
    updatedProduct,
  });
});

const uploadImagesProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!req.files) throw new Error("Missing inputs");

  const response = await Product.findByIdAndUpdate(
    pid,
    { $push: { images: { $each: req.files.map((el) => el.path) } } },
    { new: true }
  );
  return res.status(200).json({
    status: response ? true : false,
    updatedProduct: response ? response : "cannot upload images product",
  });
});

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  ratings,
  uploadImagesProduct,
};
