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
    case "UserNotRegistered":
      res.status(404).json({ message: "User Not Registered, Register First!" });
      break;
    case "InvalidPassword":
      res.status(400).json({ message: "Invalid Password" });
      break;
    case "MissingRequiredFields":
      res.status(400).json({ message: "Must Filled All Required Fields" });
      break;
    case "CategoryNotFound":
      res.status(404).json({ message: "Category Not Found" });
      break;
    case "ProductNotFound":
      res.status(404).json({ message: "Product Not Found" });
      break;
    case "FileIsRequired":
      res.status(400).json({ message: "Product Image Required" });
      break;
    default:
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
      break;
  }
};

module.exports = errorHandler;
