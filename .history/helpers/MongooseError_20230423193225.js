const MongooseError = (error, data, next) => {
  const { name, code } = error;
  const status = name === "MongoServerError" && code === 11000 ? 409 : 400; // определение переменной status на основе значений полей name и code. Если name равно "MongoServerError" и code равно 11000, то status устанавливается на 409 (конфликт), в противном случае - на 400 (неверный запрос).
  error.status = status; // установка значения status для поля status в объекте error.
  next(); //  вызов функции next, переданной в качестве аргумента, для передачи управления следующей функции в цепочке middleware. В данном случае, функция MongooseError просто устанавливает значение поля status в объекте error и передает управление дальше, не изменяя дальнейшую логику выполнения.
};

module.exports = MongooseError;
