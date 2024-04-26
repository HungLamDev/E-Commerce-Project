const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");

const createNewCoupon = asyncHandler(async (req, res) => {
  const { name, discount, expiry } = req.body;
  if (!name || !discount || !expiry) throw new Error("Missing inputs");

  // Chuyển đổi dấu thời gian Unix thành dạng ngày
  const expiryDate = new Date(Date.now() + +expiry * 24 * 60 * 60 * 1000);
  const formattedExpiry = expiryDate.toISOString(); // Đã là định dạng ISO 8601

  const response = await Coupon.create({
    ...req.body,
    expiry: expiryDate, // Lưu trữ dạng ngày thay vì số dấu thời gian Unix
  });

  return res.status(200).json({
    success: response ? true : false,
    createdBlog: response
      ? { ...response._doc, expiry: formattedExpiry }
      : "cannot create Coupon",
  });
});
const getCoupons = asyncHandler(async (req, res) => {
  const response = await Coupon.find().select("-createdAt -updatedAt");

  // Chuyển đổi trường expiry từ số dấu thời gian Unix sang chuỗi định dạng ngày tháng ISO 8601
  const coupons = response.map((coupon) => ({
    ...coupon.toObject(),
    expiry: new Date(coupon.expiry).toISOString(),
  }));

  return res.status(200).json({
    success: response ? true : false,
    Coupon: response ? coupons : "cannot get Coupon",
  });
});

const updateCoupon = asyncHandler(async (req, res) => {
  const { cid } = req.params;

  // Lấy coupon từ cơ sở dữ liệu
  const coupon = await Coupon.findById(cid);
  if (!coupon) {
    return res.status(404).json({ success: false, mes: "Coupon not found" });
  }
  // Chuyển đổi expiry thành định dạng ngày tháng ISO 8601
  const expiryDate = new Date(coupon.expiry).toISOString();
  // Thực hiện phép cộng để gia hạn thời gian
  const extendedExpiry = new Date(
    Date.parse(expiryDate) + +req.body.expiry * 24 * 60 * 60 * 1000
  );

  // Chuyển đổi lại thành chuỗi định dạng ngày tháng ISO 8601
  const formattedExpiry = extendedExpiry.toISOString();
  // Cập nhật coupon với giá trị expiry mới
  const response = await Coupon.findByIdAndUpdate(
    cid,
    { expiry: extendedExpiry.getTime() },
    { new: true }
  );

  return res.status(200).json({
    success: response ? true : false,
    updateCoupon: response
      ? { ...response._doc, expiry: formattedExpiry }
      : "cannot update Coupon", // Trả về giá trị expiry dưới dạng chuỗi ISO 8601
  });
});
const deleteCoupon = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  const response = await Coupon.findByIdAndDelete(cid);
  return res.json({
    success: response ? true : false,
    DeleteCoupon: response ? response : "cannot delete Coupon",
  });
});
module.exports = {
  createNewCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
};
