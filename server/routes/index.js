const userRouter = require("./user");
const productRouter = require("./product");
const productCategoryRouter = require("./productCategory");
const blogCategoryRouter = require("./blogCategory");
const brandRouter = require("./brand");
const blogRouter = require("./blog");
const orderRouter = require("./order");
const couponRouter = require("./coupon");
const insertDataRouter = require("./insert");

const { notFound, errHandler } = require("../middlewares/errHandler");
const initRouter = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/prodcategory", productCategoryRouter);
  app.use("/api/blogcategory", blogCategoryRouter);
  app.use("/api/brand", brandRouter);
  app.use("/api/blog", blogRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/coupon", couponRouter);
  app.use("/api/insert", insertDataRouter);

  app.use(notFound);
  app.use(errHandler);
};
module.exports = initRouter;
