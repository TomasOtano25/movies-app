import { Schema, model } from "mongoose";

import bcrypt from "bcrypt";
import isEmail from "validator/lib/isEmail";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, "No valid email address provided."]
  },
  password: {
    type: String,
    required: true,
    maxlength: 42
  },
  role: {
    type: String
  }
});

userSchema.statics.findByLogin = async function(login) {
  let user = await this.findOne({
    username: login
  });

  if (!user) {
    user = await this.findOne({ email: login });
  }

  return user;
};

userSchema.pre("save", async function() {
  this.password = await this.generatePasswordHash();
});

userSchema.methods.generatePasswordHash = async function() {
  const saltRounds = 10;
  return await bcrypt.hash(this.password, saltRounds);
};

userSchema.methods.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

export default model("User", userSchema);
