// "use strict";
const crypto = require("crypto");
const fs = require("fs");

const saltFile = "./salt/prase.json";
const method = "aes-256-cbc";

// generate random hash string by timestamp
genHash = async () => {
  const time = Date.now();
  const hash = crypto.createHash('sha256');
  hash.update(String(time));
  const data = await hash.digest("hex");
  return data;
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
    return data;
  },

  // get current salt prase
  getSalt: async () => {
    try {
      return JSON.parse(fs.readFileSync(saltFile, "utf8")).salt;
    } catch (err) {
      console.log(err);
    }
  },

  // hash value with given salt
  hashVal: async (value, salt) => {
    let hash = crypto.createCipher(method, salt);
    let data = hash.update(value, 'utf-8', 'hex');
    data += hash.final('hex');
    return data;
  },

  // reverse hash ot original value with given salt
  getVal: async (hash, salt) => { 
    const cipher = crypto.createDecipher(method, salt);
    let data = cipher.update(hash, 'hex', 'utf-8');
    data += cipher.final('utf-8');
    return data;
  },

  // compare two values with given salt
  checkVal: async (val, hashVal, salt) => {
    const hash = crypto.createCipher(method, salt);
    let data = hash.update(val, 'utf-8', 'hex');
    data += hash.final('hex');
    return data == hashVal;
  }
};
