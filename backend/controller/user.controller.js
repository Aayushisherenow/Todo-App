import  User  from "../models/user.model.js";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!username.trim() || !password.trim()) {
    return res.status(400).json({ message: "All fields are required" });
  } else if (username.length < 6) {
    return res
      .status(400)
      .json({ message: "Username must be at least 6 characters long" });
  } else if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long and contain at least one letter and one number",
    });
  }

  const existingUser = await User.findOne({ username: username.trim() });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  try {
    const createdUser = await User.create({
      username: username.trim(),
      password: password.trim(),
    });


      const createdUserExists = await User.findById(createdUser._id).select(
        "-password -__v"
      );


    if (!createdUserExists) {
      return res.status(400).json({ message: "User creation failed" });
      }
      

    return res
      .status(201)
      .json({ message: "User registered successfully", user: createdUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username.trim() || !password.trim()) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ username: username.trim() });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (user.password !== password.trim()) {
      return res.status(400).json({ message: "Invalid credentials" });
    }


    return res.status(200).json({
      message: "Login successful",
      user: { id: user._id, username: user.username },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { registerUser, loginUser };