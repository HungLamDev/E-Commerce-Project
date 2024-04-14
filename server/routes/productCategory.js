const router = require("express").Router();
const ctrls = require("../controllers/productCategory");
const { verifyAcccesToken, isAdmin } = require("../middlewares/verifyToken");
router.post("/", [verifyAcccesToken, isAdmin], ctrls.createdCategory);
router.get("/", ctrls.getCategories);
router.put("/:pcid", [verifyAcccesToken, isAdmin], ctrls.updateCategory);
router.delete("/:pcid", [verifyAcccesToken, isAdmin], ctrls.deletedCategory);

module.exports = router;
//CRUD | Create - read - Update - Delete | POST - GET - PUT - DELETE
//CREATE (POST) + PUT - body
// get + delete - query
