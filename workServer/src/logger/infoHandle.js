const path = require("path");
const { write } = require("../utils/file.js");
const route = require('../constant/routePathName')
module.exports = (info, ctx) => {
  const LogPath = path.join(__dirname, "../logger/logFile/");
  write(route[ctx.url], LogPath, info);
};
