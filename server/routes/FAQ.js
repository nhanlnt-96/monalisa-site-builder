const express = require("express");
const {validateToken} = require("../middleware/authentication");
const {
  ApiError,
  ApiSuccess
} = require("../shared/helper/helper");
const {
  FAQ
} = require("../models");

const router = express.Router();

router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  try {
    await post.map(async (val) => {
      if (val.question && val.answer) {
        await FAQ.create(val);
      } else {
        ApiError(400, "FAQ's content can not empty.", res);
      }
    });
    ApiSuccess(201, post, res);
  } catch (error) {
    ApiError(400, error, res);
  }
});

router.patch("/update/:id", validateToken, async (req, res) => {
  const {
    question,
    answer
  } = req.body;
  const contentId = req.params.id;
  const checkContentExist = await FAQ.findByPk(contentId);
  try {
    if (checkContentExist) {
      await FAQ.update({
        question,
        answer
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
  const faqContent = await FAQ.findAll();
  ApiSuccess(200, faqContent, res);
});

module.exports = router;