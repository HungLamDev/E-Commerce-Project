const User = require("../models/user");
const sendMail = require("../ultils/sendmail");
const asyncHandler = require("express-async-handler");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  if (!email || !password || !firstname || !lastname)
    return res.status(400).json({
      success: false,
      message: "missing input",
    });
  const user = await User.findOne({ email });
  if (user) throw new Error("User has existed");
  else {
    const newUser = await User.create(req.body);
    return res.status(200).json({
      success: newUser ? true : false,
      mes: newUser
        ? "Register is successfully. please login"
        : "something went wrong",
    });
  }
});
//refresh token => cấp mới token
// access token xác thực phân quyền người dùng
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      success: false,
      message: "missing input",
    });
  const response = await User.findOne({ email });
  if (response && (await response.isCorrectPassword(password))) {
    // tách password và role ra respon
    const { password: password, role, ...userData } = response.toObject();
    // tạo token
    const accessToken = generateAccessToken(response._id, role);
    const refreshtoken = generateRefreshToken(response._id);
    //lưu refresh token và Db
    await User.findByIdAndUpdate(response._id, { refreshtoken }, { new: true });
    // lưu  refresh token vào cookie
    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      accessToken,
      userData: userData,
    });
  } else {
    throw new Error("invalid credentials");
  }
});
const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).select("-refreshtoken -password -role");
  return res.status(200).json({
    success: false,
    rs: user ? user : "user not found",
  });
});
const refreshAccessToken = asyncHandler(async (req, res) => {
  // lấy token từ cookies
  const cookie = req.cookies;
  //const {_id} =
  //chek xem có token hay không
  if (!cookie && !cookie.refreshtoken) throw new Error("No refesh token");
  // check token xem có hợp lệ hay không
  const rs = await jwt.verify(cookie.refreshtoken, process.env.JWT_SECRET);
  // xem token có khớp với DB
  const response = await user.findOne({
    _id: rs._id,
    refreshtoken: cookie.refreshtoken,
  });
  return res.status(200).json({
    success: response ? true : flase,
    newAccessToken: response
      ? generateAccessToken(rs._id, rs.role)
      : "Refresh token not matched",
  });
});
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.refreshtoken)
    throw new Error("no refresh token is cookies");
  // xoa refresh token database
  await User.findOneAndUpdate(
    { refreshtoken: cookie.refreshtoken },
    { refreshtoken: " " },
    { new: true }
  );
  //xoa refreshtoken o trinh duyet
  res.clearCookie("refreshtoken", {
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({
    success: true,
    mes: "logout is done",
  });
});
//client gửi email
//server check mail có hợp lệ hay không => gửi mail + kèm theo link (password change token )
//client check mail => click link
//client gửi lại api kèm token
//check token có giống với token mà server gửi mail hay không
//charge password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.query;
  if (!email) throw new Error("Missing email");
  const user = await User.findOne({ email });
  if (!user) throw new Error("user not found");
  const resetToken = user.createPasswordChangedToken();
  await user.save();
  const html = `xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn,Link này sẽ hết hạn sau 15 phút kể từ dât giờ...<a href=${process.env.URL_SERVER}/api/user/rest-password/${resetToken}>Click here</a>`;
  const data = {
    email,
    html,
  };

  try {
    const rs = await sendMail(data);
    console.log(rs);
    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
      rs,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    console.log(data);
    return res.status(500).json({
      success: false,
      message: "Error sending email",
      error: error.message,
    });
  }
});
module.exports = {
  register,
  login,
  getCurrent,
  refreshAccessToken,
  logout,
  forgotPassword,
};
