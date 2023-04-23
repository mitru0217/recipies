const { signup } = require("./signup");
const { login } = require("./login");
module.exports = {
  auth: {
    signup,
    login,
  },
};

// const logout = require("./logout");
// const getCurrentUser = require("./getCurrentUser");
// const updateUser = require("./updateUser");
// const { googleAuth, googleRedirect } = require("./authGoogle");

// login: ctrlWrapper(login),
// logout: ctrlWrapper(logout),
// getCurrentUser: ctrlWrapper(getCurrentUser),
// updateUser: ctrlWrapper(updateUser),
// googleAuth: ctrlWrapper(googleAuth),
// googleRedirect: ctrlWrapper(googleRedirect),
