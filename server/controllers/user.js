const User = require("../models/user");
const sendMail = require("../ultils/sendmail");
const asyncHandler = require("express-async-handler");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const user = require("../models/user");
const makeToken = require("uniqid");
const { response } = require("express");
const { users } = require("../ultils/constant");

// const register = asyncHandler(async (req, res) => {
//   const { email, password, firstname, lastname } = req.body;
//   if (!email || !password || !firstname || !lastname)
//     return res.status(400).json({
//       success: false,
//       mes: "missing input",
//     });
//   const user = await User.findOne({ email });
//   if (user) throw new Error("User has existed");
//   else {
//     const newUser = await User.create(req.body);
//     return res.status(200).json({
//       success: newUser ? true : false,
//       mes: newUser
//         ? "Register is successfully. please login"
//         : "something went wrong",
//     });
//   }
// });

const register = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname, mobile } = req.body;
  if (!email || !password || !firstname || !lastname || !mobile)
    return res.status(400).json({
      success: false,
      mes: "missing input",
    });
  const user = await User.findOne({ email });
  if (user) throw new Error("User has existed");
  else {
    const token = makeToken();
    const emailedited = btoa(email) + "@" + token;
    const newUser = await User.create({
      email: emailedited,
      password,
      firstname,
      lastname,
      mobile,
    });

    if (newUser) {
      const html = `<h2>Code is valid for 5 minutes</h2><br /><blockquote>${token} </blockquote>`;
      await sendMail({ email, html, subject: "" });
    }
    setTimeout(async () => {
      await User.deleteOne({ email: emailedited });
    }, [300000]);
    return res.json({
      success: newUser ? true : false,
      mes: newUser
        ? "Please check your email to active account"
        : "Some went wrong, please try later",
    });
  }
});

