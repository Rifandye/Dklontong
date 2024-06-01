const UserModel = require("../models/user.model");
const { hashPass, comparePass } = require("../utils/bcrypt");
const { signToken } = require("../utils/jwt");

module.exports = class AuthController {
  static async register(req, res, next) {
    try {
      const { firstName, lastName, email, password } = req.body;

      if (!firstName) throw { name: "FirstNameRequired" };
      if (!lastName) throw { name: "LastNameRequired" };
      if (!email) throw { name: "EmailRequired" };
      if (!password) throw { name: "PasswordRequired" };

      const user = await UserModel.findOne({ email: email });

      if (user) throw { name: "UserAlreadyRegistered" };

      const hashedPass = hashPass(password);

      const data = await UserModel.create({
        firstName,
        lastName,
        email,
        password: hashedPass,
      });

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: "EmailRequired" };
      if (!password) throw { name: "PasswordRequired" };

      const user = await UserModel.findOne({ email: email });

      if (!user) throw { name: "UserNotRegistered" };

      const comparedPass = comparePass(password, user.password);

      if (!comparedPass) throw { name: "InvalidPassword" };

      const access_token = signToken({ id: user.id });

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
};
