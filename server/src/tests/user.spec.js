/* eslint-disable */
import { expect } from "chai";

import * as api from "./api";
import { models } from "./tests-helper";

describe("users", () => {
  it("signs up a user", async () => {
    const {
      data: {
        data: {
          signUp: { token }
        }
      }
    } = await api.signUp({
      username: "Mark",
      email: "mark@gmule.com",
      password: "123456"
    });

    const expecedNewUser = await models.User.findByLogin("mark@gmule.com");

    const {
      data: {
        data: { me }
      }
    } = await api.me(token);

    expect(me).to.eql({
      id: expecedNewUser.id,
      username: expecedNewUser.username,
      email: expecedNewUser.email
    });
  });
});
