import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    users: [User!]
    me: User
  }

  type Mutation {
    signUp(input: SignUpInput!): Token!
    signIn(input: SignInInput!): Token!
    deleteUser(_id: ID): User
    updateUser(_id: ID): User
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Token {
    token: String!
  }

  input SignUpInput {
    username: String!
    email: String!
    password: String!
  }

  input SignInInput {
    login: String!
    password: String!
  }
`;

export default typeDefs;

/*export default makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
});*/
