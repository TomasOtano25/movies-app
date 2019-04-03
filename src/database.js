import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://tomasotano25:T1212@tutorialgraphql-mrjbm.mongodb.net/test?retryWrites=true",
      {
        useNewUrlParser: true
      }
    );
    console.log(">>> DB is connected");
  } catch (error) {
    console.log("Something goes wrong!");
    console.log(error);
  }
}
