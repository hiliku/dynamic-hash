const hash = require("./index");
const assert = require("assert");

test = (async () => {
  const val = "test";
  const genSalt = await hash.genSalt();
  console.log(`-- Gen new salt --> ${JSON.stringify(genSalt)}`);
  const salt = await hash.getSalt();
  console.log(`-- Get current salt --> ${salt}`);
  const str = await hash.hashVal(val, salt);
  console.log(
    `-- Returns an hash string of the given value with the salt --> ${str}`
  );
  const check = await hash.checkVal(val, str, salt);
  console.log(`-- Check if given value is equal to hash string --> ${check}`);
  const cipher = await hash.getVal(str, salt);
  console.log(
    `-- Cipher the hash with the current salt --> '${cipher}' should be equal as '${val}'`
  );
})();
