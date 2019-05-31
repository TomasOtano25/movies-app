import mongoose from "mongoose";

export const connect = () => {
  if (process.env.TEST_DATABASE_URL) {
    return mongoose.connect(process.env.TEST_DATABASE_URL, {
      useCreateIndex: true,
      useNewUrlParser: true
    });
  }

  if (process.env.DATABASE_URL) {
    return mongoose.connect(process.env.DATABASE_URL, {
      useCreateIndex: true,
      useNewUrlParser: true
    });
  }
};
