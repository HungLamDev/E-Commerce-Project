const router = require("express").Router();
const ctrls = require("../controllers/brand");
const { verifyAcccesToken, isAdmin } = require("../middlewares/verifyToken");
router.post("/", [verifyAcccesToken, isAdmin], ctrls.createNewBrand);
router.get("/", ctrls.getBrands);
router.put("/:bid", [verifyAcccesToken, isAdmin], ctrls.updatebrands);
router.delete("/:bid", [verifyAcccesToken, isAdmin], ctrls.deletedBrand);

module.exports = router;
//CRUD | Create - read - Update - Delete | POST - GET - PUT - DELETE
//CREATE (POST) + PUT - body
// get + delete - query
// createNewBrand,
// getBrands,
// updatebrands,
// deletedBrand,
