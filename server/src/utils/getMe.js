import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-express";

export const getMe = async req => {
  const token = req.headers["x-token"];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (error) {
      throw new AuthenticationError("Your session expired. Sign in again.");
    }
  }
};
