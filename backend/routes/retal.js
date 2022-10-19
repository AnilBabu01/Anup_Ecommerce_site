const express = require("express");
const upload = require("../middlewares/upload");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const router = express.Router();

const {
  addrental,
  deleterental,
  updaterental,
  getrentall,
  userrental,
  getsinglerental,
} = require("../controllers/rentalControler");

router.post(
  "/rental/new",
  upload.array("image"),
  isAuthenticatedUser,
  addrental
);

router.get("/rental/getAll", getrentall);

router.get("/rental/usergetAll", isAuthenticatedUser, userrental);

router.get("/rental/getsinglerental/:id", getsinglerental);

//admin
router.put(
  "/rental/update/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updaterental
);

router.delete(
  "/rental/delete/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleterental
);

router.delete(
  "/rental/userdelete/:id",
  isAuthenticatedUser,

  deleterental
);

module.exports = router;
