const express = require("express");
const {
  body,
  validationResult
} = require("express-validator");
const {User} = require("../models");
const bcryptjs = require("bcryptjs");
const {
  ApiError,
  ApiSuccess
} = require("../shared/helper/helper");
const {
  createToken,
  validateToken
} = require("../middleware/authentication");

const router = express.Router();

router.post("/", body("username").notEmpty().trim(), body("username").custom(value => {
  return User.findOne({where: {username: value}}).then((res) => {
    if (res)
      return Promise.reject("Username already in use");
  });
}), body("password").trim().isLength({min: 5}), body("fullName").notEmpty().trim(), async (req, res) => {
  const errors = validationResult(req);
  const {
    username,
    password,
    fullName,
    avatarUrl
  } = req.body;
  
  try {
    if (errors.isEmpty()) {
      bcryptjs.hash(password, 10).then((hash) => {
        User.create({
          username: username,
          password: hash,
          fullName,
          avatarUrl
        });
        ApiSuccess(201, `Username ${username} is created`, res);
      });
    } else {
      ApiError(400, errors.array(), res);
    }
  } catch (error) {
    ApiError(400, error, res);
  }
});

router.post("/login", body("username").notEmpty().trim(), body("password").notEmpty().trim(), async (req, res) => {
  const errors = validationResult(req);
  const {
    username,
    password
  } = req.body;
  const user = await User.findOne({where: {username}});
  try {
    if (errors.isEmpty()) {
      if (!user) {
        ApiError(400, "Username does not exist.", res);
      } else {
        bcryptjs.compare(password, user.password).then((match) => {
          if (!match) {
            ApiError(400, "Username or password is wrong.", res);
          } else {
            const accessToken = createToken(user);
            ApiSuccess(200, {
              accessToken,
              username
            }, res);
          }
        });
      }
    } else {
      ApiError(400, errors.array(), res);
    }
  } catch (error) {
    ApiError(400, error, res);
  }
});

router.patch("/change-password/", validateToken, body("password").trim().isLength({min: 5}), async (req, res) => {
  const id = req.user.id;
  const userCheck = await User.findByPk(id);
  const {
    currentPassword,
    newPassword
  } = req.body;
  
  try {
    bcryptjs.compare(currentPassword, userCheck.password).then((match) => {
      if (!match) {
        ApiError(400, "Password not match.", res);
      } else {
        bcryptjs.hash(newPassword, 10).then((hash) => {
          if (userCheck.isFirstLogin) {
            User.update({
              password: hash,
              isFirstLogin: false
            }, {
              where: {id},
            });
          } else {
            User.update({
              password: hash,
            }, {
              where: {id},
            });
          }
          ApiSuccess(200, "Password is changed", res);
        });
      }
    });
  } catch (error) {
    ApiError(400, error, res);
  }
});

router.get("/auth", validateToken, async (req, res) => {
  const id = req.user.id;
  const userIsAuth = await User.findByPk(id, {attributes: {exclude: "password"}});
  ApiSuccess(200, userIsAuth, res);
});

module.exports = router;
