const router = require("express").Router();
const { getUser, getUserById, createUser } = require("../controllers/users");

router.get("/users", getUser);
router.get("/users:userId", getUserById);
router.post("/", createUser);

module.exports = router;
