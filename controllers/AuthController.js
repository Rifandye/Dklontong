const UserModel = require("../models/user.model");
const { hashPass } = require("../utils/bcrypt");

module.exports = class AuthController {
  static async register(req, res, next) {
    try {
      const { firstName, lastName, email, password } = req.body;

      if (!firstName) throw { name: "FirstNameRequired" };
      if (!lastName) throw { name: "LastNameRequired" };
      if (!email) throw { name: "EmailRequired" };
      if (!password) throw { name: "PasswordRequired" };

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
};
