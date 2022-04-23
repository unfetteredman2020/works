module.exports = (err, ctx) => {
  let status = 400;
  switch (err.code) {
    case "400":
      status = 400;
      break;
    case "401":
      status = 401;
      break;
    case "409":
      status = 409;
      break;
    case "500":
      status = 500;
      break;
    default:
      status = 404;
  }
  ctx.status = status;
  ctx.body = err;
};
