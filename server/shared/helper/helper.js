module.exports = {
  ApiSuccess: (httpStatus, data, res) => {
    res.status(httpStatus).json({
      success: true,
      data,
    });
  },
  ApiError: (httpStatus, error, res) => {
    res.status(httpStatus).json({
      success: false,
      error,
    });
  },
};