const foodItemModel = require("../model/foodItem.model");
const imagekitConfig = require("../config/imagekit");
const { v4: uuid } = require("uuid");
const foodpartnerModel = require("../model/foodpartner.model");
const saveModel = require("../model/SaveModel");
const likeModel = require("../model/likesModel");

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
    console.log("foodItem==>>>>>>", foodItem);
    res.status(200).json({
      message: "foodItems fetch sucessfully",
      foodItem,
    });
  } catch (error) {}
};

exports.getFoodPartnerById = async (req, res) => {
  const foodPartnerId = req.params.id;

  const foodPartner = await foodpartnerModel.findById(foodPartnerId);
  const foodItemsByFoodPartner = await foodItemModel.find({
    foodPartner: foodPartnerId,
  });

  if (!foodPartner) {
    return res.status(404).json({ message: "Food partner not found" });
  }

  res.status(200).json({
    message: "Food partner retrieved successfully",
    foodPartner: {
      ...foodPartner.toObject(),
      foodItems: foodItemsByFoodPartner,
    },
  });
};

exports.likeFood = async (req, res) => {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadyLiked = await likeModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isAlreadyLiked) {
    await likeModel.deleteOne({
      user: user._id,
      food: foodId,
    });

    await foodItemModel.findByIdAndUpdate(foodId, {
      $inc: { likeCount: -1 },
    });

    return res.status(200).json({
      message: "Food unliked successfully",
    });
  }

  const like = await likeModel.create({
    user: user._id,
    food: foodId,
  });

  await foodItemModel.findByIdAndUpdate(foodId, {
    $inc: { likeCount: 1 },
  });

  res.status(201).json({
    message: "Food liked successfully",
    like,
  });
};

exports.saveFood = async (req, res) => {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadySaved = await saveModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isAlreadySaved) {
    await saveModel.deleteOne({
      user: user._id,
      food: foodId,
    });

    await foodItemModel.findByIdAndUpdate(foodId, {
      $inc: { savesCount: -1 },
    });

    return res.status(200).json({
      message: "Food unsaved successfully",
    });
  }

  const save = await saveModel.create({
    user: user._id,
    food: foodId,
  });

  await foodItemModel.findByIdAndUpdate(foodId, {
    $inc: { savesCount: 1 },
  });

  res.status(201).json({
    message: "Food saved successfully",
    save,
  });
};

exports.getSaveFood = async (req, res) => {
  const user = req.user;

  const savedFoods = await saveModel.find({ user: user._id }).populate("food");

  if (!savedFoods || savedFoods.length === 0) {
    return res.status(404).json({ message: "No saved foods found" });
  }

  res.status(200).json({
    message: "Saved foods retrieved successfully",
    savedFoods,
  });
};
