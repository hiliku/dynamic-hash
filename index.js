// "use strict";
const crypto = require("crypto");
const fs = require("fs");

const saltFile = "./salt/prase.json";

// generate random hash string by timestamp
genHash = async (type = "sha256") => { // type = md5 | sha1 | sha256
  let time = Date.now();
  let hash = crypto.createHash(type);
  hash.update(String(time));
  let str = await hash.digest("hex");
  return str;
};

module.exports = {
  // gen random salt string
  genSalt: async () => {
    const salt = await genHash();
    const time = Date.now();
    const data = { salt, time };

    // delete local prase file
    try {
      fs.unlinkSync(saltFile);
    } catch (err) {
      console.log("no such file");
    }
    // create local prase file with new salt
    try {
      fs.writeFileSync(saltFile, JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  },

  // get current salt prase
  getSalt: async () => {
    fs.open(saltFile, "r", (err, fd) => {
      if (err) throw err;
      fs.close(fd, err => {
        if (err) throw err;
        console.log(fd)
      });
    });
  }
};
