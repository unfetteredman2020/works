const fs = require("fs");

let log = {};

function getHandle() {
  return new Promise((resolve, reject) => {
    try {
      fs.readdir(__dirname, "utf8", (err, data) => {
          // console.log('data', data)
        if (err) {
          console.error("router error", err);
          reject({});
        }
        let file = data.filter(item=>item.indexOf('.js') !== -1)
        file.forEach((filename) => {
          // console.log('filename', filename)
          if (filename !== "index.js") {
            //   console.log('filename.split', filename.split('.')[0])
            let r = require("./" + filename);
            // console.log('r', r)
            log[filename.split(".")[0]] = r;
          }
        });
        // console.log("log", log);
        resolve(log);
      });
    } catch (error) {
      reject({});
      console.log(`fs log file error`, error);
    }
  });
}

module.exports = getHandle();
