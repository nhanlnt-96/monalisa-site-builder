const express = require("express");
const {
  body,
  validationResult
} = require("express-validator");
const {
  Collections
} = require("../models");
const {
  ApiError,
  ApiSuccess
} = require("../shared/helper/helper");
const {validateToken} = require("../middleware/authentication");

const router = express.Router();

router.post("/", validateToken, body("imageName").notEmpty().trim(), body("imageUrl").notEmpty().trim(), async (req, res) => {
  const errors = validationResult(req);
  const post = req.body;
  try {
    if (errors.isEmpty()) {
      await Collections.create(post);
      ApiSuccess(201, post, res);
    } else {
      ApiError(400, errors.array(), res);
    }
  } catch (error) {
    ApiError(400, error, res);
  }
});

router.delete("/:id", validateToken, async (req, res) => {
  const contentId = req.params.id;
  const checkContentExist = await Collections.findByPk(contentId);
  try {
    if (checkContentExist) {
      await Collections.destroy({where: {id: contentId}});
      ApiSuccess(200, "Deleted", res);
    } else {
      ApiError(400, "Content not found", res);
    }
  } catch (error) {
    ApiError(400, error, res);
  }
});

router.get("/", async (req, res) => {
  const bannerContent = await Collections.findAll();
  ApiSuccess(200, bannerContent, res);
});

module.exports = router;
