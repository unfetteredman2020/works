// const path = require('path');
const fs = require("fs");
const { getDate } = require("./date.js");

const write = (fileName, path, log) => {
  let content = `
  /* ----------- ${getDate("YYYY-mm-dd HH:MM:SS", new Date() )}------------------------------------------------------------------------------- */
    ${JSON.stringify(log)}
  `;
  fs.appendFile(`${path}${fileName}`, content, { encoding: "utf-8" }, (err) => {
    if (err) {
      return console.error(`addLog err`, err);
    }
  });
};
// 读取当前路径下的文件或者路径
const readDirect = (path) => {
  return new Promise((resolve, reject) => {
    try {
      fs.readdir(path, "utf8", (err, data) => {
        if (err) {
          console.error("read error", err);
          return reject();
        }
        resolve(data);
      });
    } catch (error) {
      console.log(`fs router file error`, error);
      return reject();
    }
  });
};

module.exports = {
  write,
  readDirect
};
