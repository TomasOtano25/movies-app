import jwt from "jsonwebtoken";
import { AuthenticationError, UserInputError } from "apollo-server";

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username } = user;
  return await jwt.sign({ id, email, username }, secret, {
    expiresIn
  });
};

export default {
  Query: {
    users: async (_, __, { models }) => {
      return await models.User.find();
    },
    me: async (_, __, { models, me }) => {
      return await models.User.findById(me.id);
    }
  },
  Mutation: {
    signUp: async (
      _,
      { input: { username, email, password } },
      { models, secret }
    ) => {
      const user = await models.User.create({
        username: username,
        email: email,
        password: password
      });

      return { token: createToken(user, secret, "30m") };
    },
    signIn: async (_, { input: { login, password } }, { models, secret }) => {
      const user = await models.User.findByLogin(login);

      if (!user) {
        throw new UserInputError("No user found with this login credentials.");
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError("Invalid password.");
      }

      return { token: createToken(user, secret, "30m") };
    },
    updateUser: async (_, { _id, input }) => {
      return await User.findByIdAndUpdate(_id, input, { new: true });
    },
    deleteUser: async (_, { _id }) => {
      return await User.findByIdAndDelete(_id);
    }
  }
};
