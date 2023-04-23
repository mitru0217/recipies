const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;
// Создаём middlewares, для того чтобы проверять пользователя зарегестрирован ли он
const authenticate = async (req, _, next) => {
  const { authorization = "" } = req.headers; // достаём authorization из заголовка
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || token === "") {
    next(HttpError(401, "Not authorized"));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "Not authorized"));
    }

    req.user = user;
    next();
  } catch (err) {
    next(HttpError(401, "Not authorized"));
  }
};

module.exports = authenticate;
