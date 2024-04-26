const router = require("express").Router();
const ctrls = require("../controllers/coupon");
const { verifyAcccesToken, isAdmin } = require("../middlewares/verifyToken");
router.post("/", [verifyAcccesToken, isAdmin], ctrls.createNewCoupon);
router.get("/", ctrls.getCoupons);
router.put("/:cid", [verifyAcccesToken, isAdmin], ctrls.updateCoupon);
router.delete("/:cid", [verifyAcccesToken, isAdmin], ctrls.deleteCoupon);

module.exports = router;
