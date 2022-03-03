const express = require("express");
const {
  body,
  validationResult
} = require("express-validator");
const {
  Drops
} = require("../models");
const {
  ApiError,
  ApiSuccess
} = require("../shared/helper/helper");
const {validateToken} = require("../middleware/authentication");

const router = express.Router();

router.post("/", validateToken, body("title").notEmpty().trim(),body("content").notEmpty().trim(), async (req, res) => {
  const errors = validationResult(req);
  const post = req.body;
  try {
    if (errors.isEmpty()) {
      await Drops.create(post);
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
    title,
    content
  } = req.body;
  const contentId = req.params.id;
  const checkContentExist = await Drops.findByPk(contentId);
  try {
    if (checkContentExist) {
      await Drops.update({
        title,
        content
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
  const dropsContent = await Drops.findAll();
  ApiSuccess(200, dropsContent, res);
});

module.exports = router;
