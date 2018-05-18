const dynamicHash = require("./index");
const assert = require("assert");

test = (async () => {
  const value = "test";
  const genSalt = await dynamicHash.genSalt();
  console.log(`-- Gen new salt --> ${JSON.stringify(genSalt)}`);
  const salt = await dynamicHash.getSalt();
  console.log(`-- Get current salt --> ${salt}`);
  const encrypted = await dynamicHash.hashVal(value, salt);
  console.log(`-- Returns an hash string of the given value with the salt --> ${encrypted}`);
  const check = await dynamicHash.checkVal(value, encrypted, salt);
  console.log(`-- Check if given value is equal to hash string --> ${check}`);
  const decrypted = await dynamicHash.getVal(encrypted, salt);
  console.log(`-- Cipher the hash with the current salt --> '${decrypted}' should be equal as '${value}'`);
})();
