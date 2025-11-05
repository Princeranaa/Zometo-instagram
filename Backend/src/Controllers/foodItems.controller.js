const foodItemModel = require("../model/foodItem.model");
const imagekitConfig = require("../config/imagekit");
const { v4: uuid } = require("uuid");

exports.createFood = async (req, res) => {
  try {
    const { name, description } = req.body;

    //  Basic validation
    if (!name || !description) {
      return res.status(400).json({
        message: "Missing required fields: name, description, or foodPartner",
      });
    }

    //  Validate file upload
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({
        message: "Food image/video file is required",
      });
    }

    //  Upload file to ImageKit (or your file service)
    const fileUploadResult = await imagekitConfig.uploadFile(
      req.file.buffer,
      uuid()
    );

    console.log("fileUploadResult==========>", fileUploadResult);

    //  Validate upload result
    if (!fileUploadResult || !fileUploadResult.url) {
      return res.status(500).json({
        message: "File upload failed, no URL returned from ImageKit",
      });
    }

    //  Create the food item record
    const foodItem = await foodItemModel.create({
      name,
      description,
      video: fileUploadResult.url,
      foodPartner: req.foodPartner._id,
    });

    console.log(foodItem);
    

    //  Success response
    res.status(201).json({
      message: "Food created successfully",
      foodItem,
    });
  } catch (error) {
    console.error("Error creating food item:", error);
    res.status(500).json({
      message: "Internal server error while creating food item",
      error: error.message,
    });
  }
  
};

exports.getFoodItems = async (req, res) => {
  try {
    const foodItem = await foodItemModel.find({});
    console.log("foodItem==>>>>>>",foodItem);
    res.status(200).json({
      message: "foodItems fetch sucessfully",
      foodItem,
    });
  } catch (error) {}
};
