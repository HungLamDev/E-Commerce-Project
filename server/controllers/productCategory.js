const ProductCategory = require("../models/productCategory");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createdCategory = asyncHandler(async (req, res) => {
  const response = await ProductCategory.create(req.body);
  return res.json({
    success: response ? true : false,
    createdCategory: response ? response : "cannot create new product category",
  });
});
const getCategories = asyncHandler(async (req, res) => {
  const response = await ProductCategory.find();
  return res.json({
    success: response ? true : false,
    prodCategories: response ? response : "cannot get product category",
  });
});
const updateCategory = asyncHandler(async (req, res) => {
  const { pcid } = req.params;
  const response = await ProductCategory.findByIdAndUpdate(pcid, req.body, {
    new: true,
  });
  return res.json({
    success: response ? true : false,
    updateCategory: response ? response : "cannot update product category",
  });
});
const deletedCategory = asyncHandler(async (req, res) => {
  const { pcid } = req.params;
  const response = await ProductCategory.findByIdAndDelete(pcid);
  return res.json({
    success: response ? true : false,
    updateCategory: response ? response : "cannot delete product category",
  });
});

module.exports = {
  createdCategory,
  getCategories,
  updateCategory,
  deletedCategory,
};
