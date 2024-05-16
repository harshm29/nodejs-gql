import { User } from "../models/User.js";
import { Userinfo } from "../models/Userinfo.js";
import mongoose from "mongoose";
const resolvers = {
  Query: {
    async users() {
      console.log("hello");
      try {
        const user = await User.find();
        console.log(user);
        return user;
      } catch (error) {
        return {
          status: true,
          message: `error: ${error}`,
        };
      }
    },
    async user(_, argument) {
      try {
        const { id } = argument;
        const user = await User.findById(id);

        return user;
      } catch (error) {
        return {
          status: true,
          message: `error: ${error}`,
        };
      }
    },
    async userinfo(_, argument) {
      try {
        const { id } = argument;
        console.log(argument, id);
        const user = await Userinfo.findById(id).populate("user_id");
        if (user.user_id) {
          delete Object.assign(user, { ["user"]: user["user_id"] })["user_id"];
        }
        console.log(user);
        return user;
      } catch (error) {
        return {
          status: true,
          message: `error: ${error}`,
        };
      }
    },
  },

  Mutation: {
    async createUser(_, args) {
      console.log(args);
      try {
        const { name, email, age, password } = args.user;
        const newUser = new User({
          name,
          email,
          age,
          password,
        });

        const savedUser = await newUser.save();
        return savedUser;
      } catch (error) {
        return {
          status: true,
          message: `error: ${error}`,
        };
      }
    },
    async updateUser(_, args) {
      try {
        const { id, user } = args;

        const updateUser = await User.findById(id);
        if (!updateUser) {
          throw new Error("Could Not found User");
        }
        // spread
        Object.assign(updateUser, user);
        const updateSavedUser = await updateUser.save();
        return updateSavedUser;
      } catch (error) {
        throw new Error(error);
      }
    },
    async createUserInfo(_, args) {
      console.log(args);
      try {
        const { address, stripe_card, user_id } = args.userinfo; // Corrected from args.
        console.log(address, stripe_card, user_id);
        const newUser = new Userinfo({
          address,
          stripe_card,
          user_id: new mongoose.Types.ObjectId(user_id),
        });
        console.log(newUser, "newUser");
        const savedUser = await newUser.save();
        return savedUser;
      } catch (error) {
        return {
          status: false, // Changed from true to false since it's an error
          message: `Error: ${error}`,
        };
      }
    },
  },
};
export { resolvers };
