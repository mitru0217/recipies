const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

module.exports = validateBody;

// Комменарий
// Данный код экспортирует функцию validateBody, которая возвращает другую функцию.
// Функция validateBody принимает один аргумент - объект схемы schema.
// Функция, которую возвращает validateBody, принимает три аргумента - req, res и next,
// и выполняет валидацию тела запроса на соответствие переданной схеме.
// Если валидация не проходит, то функция вызывает объект HttpError с кодом ошибки 400 и сообщением об ошибке
// из объекта ошибки, возвращаемого методом validate библиотеки joi.
// Затем функция передает эту ошибку в next. Если валидация проходит успешно, функция также передает управление в next.
// Возвращаемая функция создается внутри validateBody и сохраняется в переменной func.
// Это делается для того, чтобы можно было передавать параметр schema только один раз и затем использовать эту
// функцию многократно.
