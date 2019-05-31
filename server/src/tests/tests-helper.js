/* eslint-disable */
import models, { connect } from "../models";

let db;

before(async () => {
  db = await connect();

  await Promise.all([models.User.deleteMany({})]);
});

after(async () => {
  await db.connection.close();
});

export { models };
