import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "./schema";
import resolvers from "./resolvers";
import models, { connect } from "./models";
import { getMe } from "./utils/getMe";

const app = express();

app.use(cors());

app.use(morgan("dev"));

const server = new ApolloServer({
  introspection: true,
  typeDefs: schema,
  resolvers,
  formatError: error => {
    const message = error.message
      .replace("SequelizeValidationError: ", "")
      .replace("Validation error: ", "");

    return {
      ...error,
      message
    };
  },
  context: async ({ req }) => {
    const me = await getMe(req);

    return {
      models,
      me,
      secret: process.env.SECRET
    };
  }
});

server.applyMiddleware({ app, path: "/graphql" });

// const isTest = !!process.env.TEST_DATABASE_URL;
// const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 8000;

connect()
  .then(async () => {
    console.log(">>> Database connected.");
    /*if (isTest) {

    }*/

    app.listen({ port }, () =>
      console.log(`Server on http://localhost:${port}/graphql`)
    );
  })
  .catch(error => {
    console.log(error);
  });
