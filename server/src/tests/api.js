import axios from "axios";

const API_URL = "http://localhost:8000/graphql";

export const signIn = async variables =>
  axios.post(API_URL, {
    query: `
    mutation ($login: String!, $password: String!) {
      signIn(input: { login: $login, password: $password }) {
        token
      }
    }
  `,
    variables
  });

export const me = async token =>
  axios.post(
    API_URL,
    {
      query: `{
        me {
          id
          email
          username
        }
      }`
    },
    token ? { headers: { "x-token": token } } : null
  );

export const signUp = async variables =>
  axios.post(API_URL, {
    query: `
      mutation(
        $username: String!,
        $email: String!,
        $password: String!
      ) {
        signUp(input: {
          username: $username,
          email: $email,
          password: $password
        }) {
          token
        }
      }
    `,
    variables
  });
