//  eslint-disable-next-line
const handleErrors = (err, req, res, next) => {
  const { code, message } = err;
  return res.status(code).json({
    status: "error",
    message,
  });
};
module.exports = handleErrors;
