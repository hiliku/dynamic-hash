// "use strict";
const crypto = require("crypto");
const fs = require("fs");

const saltFolder = './salt/'; 
const saltFile = `${saltFolder}prase.json`;
const method = "aes-256-cbc";

// generate random hash string by timestamp
genHash = () => {
  const time = Date.now();
  const hash = crypto.createHash('sha256');
  hash.update(String(time));
  const data = hash.digest("hex");
  return data;
};

module.exports = {
  // generate random salt string
  genSalt: () => {
    const salt = genHash();
    const time = Date.now();
    const data = { salt, time };

    // delete local prase file
    try {
      fs.unlinkSync(saltFile);
    } catch (err) {
      if (!fs.existsSync(saltFolder)) {
        console.log('-- ./salt/ Directory does not exist, generating...');
        fs.mkdirSync(saltFolder);
      }
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
  getSalt: () => {
    try {
      return JSON.parse(fs.readFileSync(saltFile, "utf8")).salt;
    } catch (err) {
      console.log('!!! Something is wrong! no current salt key...');
    }
  },

  // hash value with given salt
  encrypt: (value, salt) => {
    let hash = crypto.createCipher(method, salt);
    let data = hash.update(value, 'utf-8', 'hex');
    data += hash.final('hex');
    return data;
  },

  // reverse hash of original value with given salt
  decrypt: (hash, salt) => { 
    const cipher = crypto.createDecipher(method, salt);
    let data = cipher.update(hash, 'hex', 'utf-8');
    data += cipher.final('utf-8');
    return data;
  },

  // compare two values (value and hash) with given salt
  compare: (value, hash, salt) => {
    const cipher = crypto.createCipher(method, salt);
    let data = cipher.update(value, 'utf-8', 'hex');
    data += cipher.final('hex');
    return data == hash;
  },
  
  // generate random salt string
  genSaltSync: async () => {
    const salt = genHash();
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
  getSaltSync: async () => {
    try {
      return JSON.parse(fs.readFileSync(saltFile, "utf8")).salt;
    } catch (err) {
      console.log('!!! Something is wrong! no current salt key...');
    }
  },

  // hash value with given salt
  encryptSync: async (value, salt) => {
    let hash = crypto.createCipher(method, salt);
    let data = hash.update(value, 'utf-8', 'hex');
    data += hash.final('hex');
    return data;
  },

  // reverse hash of original value with given salt
  decryptSync: async (hash, salt) => { 
    const cipher = crypto.createDecipher(method, salt);
    let data = cipher.update(hash, 'hex', 'utf-8');
    data += cipher.final('utf-8');
    return data;
  },

  // compare two values (value and hash) with given salt
  compareSync: async (value, hash, salt) => {
    const cipher = crypto.createCipher(method, salt);
    let data = cipher.update(value, 'utf-8', 'hex');
    data += cipher.final('hex');
    return data == hash;
  }
};
