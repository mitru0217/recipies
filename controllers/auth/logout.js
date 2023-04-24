const { User } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: null });

  return res.status(204).json({ message: "Logout success" });
};

module.exports = { logout: ctrlWrapper(logout) };

// используем метод findByIdAndUpdate модели User, обновляется запись с соответствующим _id в базе данных,
// устанавливая значение поля token в null.
// Это поле используется для хранения токена, который используется для аутентификации пользователя,
// и установка его значения в null означает, что пользователь больше не авторизован.
