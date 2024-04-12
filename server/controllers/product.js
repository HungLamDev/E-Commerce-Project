const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createProduct = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length == 0) throw new Error("Missing inputs");
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
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
// const getProducts = asyncHandler(async (req, res) => {
//   const queries = { ...req.query };
//   // tách các trường đặc biệt khỏi query
//   const excludeFields = ["limit", "sort", "page", "fields"];
//   excludeFields.forEach((el) => delete queries[el]);
//   //format operater theo chuẩn cú pháp mogoDB
//   let queryString = JSON.stringify(queries);
//   queryString.replace(/\b(gte|gt|lt|lte)\b/g, (macthedEl) => `$${macthedEl}`);
//   const formatedQueries = JSON.parse(queryString);

//   //Lọc - Filtering
//   if (queries?.title)
//     formatedQueries.title = { $regex: queries.title, $options: "i" };
//   let queryCommand = Product.find(formatedQueries);

//   // execute query
//   // trả vêd số lượng sp thỏa mản điều kiện !== sô lượng sp trả về 1 lần gọi api
//   queryCommand.exec(async (err, response) => {
//     if (err) throw new Error(err.message);
//     const counts = await Product.find(queryString).countDocuments();
//     return res.status(200).json({
//       success: response ? true : false,
//       Products: response ? response : "cannot get products",
//       counts,
//     });
//   });
// });
const getProducts = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  // tách các trường đặc biệt khỏi query
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);
  //format operater theo chuẩn cú pháp mogoDB
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (matchedEl) => `$${matchedEl}`
  );
  const formatedQueries = JSON.parse(queryString);
  //Lọc - Filtering
  if (queries?.title)
    formatedQueries.title = { $regex: queries.title, $options: "i" };
  let queryCommand = Product.find(formatedQueries);
  //Sorting
  //acb,efg => [abc,efg] => abc efg
  if (req.query.sort) {
    const sortby = req.query.sort.split(",").join("");
    queryCommand = queryCommand.sort(sortby);
  }
  //fields limitting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join("");
    queryCommand = queryCommand.select(fields);
  }
  //panogation
  //limit: số object lấy 1 gọi về api
  // skip qua 2
  const page = req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);
  //price :{gt:5000,gt:3000}
  //execute query
  // trả vêd số lượng sp thỏa mản điều kiện !== sô lượng sp trả về 1 lần gọi api
  try {
    const response = await queryCommand;
    const counts = await Product.countDocuments(formatedQueries);

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
  const alreadyRating = ratingProduct?.ratings?.some((el) =>
    el.postedBy.some((uid=> uid === _id) )
  );
  console.log({ alreadyRating });

  //console.log(alreadyRating)
  if (alreadyRating) {
  } else {
    //add star & comments
    const response = await Product.findByIdAndUpdate(
      pid,
      {
        $push: { ratings: { star, comment, postedBy: _id } },
      },
      { new: true }
    );
    console.log(response);
  }
  return res.status(200).json({
    status: true,
  });
});
module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  ratings,
};
