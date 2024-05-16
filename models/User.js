import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
      require: true,
    },
    email: { type: String, require: true, uppercase: true },
    password: { type: String, require: true },
  },
  {
    timestamp: true,
  }
);

export const User = mongoose.model("User", UserSchema);
