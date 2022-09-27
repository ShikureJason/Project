const{getAllPost, addPost, getselfPost} = require("../controllers/postController");

const router = require("express").Router();

router.get("/allpost", getAllPost);
router.post("/post", addPost);
router.get("/selfpost/:id", getselfPost);

module.exports = router;