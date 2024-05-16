import mongoose from "mongoose";

const UserinfoSchema = mongoose.Schema(
  {
    address: {
      type: String,
      require: true,
    },
    stripe_card: {
      type: Number,
      require: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  {
    timestamp: true,
  }
);

export const Userinfo = mongoose.model("Userinfo", UserinfoSchema);
