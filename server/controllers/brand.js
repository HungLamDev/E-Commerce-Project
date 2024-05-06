const Brand = require("../models/brand");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createNewBrand = asyncHandler(async (req, res) => {
  const response = await Brand.create(req.body);
  return res.json({
    success: response ? true : false,
    Brands: response ? response : "cannot create new Brand",
  });
});
const getBrands = asyncHandler(async (req, res) => {
  const response = await Brand.find();
  return res.json({
    success: response ? true : false,
    Brands: response ? response : "cannot get Brand",
  });
});
const updatebrands = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const response = await Brand.findByIdAndUpdate(bid, req.body, {
    new: true,
  });
  return res.json({
    success: response ? true : false,
    updatedBrands: response ? response : "cannot update Brand",
  });
});
const deletedBrand = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const response = await Brand.findByIdAndDelete(bid);
  return res.json({
    success: response ? true : false,
    deletedBrand: response ? response : "cannot delete Brand",
  });
});

module.exports = {
  createNewBrand,
  getBrands,
  updatebrands,
  deletedBrand,
};
