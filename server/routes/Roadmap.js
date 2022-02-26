const express = require("express");
const {validateToken} = require("../middleware/authentication");
const {
  ApiError,
  ApiSuccess
} = require("../shared/helper/helper");
const {
  Roadmap
} = require("../models");

const router = express.Router();

router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  try {
    await post.map(async (val) => {
      if (val.title || val.description) {
        await Roadmap.create(val);
      } else {
        ApiError(400, "Roadmap's content can not empty.", res);
      }
    });
    ApiSuccess(201, post, res);
  } catch (error) {
    ApiError(400, error, res);
  }
});

router.patch("/update/:id", validateToken, async (req, res) => {
  const {
    title,
    description
  } = req.body;
  const contentId = req.params.id;
  const checkContentExist = await Roadmap.findByPk(contentId);
  try {
    if (checkContentExist) {
      await Roadmap.update({
        title,
        description
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
  const aboutContent = await Roadmap.findAll();
  ApiSuccess(200, aboutContent, res);
});

module.exports = router;