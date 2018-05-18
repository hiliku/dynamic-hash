const dynamicHash = require("../index");
const assert = require("chai").assert;


describe('Dynamic-Hash',() =>{
  it('Succesfully create a salt object at ./salt/prase.json', async () => {
    const genSalt = await dynamicHash.genSalt();
    assert.typeOf(genSalt.salt,'string')
  })
})

// test = (async () => {
//   const value = "test";

//   // generating new salt at ./salt/ folder
//   console.log(`-- Gen new salt -->`);
//   console.log(`salt value:  ${JSON.stringify(genSalt)}`)

//   // get current salt value
//   console.log(`-- Get current salt -->`);
//   const salt = await dynamicHash.getSalt();
//   console.log(`-- current salt: ${salt}`);

//   // testing if salt is equal to current salt at ./salt/prase.json
//   try {
//     assert.deepEqual(genSalt.salt,salt)
//   } catch (e) {
//     console.log(`!!!!! ${e}`)
//     return;
//   }
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
