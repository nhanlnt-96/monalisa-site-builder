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
  About,
  AboutImg,
} = require("../models");

const router = express.Router();

router.post("/", validateToken, body("content").notEmpty().trim(), async (req, res) => {
  const errors = validationResult(req);
  const post = req.body;
  try {
    if (errors.isEmpty()) {
      await About.create({
        title: post.title,
        content: post.content
      }, {
        returning: true,
        plain: true,
      }).then(async (response) => {
        await post.imageArr.map(async (val) => {
          await AboutImg.create({
            imageName: val.imageName,
            imageUrl: val.imageUrl,
            AboutId: response.id
          });
        });
        ApiSuccess(201, response, res);
      });
    } else {
      ApiError(400, errors.array(), res);
    }
  } catch (error) {
    ApiError(400, error, res);
  }
});

router.post("/images/", validateToken, body("contentId").notEmpty(), async (req, res) => {
  const errors = validationResult(req);
  const post = req.body;
  try {
    if (errors.isEmpty()) {
      post.imageArr.map(async (val) => {
        await AboutImg.create({
          imageName: val.imageName,
          imageUrl: val.imageUrl,
          AboutId: post.contentId
        });
      });
      ApiSuccess(201, "Posted", res);
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
    content,
  } = req.body;
  const contentId = req.params.id;
  const checkContentExist = await About.findByPk(contentId);
  
  try {
    if (checkContentExist) {
      await About.update({
        title,
        content
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

router.delete("/:id", validateToken, async (req, res) => {
  const imageId = req.params.id;
  const checkImageExist = await AboutImg.findByPk(imageId);
  try {
    if (checkImageExist) {
      await AboutImg.destroy({where: {id: imageId}});
      ApiSuccess(200, "Deleted", res);
    } else {
      ApiError(400, "Content not found", res);
    }
  } catch (error) {
    ApiError(400, error, res);
  }
});

router.get("/", async (req, res) => {
  await About.findAll({
    include: AboutImg
  }).then((response) => {
    ApiSuccess(200, response, res);
  });
});

module.exports = router;