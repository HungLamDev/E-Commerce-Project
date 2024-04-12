const router = require("express").Router();
const ctrls = require("../controllers/product");
const { verifyAcccesToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAcccesToken, isAdmin], ctrls.createProduct);
router.get("/", ctrls.getProducts);
router.put("/ratings", verifyAcccesToken, ctrls.ratings);

router.put("/:pid", [verifyAcccesToken, isAdmin], ctrls.updateProduct);
router.delete("/:pid", [verifyAcccesToken, isAdmin], ctrls.deleteProduct);
router.get("/:pid", ctrls.getProduct);

module.exports = router;
//CRUD | Create - read - Update - Delete | POST - GET - PUT - DELETE
//CREATE (POST) + PUT - body
// get + delete - query
