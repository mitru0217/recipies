const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { HttpError, ctrlWrapper } = require("../../helpers");
const { SECRET_KEY } = process.env;

const signup = async (req, res) => {
  const { name, email, password } = req.body; // извлекаю значения name, email и password из тела запроса, переданного в функцию
  const user = await User.findOne({ email }); // ищем пользователя по email

  if (user) {
    throw HttpError(409, "Email in use"); // Если пользователь с таким email уже существует, функция генерирует исключение HttpError, с кодом 409 и сообщением "Email in use"
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10)); // генерирую хеш пароль с помощью bcrypt,

  await User.create({ name, email, password: hashPassword }); // сохраняем пароль в базе данных

  const newUser = await User.findOne({ email }); // делаю  поиск только что созданного пользователя с помощью email.

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" }); // генерируется новый токен JWT, используя секретный ключ SECRET_KEY, который сохранен в переменной окружения.
  newUser.token = token;
  await newUser.save(); // токен сохраняется в базе данных для пользователя

  return res.status(201).json({
    // функция возвращает успешный ответ с кодом 201 и JSON-объектом, содержащим токен и данные пользователя, включая имя, email, аватар и идентификатор пользователя (userId).
    status: "success",
    code: 201,
    data: {
      token,
      user: {
        name,
        email,
        avatar: newUser.avatar,
        userId: newUser._id,
      },
    },
  });
};

module.exports = {
  signup: ctrlWrapper(signup), // Функция "ctrlWrapper" оборачивает функцию "signup" для обработки ошибок, которые могут возникнуть в процессе выполнения. Она возвращает новую функцию, которая возвращает Promise. Если происходит ошибка, эта функция обрабатывает ее и генерирует ответ с соответствующим кодом ошибки и сообщением об ошибке.
};
