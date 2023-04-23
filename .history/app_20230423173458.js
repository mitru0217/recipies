const express = require("express"); //создание объекта приложения Express, который будет использоваться для создания сервера.
const logger = require("morgan"); // подключение middleware для логирования запросов и ответов.
const cors = require("cors"); //  подключение middleware для управления доступом к серверу с разных доменов.
const { HttpError } = require("./helpers");

require("dotenv").config(); // загрузка переменных окружения из файла .env.

const app = express(); // создание экземпляра приложения Express.

const formatsLogger = app.get("env") === "development" ? "dev" : "short"; // настройка формата логирования в зависимости от текущего окружения приложения.

app.use(logger(formatsLogger)); // использование middleware для логирования запросов и ответов.
app.use(cors()); // использование middleware для управления доступом к серверу с разных доменов.
app.use(express.json()); // использование middleware для обработки тела запросов в формате JSON.

app.use((error, req, res, next) => {
  if (HttpError) {
    return res.status(error.status).json({ message: error.message });
  }

  res.status(500).json({ message: `Internal server error: ${error.message}` }); // обработка ошибок, возникающих в ходе работы сервера. Если ошибка является экземпляром класса HttpError, то отправляется соответствующий HTTP-статус и сообщение об ошибке. В противном случае, отправляется статус 500 и сообщение обо всех внутренних ошибках сервера.
});

module.exports = app;
