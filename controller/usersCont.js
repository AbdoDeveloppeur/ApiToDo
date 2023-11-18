import { Users } from "../model/UsersMod.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

// ** Register-----User
export const Register = async (req, res) => {
  // Validate request body against the schema
  const { username, gender, email, password, phonenumber } = req.body;

  if (!username || !gender || !email || !password || !phonenumber) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required" });
  }
  // ** check email is email
  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid email format" });
  }

  // ** Check username is Valid
  if (!validator.isLength(username, { min: 3, max: 20 })) {
    return res.status(400).json({
      success: false,
      error: "Username must be between 3 and 20 characters long",
    });
  }
  // ** Check gender --Men/Women --
  if (!validator.isIn(gender, ["men", "women"])) {
    return res.status(400).json({ success: false, error: "Invalid gender" });
  }

  // ** check pssword is strong
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({
      success: false,
      error: "strong password Add uppercase and lowercase letters and symbol .",
    });
  }

  if (!validator.matches(phonenumber, /^\+212[6-7][0-9]{8}$/)) {
    return res
      .status(400)
      .json({ success: false, error: "Invalid phone number format" });
  }

  // Check if user already exists
  const existingUser = await Users.findOne({ email });
  if (existingUser) {
    return res
      .status(409)
      .send("Email already exists, please Set a different email address.");
  }

  // Hashed/Encrypt password
  const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT));

  try {
    const user = await Users.create({
      username,
      gender,
      email,
      password: hashedPassword,
      phonenumber,
    });

    // Create a JSON Web Token (JWT) for authentication
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT, {
      expiresIn: "10min",
    });

    res.status(201).json({ success: true, accessToken });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ** Login---------User
export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // ** Check email and password Not empty
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // ** Check email is email
    if (!validator.isEmail(email)) {
      res.status(400).json({ error: "Email Not Valide" });
    }

    // ** check user is exist or No
    const userExists = await Users.findOne({ email });
    if (!userExists) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // ** Match passwords with Database
    const passwordMatch = await bcrypt.compare(password, userExists.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // ** Create a JSON Web Token (JWT) for authentication
    const accessToken = jwt.sign(
      { userId: userExists._id },
      process.env.JWT,
      {
        expiresIn: "5min",
      }
    );

    // ** Create a refresh token
    const refreshToken = jwt.sign(
      { userId: userExists._id },
      process.env.JWT,
      {
        expiresIn: "15min",
      }
    );

    // ** Send the token to the client side
    res.cookie("jwt", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    // ** Send the token with user info
    return res.json({
      accessToken,
      username: userExists.username,
      email: userExists.email,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
