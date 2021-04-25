import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import checkUser from "../utilities/checkUser";

// Set cookie to expire in one month
const maxAge = 30 * 24 * 60 * 60;
const createToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "", { expiresIn: maxAge });
};

const handleErrors = (err: any) => {
  let errors: any = {};

  // Duplicate error
  if (err.code === 11000) {
    errors['duplicate'] = 'This username already have an account';
    return errors;
  }

  // Validation errors
  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }: any) => {
      errors[properties.path] = properties.message;
    });
  }

  // Login error
  if (err.code === "ERR_LOGIN_FAILED") {
    errors['login'] = err.message;
  }

  return errors;
}

export const register = async (req: Request, res: Response) => {
  const { name, password } = req.body;

  try {
    // Save user to database
    const user = await User.create({ name, password });
    // Create JWT token from user id
    const token = createToken(user._id);
    // Set cookie
    res.cookie('jwt', token, { maxAge: maxAge * 1000, httpOnly: true });
    // Send username to client
    res.status(201).json({ message: 'Registration successful!', user: user.name });
  } catch (err) {
    // Get custom errors
    const errors = handleErrors(err);
    // Send errors to client
    res.status(400).json({ errors });
  }
}

export const login = async (req: Request, res: Response) => {
  const { name, password } = req.body;

  try {
    // Returns user if credentials are valid or throws an error 
    const user = await User.login(name, password);
    // Create token
    const token = createToken(user._id);
    // Set cookie
    res.cookie('jwt', token, { maxAge: maxAge * 1000, httpOnly: true });

    res.status(200).json({ message: 'Successfully logged in', user: user.name });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}

export const logout = (_: Request, res: Response) => {
  // Delete cookie
  res.cookie('jwt', '', { maxAge: 1 });
  // End request
  res.end();
}

export const currentUser = (req: Request, res: Response) => {
  // Get token if it exists
  const token = req.cookies.jwt;

  checkUser({
    token,
    onNoToken: () => res.status(400).json({ error: "Can not find authentication token" }),
    onBadToken: () => res.status(404).json({ error: "No user found with the id at token" }),
    onInvalidToken: () => res.status(400).json({ error: "Authentication token is invalid" }),
    onSuccess: (user) => res.status(200).json({ user: user?.name })
  });
}