const express = require("express");
const {validateToken} = require("../middleware/authentication");
const {
  ApiError,
  ApiSuccess
} = require("../shared/helper/helper");
const {
  Spot
} = require("../models");

const router = express.Router();

router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  try {
    await post.map(async (val) => {
      const {
        description,
        imageName,
        imageUrl
      } = val;
      if (description || imageName || imageUrl) {
        await Spot.create(val);
      } else {
        ApiError(400, "Spot's content can not empty.", res);
      }
    });
    ApiSuccess(201, post, res);
  } catch (error) {
    ApiError(400, error, res);
  }
});

router.patch("/update/:id", validateToken, async (req, res) => {
  const {
    description,
    imageName,
    imageUrl
  } = req.body;
  const contentId = req.params.id;
  const checkContentExist = await Spot.findByPk(contentId);
  try {
    if (checkContentExist) {
      await Spot.update({
        description,
        imageName,
        imageUrl
      }, {
        where: {id: contentId},
        returning: true,
        plain: true,
      }).then((result) => {
        ApiSuccess(201, result, res);
      });
    } else {
      ApiError(400, "Content not found", res);
    }
  } catch (error) {
    ApiError(400, error, res);
  }
});

router.get("/", async (req, res) => {
  const spotContent = await Spot.findAll();
  ApiSuccess(200, spotContent, res);
});

module.exports = router;