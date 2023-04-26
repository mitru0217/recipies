const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;
// Создаём middlewares, для того чтобы проверять пользователя зарегестрирован ли он, есть ли у него токен, и валиден ли токен.
const authenticate = async (req, _, next) => {
  const { authorization = "" } = req.headers; // достаём authorization из заголовка
  const [bearer, token] = authorization.split(" "); // разбиваем строку authorization на две части: префикс Bearer и сам токен. Она присваивает значения каждой части переменным bearer и token.

  if (bearer !== "Bearer" || token === "") {
    // проверяем, что bearer равен "Bearer" и token не является пустой строкой. Если это не так, то функция вызывает функцию next с ошибкой HttpError 401 ("Not authorized").
    next(HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY); // проверяем токен. Вызываем функцию jwt.verify для проверки токена и  декодируем его с помощью ключа SECRET_KEY, и извлекает идентификатор пользователя id.
    const user = await User.findById(id); // находим соответствующего пользователя в базе данных

    if (!user || !user.token || user.token !== token) {
      // Если пользователь не найден или у него нет токена, или токен не совпадает с переданным, то выкидываем ошибку с кодом  401
      next(HttpError(401));
    }
    req.user = user;
    next();
  } catch (err) {
    next(HttpError(401));
  }
};

module.exports = authenticate;

// Строка req.user = user; устанавливает значение свойства user объекта req, который передается между
// middleware функциями в цепочке обработки запросов в Express.js.
// В данном случае, свойство user устанавливается на объект пользователя, найденного в базе данных.
// Это свойство может быть использовано в последующих middleware функциях для доступа к данным пользователя и
// выполнения операций, которые требуют аутентификации.
// Например, следующие middleware функции могут использовать req.user для проверки прав доступа,
// получения информации о пользователе и т.д.
