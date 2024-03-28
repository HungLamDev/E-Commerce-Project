const router = require("express").Router();
const ctrls = require("../controllers/user");
const { verifyAcccesToken } = require("../middlewares/verifyToken");

router.post("/register", ctrls.register);
router.post("/login", ctrls.login);
router.get("/current", verifyAcccesToken, ctrls.getCurrent);
router.post("/refreshtoken", ctrls.refreshAccessToken);
router.get("/logout", ctrls.logout);

module.exports = router;
