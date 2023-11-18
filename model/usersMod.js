import mongoose from "mongoose";
import * as yup from "yup";

const UsersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    minlength: 3,
    maxlength:20,
    trim: true,
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true,"Email is existe"],
    trim: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email address",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters"],
    maxlength: [255, "Password cannot be more than 1024 characters"],
    trim: true,
  },
  phonenumber: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true,
    validate: {
      validator: function (value) {
        return /^\+212[6-7][0-9]{8}$/.test(value);
      },
      message: "Invalid Moroccan phone number",
    },
  },
  createdAt: { type: Date, default: Date.now },
});

export const Users = mongoose.model("users", UsersSchema);



