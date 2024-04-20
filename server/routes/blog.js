const router = require("express").Router();
const ctrls = require("../controllers/blog");
const { verifyAcccesToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAcccesToken, isAdmin], ctrls.createNewBlog);
router.put("/update/:bid", [verifyAcccesToken, isAdmin], ctrls.updateBlog);
router.get("/", ctrls.getBlogs);
router.get("/one/:bid", ctrls.getBlog);

router.put("/likes/:bid", [verifyAcccesToken], ctrls.likeBlog);
router.put("/dislike/:bid", [verifyAcccesToken], ctrls.dislikeBlog);
router.delete("/:bid", [verifyAcccesToken, isAdmin], ctrls.deleteBlog);

// router.put("/:pid", [verifyAcccesToken, isAdmin], ctrls.updateProduct);
// router.delete("/:pid", [verifyAcccesToken, isAdmin], ctrls.deleteProduct);
// router.get("/:pid", ctrls.getProduct);

module.exports = router;
