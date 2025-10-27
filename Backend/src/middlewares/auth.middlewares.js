const foodPartnerModel = require("../model/foodpartner.model");
const JWT = require("jsonwebtoken");

exports.authFoodPartnerMiddlewares = async (req, res, next) => {
  const token = req.cookies.token;
  console.log("token=>>>>>>>>>", token);

  if (!token) {
    return res.status(401).json({
      message: "please Login first",
    });
  }

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    const foodPartner = await foodPartnerModel.findById(decoded.id);
    console.log("foodPartner=========>",foodPartner);
    req.foodPartner = foodPartner;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
        message: "invalid token"
    })
  }
};
