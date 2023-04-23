const { User } = require("../../models");
const { HttpError, ctrlWrapper } = require("../../helpers");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body; // извлекаю значения  email и password из тела запроса, переданного в функцию
  const user = await User.findOne({ email }); // ищем пользователя по email

  if (!user) {
    throw HttpError(401, "Email or password invalid"); // проверяем email  и password  на валидность
  }

  const passwordCompare = bcrypt.compareSync(password, user?.password); // сравниваем хеш введенного пароля с паролем, хранящимся в базе данных, используя bcrypt.
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid"); //  Если пароли не совпадают, то генерируется исключение HttpError с кодом ошибки 401 (Unauthorized) и сообщением "Email or password invalid".
  }

  const payload = {
    // создаем объект payload с полем id, которое устанавливается равным идентификатору пользователя, взятому из базы данных.
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" }); // создаем токен JWT с использованием функции sign библиотеки jsonwebtoken.  Передаваемые в функцию параметры включают полезную нагрузку (payload), секретный ключ и параметры токена, такие как время жизни токена (24 часа в данном случае).

  await User.findByIdAndUpdate(user._id, { token }); // обновляем поле token в базе данных для данного пользователя с использованием метода findByIdAndUpdate модели User.

  return res.json({
    // возвращаем ответ с кодом 200 (OK) и телом ответа, которое содержит токен, информацию о пользователе и другую метадату. Объект, возвращаемый в теле ответа, включает токен, имя, email, аватар и идентификатор пользователя, взятые из базы данных.
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        userId: user._id,
      },
    },
  });
};

module.exports = {
  login: ctrlWrapper(login), // Функция "ctrlWrapper" оборачивает функцию "login" для обработки ошибок, которые могут возникнуть в процессе выполнения. Она возвращает новую функцию, которая возвращает Promise. Если происходит ошибка, эта функция обрабатывает ее и генерирует ответ с соответствующим кодом ошибки и сообщением об ошибке.
};

// Общее назначение этого кода - сгенерировать токен JWT для пользователя, который успешно прошел аутентификацию, обновить его в базе данных и вернуть его вместе с информацией о пользователе в ответе на запрос.
