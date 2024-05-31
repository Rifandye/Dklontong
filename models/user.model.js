const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is Required"],
    },

    lastName: {
      type: String,
      required: [true, "Last Name is Required"],
    },

    email: {
      type: String,
      required: [true, "Email is Required"],
    },

    password: {
      type: String,
      required: [true, "Password is Required"],
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
