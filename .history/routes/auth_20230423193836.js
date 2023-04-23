const express = require("express");
const { auth: ctrl } = require("../controllers/auth");
const { auth, validateBody } = require("../middlewares");
const { registerSchema, loginSchema } = require("../models");
const { uploadCloud } = require("../../middlewares/uploadAvatar");

const router = express.Router();

router.post("/signup", validateBody(registerSchema), ctrl.signup);
// router.post("/login", validateBody(loginSchema), ctrl.login);
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

module.exports = router;
