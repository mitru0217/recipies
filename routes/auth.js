const express = require("express");
const { auth: ctrl } = require("../controllers/auth");
const { validateBody } = require("../middlewares");
const { schemas } = require("../models/user");

const router = express.Router();
// signup
router.post("/signup", validateBody(schemas.registerSchema), ctrl.signup);
module.exports = router;
//login
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
// const { uploadCloud } = require("../../middlewares/uploadAvatar");

// router.get("/current", auth, ctrl.getCurrentUser);
// router.get("/logout", auth, ctrl.logout);
// router.patch(
//   "/edit",
//   auth,
//   uploadCloud,
//   validateBody(userJoiSchemaUpdate),
//   ctrl.updateUser
// );

// router.get("/google", ctrl.googleAuth);
// router.get("/google-redirect", ctrl.googleRedirect);
