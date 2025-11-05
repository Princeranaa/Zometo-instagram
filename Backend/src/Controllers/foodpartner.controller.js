const foodPartnerModel = require("../model/foodpartner.model");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

exports.registerFoodPartner = async (req, res) => {
  const { name, email, password, phone, address, contactName } = req.body;
  const isAcoountexist = await foodPartnerModel.findOne({ email });

  if (isAcoountexist) {
    return res.status(400).json({ message: "Food Partner already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const foodPartner = await foodPartnerModel.create({
    name,
    email,
    password: hashedPassword,
    phone,
    address,
    contactName,
  });

  const token = JWT.sign(
    {
      id: foodPartner._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);
  res.status(201).json({
    message: "Food Partner registered successfully",
    foodPartner: {
      id: foodPartner._id,
      name: foodPartner.name,
      email: foodPartner.email,
      phone: foodPartner.phone,
      address: foodPartner.address,
      contactName: foodPartner.contactName,
    },
  });
};

exports.loginFoodPartner = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foodPartner = await foodPartnerModel.findOne({ email });

    if (!foodPartner) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, foodPartner.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = JWT.sign(
      {
        id: foodPartner._id,
      },
      process.env.JWT_SECRET
    );

    res.cookie("token", token);
    res.status(200).json({
      message: "Food Partner log in successfully",
      foodPartner: {
        id: foodPartner._id,
        name: foodPartner.name,
        email: foodPartner.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in logging in food partner",
      error: error.message,
    });
  }
};

exports.LogoutFoodPartner = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Food Partner logged out successfully" });
};
