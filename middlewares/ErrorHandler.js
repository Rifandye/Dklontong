const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case "InvalidToken":
      res.status(401).json({ message: "You Are Unauthorized" });
      break;
    case "UserAlreadyRegistered":
      res
        .status(400)
        .json({ message: "User Already Registered, Use Different Email" });
      break;
    case "FirstNameRequired":
      res.status(400).json({ message: "First Name is Required" });
      break;
    case "LastNameRequired":
      res.status(400).json({ message: "Last Name is Required" });
      break;
    case "EmailRequired":
      res.status(400).json({ message: "Email is Required" });
      break;
    case "PasswordRequired":
      res.status(400).json({ message: "Password is Required" });
      break;
    default:
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
      break;
  }
};

module.exports = errorHandler;
