const apiResponse = {
  success: (res, data, message = 'Success') => {
    res.status(200).json({
      success: true,
      message,
      data
    });
  },

  error: (res, statusCode = 500, message = 'Error', error = null) => {
    res.status(statusCode).json({
      success: false,
      message,
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

module.exports = apiResponse;