const express = require("express");
const { auth: ctrl } = require("../controllers/auth");
const { validateBody, authenticate } = require("../middlewares");
const { schemas } = require("../models/user");

const router = express.Router();
// signup
router.post("/signup", validateBody(schemas.registerSchema), ctrl.signup);

//login
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
// current user
router.get("/current", authenticate, ctrl.getCurrentUser);
// logout
router.post("/logout", authenticate, ctrl.logout);

// const { uploadCloud } = require("../../middlewares/uploadAvatar");

// router.patch(
//   "/edit",
//   auth,
//   uploadCloud,
//   validateBody(userJoiSchemaUpdate),
//   ctrl.updateUser
// );

// router.get("/google", ctrl.googleAuth);
// router.get("/google-redirect", ctrl.googleRedirect);
module.exports = router;
