const express = require("express");
const {validateToken} = require("../middleware/authentication");
const {
  ApiError,
  ApiSuccess
} = require("../shared/helper/helper");
const {
  Roadmap,
  RoadmapDetail
} = require("../models");

const router = express.Router();

router.post("/general", validateToken, async (req, res) => {
  const post = req.body;
  try {
    const {
      title,
      description
    } = post;
    if (title || description) {
      await Roadmap.create(post);
    } else {
      ApiError(400, "Roadmap's content can not empty.", res);
    }
    ApiSuccess(201, post, res);
  } catch (error) {
    ApiError(400, error, res);
  }
});

router.post("/detail", validateToken, async (req, res) => {
  const post = req.body;
  try {
    await post.map(async (val) => {
      const {
        phase,
        phaseDesc
      } = val;
      if (phase || phaseDesc) {
        await RoadmapDetail.create(val);
      } else {
        ApiError(400, "Roadmap's content can not empty.", res);
      }
    });
    ApiSuccess(201, post, res);
  } catch (error) {
    ApiError(400, error, res);
  }
});

router.patch("/update/general/:id", validateToken, async (req, res) => {
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

router.patch("/update/detail/:id", validateToken, async (req, res) => {
  const {
    phase,
    phaseDesc,
    imageName,
    imageUrl
  } = req.body;
  const contentId = req.params.id;
  const checkContentExist = await RoadmapDetail.findByPk(contentId);
  try {
    if (checkContentExist) {
      await RoadmapDetail.update({
        phase,
        phaseDesc,
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
  const roadmapGeneralRes = await Roadmap.findAll();
  const roadmapDetail = await RoadmapDetail.findAll();
  const roadmapGeneral = roadmapGeneralRes[0];
  ApiSuccess(200, {
    roadmapGeneral,
    roadmapDetail
  }, res);
});

module.exports = router;