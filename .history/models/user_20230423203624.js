const { Schema, model } = require("mongoose");
const { MongooseError } = require("../helpers");
const Joi = require("joi");

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/; // определение регулярного выражения для валидации email-адресов.

const userSchema = new Schema( // определение схемы данных для коллекции user. В объекте первого аргумента задаются поля и их типы, а также опции валидации, например, обязательность заполнения. Вторым аргументом передаются опции для схемы, такие как отключение поля versionKey или включение автоматической генерации временных меток timestamps.
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegexp,
      message: "Please enter a valid email",
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    // avatar: {
    //   type: String,
    //   required: true,
    //   default:
    //     "https://res.cloudinary.com/db5awxaxs/image/upload/v1680863981/%D0%B7%D0%B0%D0%B2%D0%B0%D0%BD%D1%82%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F_1_sycrzf.jpg",
    // },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", MongooseError); // установка обработчика ошибок после сохранения документа в коллекцию user.

const registerSchema = Joi.object({
  //  определение схемы валидации для регистрации нового пользователя. С помощью методов string(), pattern() и required() определяются соответствующие поля.
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  //  определение схемы валидации для входа пользователя. Аналогично схеме для регистрации, определяются соответствующие поля.
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const shemas = {
  registerSchema,
  loginSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  shemas,
};
