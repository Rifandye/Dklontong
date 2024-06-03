const UserModel = require("../models/user.model");
const { verifyToken } = require("../utils/jwt");

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw { name: "InvalidToken" };

    const [type, token] = authorization.split(" ");
    if (type !== "Bearer") throw { name: "InvalidToken" };

    const decodedToken = verifyToken(token);

    const user = await UserModel.findById(decodedToken.id);
    console.log(user);
    if (!user) throw { name: "InvalidToken" };

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authentication };
