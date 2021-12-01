const router = require("express").Router();
const { getUser, createUser } = require("../controllers/users");

router.get("/", getUser);
router.post("/", createUser);
router.delete("/", createUser);

module.exports = router;
