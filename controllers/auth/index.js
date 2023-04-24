const { signup } = require("./signup");
const { login } = require("./login");
const { getCurrentUser } = require("./getCurrentUser");
const { logout } = require("./logout");
module.exports = {
  auth: {
    signup,
    login,
    getCurrentUser,
    logout,
  },
};

// const updateUser = require("./updateUser");
// const { googleAuth, googleRedirect } = require("./authGoogle");

// updateUser: ctrlWrapper(updateUser),
// googleAuth: ctrlWrapper(googleAuth),
// googleRedirect: ctrlWrapper(googleRedirect),
