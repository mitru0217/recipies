const express = require("express"); //создание объекта приложения Express, который будет использоваться для создания сервера.
const logger = require("morgan"); // подключение middleware для логирования запросов и ответов.
const cors = require("cors"); //  подключение middleware для управления доступом к серверу с разных доменов.
// const { HttpError } = require("./helpers");

require("dotenv").config(); // загрузка переменных окружения из файла .env.

const app = express(); // создание экземпляра приложения Express.

const formatsLogger = app.get("env") === "development" ? "dev" : "short"; // настройка формата логирования в зависимости от текущего окружения приложения.

app.use(logger(formatsLogger)); // использование middleware для логирования запросов и ответов.
app.use(cors()); // использование middleware для управления доступом к серверу с разных доменов.
app.use(express.json()); // использование middleware для обработки тела запросов в формате JSON.

const AuthRouter = require("./routes/auth");

app.use("/api/auth", AuthRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
