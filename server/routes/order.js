const router = require("express").Router();
const ctrls = require("../controllers/order");
const { verifyAcccesToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAcccesToken], ctrls.createOrder);

router.put("/status/:oid", [verifyAcccesToken, isAdmin], ctrls.updateStatus);
router.get("/", [verifyAcccesToken], ctrls.getUserOrder);
router.get("/admin", [verifyAcccesToken, isAdmin], ctrls.getOrders);

module.exports = router;
