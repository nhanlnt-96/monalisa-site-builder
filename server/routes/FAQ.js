const express = require("express");
const {validateToken} = require("../middleware/authentication");
const {
  ApiError,
  ApiSuccess
} = require("../shared/helper/helper");
const {
  FAQ,
  FAQDetail
} = require("../models");

const router = express.Router();

router.post("/general", validateToken, async (req, res) => {
  const post = req.body;
  try {
    await post.map(async (val) => {
      if (val.title && val.subTitle) {
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

router.post("/detail", validateToken, async (req, res) => {
  const post = req.body;
  try {
    if (post.question && post.answer) {
      await FAQDetail.create(post);
      ApiSuccess(201, post, res);
    } else {
      ApiError(400, "FAQ's content can not empty.", res);
    }
  } catch (error) {
    ApiError(400, error, res);
  }
});

router.patch("/update/general/:id", validateToken, async (req, res) => {
  const {
    title,
    subTitle
  } = req.body;
  const contentId = req.params.id;
  const checkContentExist = await FAQ.findByPk(contentId);
  try {
    if (checkContentExist) {
      await FAQ.update({
        title,
        subTitle
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

router.patch("/update/detail/:id", validateToken, async (req, res) => {
  const {
    question,
    answer
  } = req.body;
  const contentId = req.params.id;
  const checkContentExist = await FAQDetail.findByPk(contentId);
  try {
    if (checkContentExist) {
      await FAQDetail.update({
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
  const faqContentRes = await FAQ.findAll();
  const faqContent = faqContentRes[0];
  const faqDetailContent = await FAQDetail.findAll();
  ApiSuccess(200, {
    faqContent,
    faqDetailContent
  }, res);
});

module.exports = router;