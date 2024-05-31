const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
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
    versionKey: false,
    collection: "Users",
  }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
