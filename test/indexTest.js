const dynamicHash = require("../index");
const assert = require("chai").assert;

// Value to encrypt:
const value = 'test value to hash';
// Generate a salt object at ./salt/prase.json
const genSalt = dynamicHash.genSalt(); // ---> Returns the salt object
// Get the current salt
const salt = dynamicHash.getSalt(); // ---> Returns salt
// Encrypting the given value
const encrypted = dynamicHash.hashVal(value, salt); // ---> Returns hash value
// Checking given value versus the encrypted value
const check = dynamicHash.checkVal(value, encrypted, salt); // ---> Returns Boolean
// Decrypting the given hash value
const decrypted = dynamicHash.getVal(encrypted, salt); // ---> Returns original value

describe("Dynamic-Hash Testing", () => {
  it("Succesfully create a salt object at ./salt/prase.json", () => {
    assert.typeOf(genSalt, "object");
  });
  it("Get the current salt value from ./salt/prase.json", () => {
    assert.typeOf(salt, "string");
  });

  it("Testing if salt is equal to current salt at ./salt/prase.json", () => {
    assert.equal(salt, genSalt.salt);
  });

  it("Testing if a given value is equal to a given hash", () => {
    assert.isTrue(check);
  });

  it("Testing if the decrypted value is equal to the orignal encrypted value", () => {
    assert.equal(decrypted,value)
  });
  done()
});

