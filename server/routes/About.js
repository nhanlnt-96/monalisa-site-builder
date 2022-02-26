const express = require("express");
const {validateToken} = require("../middleware/authentication");
const {
  body,
  validationResult
} = require("express-validator");
const {
  ApiError,
  ApiSuccess
} = require("../shared/helper/helper");
const {
  About
} = require("../models");

const router = express.Router();

router.post("/", validateToken, body("content").notEmpty().trim(), async (req, res) => {
  const errors = validationResult(req);
  const post = req.body;
  try {
    if (errors.isEmpty()) {
      await About.create(post);
      ApiSuccess(201, post, res);
    } else {
      ApiError(400, errors.array(), res);
    }
  } catch (error) {
    ApiError(400, error, res);
  }
});

router.patch("/update/:id", validateToken, async (req, res) => {
  const {
    content,
    imageName,
    imageUrl,
    bgImageName,
    bgImageUrl
  } = req.body;
  const contentId = req.params.id;
  const checkContentExist = await About.findByPk(contentId);
  try {
    if (checkContentExist) {
      await About.update({
        content,
        imageName,
        imageUrl,
        bgImageName,
        bgImageUrl
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
  const aboutContent = await About.findAll();
  ApiSuccess(200, aboutContent, res);
});

module.exports = router;