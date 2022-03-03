const express = require("express");
const {
  body,
  validationResult
} = require("express-validator");
const {
  Collections,
  CollectionsDetail,
} = require("../models");
const {
  ApiError,
  ApiSuccess
} = require("../shared/helper/helper");
const {validateToken} = require("../middleware/authentication");

const router = express.Router();

router.post("/general", validateToken, async (req, res) => {
  const post = req.body;
  try {
    const {
      title,
      subTitle
    } = post;
    if (title || subTitle) {
      await Collections.create(post);
    } else {
      ApiError(400, "Collection's content can not empty.", res);
    }
    ApiSuccess(201, post, res);
  } catch (error) {
    ApiError(400, error, res);
  }
});

router.post("/images", validateToken, body("imageName").notEmpty().trim(), body("imageUrl").notEmpty().trim(), async (req, res) => {
  const errors = validationResult(req);
  const post = req.body;
  try {
    if (errors.isEmpty()) {
      await CollectionsDetail.create(post);
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
    subTitle,
  } = req.body;
  const contentId = req.params.id;
  const checkContentExist = await Collections.findByPk(contentId);
  
  try {
    if (checkContentExist) {
      await Collections.update({
        title,
        subTitle
      }, {
        where: {id: contentId},
        returning: true,
        plain: true,
      });
      ApiSuccess(201, "Updated", res);
    } else {
      ApiError(400, "Content not found", res);
    }
  } catch (error) {
    ApiError(400, error, res);
  }
});

router.delete("/images/:id", validateToken, async (req, res) => {
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
  const collectionsRes = await Collections.findAll();
  const collectionsContent = collectionsRes[0];
  const collectionsImgContent = await CollectionsDetail.findAll();
  ApiSuccess(200, {
    collectionsContent,
    collectionsImgContent
  }, res);
});

module.exports = router;
