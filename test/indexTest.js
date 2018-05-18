const dynamicHash = require("../index");
const assert = require("chai").assert;

describe("Dynamic-Hash Testing", () => {
  const value = 'test value to hash';
  it("Succesfully create a salt object at ./salt/prase.json", async () => {
    // generate a salt object at ./salt/prase.json
    const genSalt = await dynamicHash.genSalt();
    // ---> Returns the salt object
    assert.typeOf(genSalt, "object");
  });
  it("Get the current salt value from ./salt/prase.json", async () => {
    const salt = await dynamicHash.getSalt();
    assert.typeOf(salt, "string");
  });

  it("Testing if salt is equal to current salt at ./salt/prase.json", async () => {
    const genSalt = await dynamicHash.genSalt();
    const salt = await dynamicHash.getSalt();
    assert.equal(salt, genSalt.salt);
  });

  it("Testing if a given value is equal to a given hash", async () => {
    const salt = await dynamicHash.getSalt();
    // encrypting the given value
    const encrypted = await dynamicHash.hashVal(value, salt);
    // checking given value versus the encrypted value
    const check = await dynamicHash.checkVal(value, encrypted, salt);
    // ---> Returns Boolean
    assert.isTrue(check);
  });
});

// test = (async () => {
//   const value = "test";

//   console.log(`-- Encrypt value with current salt -->`);
//   const encrypted = await dynamicHash.hashVal(value, salt);
//   console.log(`-- Encrypted value: ${encrypted}`);

//   console.log(`-- Check if given value is equal to hash string -->`);
//   const check = await dynamicHash.checkVal(value, encrypted, salt);

//   // testing if a given value is equal to a given hash
//   try {
//     assert.ok(check)
//   } catch (e) {
//     console.log(`!!!!! ${e}`)
//     return;
//   }
//   console.log(`-- Returns Boolean value true | false : ${check}`);

//   console.log(`-- Dencrypt hash value with current salt -->`);
//   const decrypted = await dynamicHash.getVal(encrypted, salt);

//   // testing if the decrypted value is equal to the orignal encrypted value
//   try {
//     assert.deepEqual(decrypted,value)
//   } catch (e) {
//     console.log(`!!!!! ${e}`);
//     return;
//   }
//   console.log(`-- Check if the original value ${value} is returned: ${decrypted}`);
// })();
