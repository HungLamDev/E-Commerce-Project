const BlogCategory = require("../models/blogCategory");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createdCategory = asyncHandler(async (req, res) => {
  const response = await BlogCategory.create(req.body);
  return res.json({
    success: response ? true : false,
    createdCategory: response ? response : "cannot create new Blog category",
  });
});
const getCategories = asyncHandler(async (req, res) => {
  const response = await BlogCategory.find().select("title _id");
  return res.json({
    success: response ? true : false,
    prodCategories: response ? response : "cannot get Blog category",
  });
});
const updateCategory = asyncHandler(async (req, res) => {
  const { bcid } = req.params;
  const response = await BlogCategory.findByIdAndUpdate(bcid, req.body, {
    new: true,
  });
  return res.json({
    success: response ? true : false,
    updateCategory: response ? response : "cannot update Blog category",
  });
});
const deletedCategory = asyncHandler(async (req, res) => {
  const { bcid } = req.params;
  const response = await BlogCategory.findByIdAndDelete(bcid);
  return res.json({
    success: response ? true : false,
    updateCategory: response ? response : "cannot delete Blog category",
  });
});

module.exports = {
  createdCategory,
  getCategories,
  updateCategory,
  deletedCategory,
};