const finalRegister = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const notActiveEmail = await User.findOne({ email: new RegExp(`${token}$`) });
  if (notActiveEmail) {
    notActiveEmail.email = atob(notActiveEmail?.email?.split("@")[0]);
    notActiveEmail.save();
  }
  return res.json({
    success: notActiveEmail ? true : false,
    mes: notActiveEmail
      ? "Register is successfully, please go login"
      : "Some went wrong, please try later",
  });
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
    const {
      password: password,
      role,
      refreshtoken,
      ...userData
    } = response.toObject();
    // tạo token
    const accessToken = generateAccessToken(response._id, role);
    const newrefreshToken = generateRefreshToken(response._id);
    //lưu refresh token và Db
    await User.findByIdAndUpdate(
      response._id,
      { refreshtoken: newrefreshToken },
      { new: true }
    );
    // lưu  refresh token vào cookie
    res.cookie("refreshtoken", newrefreshToken, {
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
  const user = await User.findById(_id).select("-refreshtoken -password ");
  return res.status(200).json({
    success: user ? true : false,
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
  const { email } = req.body;
  if (!email) throw new Error("Missing email");
  const user = await User.findOne({ email });
  if (!user) throw new Error("User Not Exist!");
  const resetToken = user.createPasswordChangedToken();
  await user.save();
  const html = `xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn,Link này sẽ hết hạn sau 15 phút kể từ bây giờ...
  <a href=${process.env.CLIENT_URL}/reset-password/${resetToken}>Click here</a>`;
  const data = {
    email,
    html,
    subject: "Forgot Password",
  };

  try {
    const rs = await sendMail(data);
    console.log(rs);
    return res.status(200).json({
      success: true,
      mes: "Please Check Email",
      rs,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      success: false,
      mes: "Error sending email",
      error: error.message,
    });
  }
});
const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  if (!password || !token) throw new Error("missing input");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Token expired");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordChangeAt = Date.now();
  user.passwordResetExpires = undefined;
  await user.save();
  return res.status(200).json({
    success: user ? true : false,
    mes: user ? "Updated password success" : "something went wrong",
  });
});
const getUsers = asyncHandler(async (req, res) => {
  const queries = { ...req.query };

  // Tách các trường đặc biệt ra khỏi query
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  // Format lại các operators cho đún cú pháp mongoose
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (matchedEl) => `$${matchedEl}`
  );
  const formatedQueries = JSON.parse(queryString);

  // Filtering
  if (queries?.name)
    formatedQueries.name = { $regex: queries.name, $options: "i" };
  if (req.query.q) {
    delete formatedQueries.q;
    formatedQueries["$or"] = [
      { firstname: { $regex: req.query.q, $options: "i" } },
      { lastname: { $regex: req.query.q, $options: "i" } },
      { email: { $regex: req.query.q, $options: "i" } },
    ];
  }

  let queryCommand = User.find(formatedQueries);

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }

  // Fields limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }

  // Pagination
  // limit: số object lấy về 1 lần gọi api
  // skip: bỏ phần tử
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);

  // Execute query
  // Số lượng sp thỏa mãn đk !== số lượng sp trả về một lần api

  queryCommand
    .then(async (response) => {
      const counts = await User.find(formatedQueries).countDocuments();

      return res.status(200).json({
        success: response ? true : false,
        counts,
        users: response ? response : "Cannot get products",
      });
    })
    .catch((err) => {
      if (err) throw new Error(err.message);
    });
});
const deletesUser = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  if (!_id) throw new Error("Missing inputs");
  const response = await User.findByIdAndDelete(_id);
  return res.status(200).json({
    success: response ? true : false,
    deletedUser: response
      ? `User with email ${response.email} deleted`
      : "No user delete",
  });
});
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id || Object.keys(req.body).length === 0)
    throw new Error("Missing inputs");
  const response = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  }).select("-password -role");
  return res.status(200).json({
    success: response ? true : false,
    updatedUser: response ? response : "some thing went wrong",
  });
});
const updateUserByAdnin = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  const response = await User.findByIdAndUpdate(uid, req.body, {
    new: true,
  }).select("-password -role -refreshtoken");
  return res.status(200).json({
    success: response ? true : false,
    updatedUser: response ? response : "some thing went wrong",
  });
});
const updateUserByAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!req.body.address) throw new Error("Missing inputs");
  const response = await User.findByIdAndUpdate(
    _id,
    { $push: { address: req.body.address } },
    {
      new: true,
    }
  ).select("-password -role -refreshtoken");
  return res.status(200).json({
    success: response ? true : false,
    updatedUser: response ? response : "some thing went wrong",
  });
});
const updateCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pid, quantity, color } = req.body;
  if (!pid || !quantity || !color) throw new Error("Missing inputs");
  const user = await User.findById(_id).select();
  const alreadyProduct = user?.cart?.find(
    (el) => el.product.toString() === pid
  );
  if (alreadyProduct) {
    if (alreadyProduct.color === color) {
      const response = await User.updateOne(
        { cart: { $elemMatch: alreadyProduct } },
        { $set: { "cart.$.quantity": quantity } },
        { new: true }
      );
      return res.status(200).json({
        success: response ? true : false,
        updatedcart: response ? response : "some thing went wrong",
      });
    } else {
      const response = await User.findByIdAndUpdate(
        _id,
        { $push: { cart: { product: pid, quantity, color } } },
        {
          new: true,
        }
      );
      return res.status(200).json({
        success: response ? true : false,
        updatedcart: response ? response : "some thing went wrong",
      });
    }
  } else {
    const response = await User.findByIdAndUpdate(
      _id,
      { $push: { cart: { product: pid, quantity, color } } },
      {
        new: true,
      }
    );
    return res.status(200).json({
      success: response ? true : false,
      updatedcart: response ? response : "some thing went wrong",
    });
  }
});
const createUsers = asyncHandler(async (req, res) => {
  const response = await User.create(users);
  return res.status(200).json({
    success: response ? true : false,
    users: response ? response : "Something went wrong",
  });
});
module.exports = {
  register,
  login,
  getCurrent,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetPassword,
  getUsers,
  deletesUser,
  updateUser,
  updateUserByAdnin,
  updateUserByAddress,
  updateCart,
  asyncHandler,
  finalRegister,
  createUsers,
};
