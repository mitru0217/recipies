const { Schema, model } = require("mongoose");
const { MongooseError } = require("../helpers");
const Joi = require("joi");

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
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
    avatar: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/db5awxaxs/image/upload/v1680863981/%D0%B7%D0%B0%D0%B2%D0%B0%D0%BD%D1%82%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F_1_sycrzf.jpg",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", MongooseError);

const RegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min().required(),
});

const LoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min().required(),
});

const User = model("user", userSchema);

module.exports = User;
