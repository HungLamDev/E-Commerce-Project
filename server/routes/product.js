const router = require("express").Router();
const ctrls = require("../controllers/product");
const { verifyAcccesToken, isAdmin } = require("../middlewares/verifyToken");
const uploader = require("../config/cloudinary.config");

router.post("/", [verifyAcccesToken, isAdmin], ctrls.createProduct);
router.get("/", ctrls.getProducts);
router.put("/ratings", verifyAcccesToken, ctrls.ratings);
router.put(
  "/uploadimage/:pid",
  [verifyAcccesToken, isAdmin],
  uploader.array("images", 10),
  ctrls.uploadImagesProduct
);
router.put("/:pid", [verifyAcccesToken, isAdmin], ctrls.updateProduct);
router.delete("/:pid", [verifyAcccesToken, isAdmin], ctrls.deleteProduct);
router.get("/:pid", ctrls.getProduct);

module.exports = router;
//CRUD | Create - read - Update - Delete | POST - GET - PUT - DELETE
//CREATE (POST) + PUT - body
// get + delete - query
