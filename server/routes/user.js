const router = require("express").Router();
const { Router } = require("express");
const ctrls = require("../controllers/user");
const { verifyAcccesToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/register", ctrls.register);
router.post("/login", ctrls.login);
router.get("/current", verifyAcccesToken, ctrls.getCurrent);
router.post("/refreshtoken", ctrls.refreshAccessToken);
router.get("/logout", ctrls.logout);
router.get("/forgotpassword", ctrls.forgotPassword);
router.put("/resetpassword", ctrls.resetPassword);
router.get("/", [verifyAcccesToken, isAdmin], ctrls.getUsers);
router.delete("/", [verifyAcccesToken, isAdmin], ctrls.deletesUser);
router.put("/current", [verifyAcccesToken], ctrls.updateUser);
router.put("/address", [verifyAcccesToken], ctrls.updateUserByAddress);
router.put("/cart", [verifyAcccesToken], ctrls.updateCart);
router.put("/:uid", [verifyAcccesToken, isAdmin], ctrls.updateUserByAdnin);

module.exports = router;
//CRUD | Create - read - Update - Delete | POST - GET - PUT - DELETE
//CREATE (POST) + PUT - body
// get + delete - query
