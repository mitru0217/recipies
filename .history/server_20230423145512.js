const mongoose = require("mongoose");

const app = require("./app");
const { DB_HOST, PORT = 8000 } = process.env;

mongoose.set("strictQuery", true);
// Подключаемся к базе
mongoose
  .connect(DB_HOST)
  .then(console.log("DB_HOST", DB_HOST))
  .then(
    app.listen(PORT, () => {
      console.log("Database connection successful");
    })
  )
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

// Комментарии:
// "strictQuery"  используется для настройки поведения Mongoose при обработке запросов к базе данных MongoDB.
// Установка опции "strictQuery" в значении "true" заставляет Mongoose бросать исключения, если запрос содержит поля,
// которые не определены в схеме модели Mongoose.
// Когда "strictQuery" установлен в "true", Mongoose не будет выполнять запросы, которые содержат поля,
// не определенные в схеме модели, и бросать исключение, чтобы указать на ошибку запроса.
// Это помогает избежать ошибок при выполнении запросов к базе данных, связанных с несуществующими полями.
// Например, если у вас есть модель Mongoose, которая определяет поля "name" и "age",
// а вы попытаетесь выполнить запрос, содержащий поле "email", Mongoose выбросит исключение,
// чтобы указать на ошибку запроса.
