const express = require("express");
const {validateToken} = require("../middleware/authentication");
const {
  ApiError,
  ApiSuccess
} = require("../shared/helper/helper");
const {
  Team
} = require("../models");

const router = express.Router();

router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  try {
    await post.map(async (val) => {
      const {
        name,
        position,
        imageName,
        imageUrl
      } = val;
      if (name || position || imageName || imageUrl) {
        await Team.create(val);
      } else {
        ApiError(400, "Team's content can not empty.", res);
      }
    });
    ApiSuccess(201, post, res);
  } catch (error) {
    ApiError(400, error, res);
  }
});

router.patch("/update/:id", validateToken, async (req, res) => {
  const {
    name,
    position,
    imageName,
    imageUrl
  } = req.body;
  const contentId = req.params.id;
  const checkContentExist = await Team.findByPk(contentId);
  try {
    if (checkContentExist) {
      await Team.update({
        name,
        position,
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
  const teamContent = await Team.findAll();
  ApiSuccess(200, teamContent, res);
});

module.exports = router;