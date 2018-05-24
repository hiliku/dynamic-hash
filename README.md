# Dynamic Hash lib
Generate a dynamic hash with random salt.

With Dynamic-Hash you can genrate local random salt, encrypt/decrypt and compare values with it.

The package will generate a random salt object on local file-system and provide simple access and methods to encrypt/decrypt requested data with Advanced Encryption Standard (AES) of 256 bits.


## Instalation
Using npm:
```javascript
$ npm i --save dynamic-hash 
```

## Testing
Testing via mocha and chai:
```javascript
$ npm run test
```

## How to use
Dynamic-Hash will generate new prase.json file that contains salt json object and return back the salt object located in ./salt/ folder.
```javascript
const dynamicHash = require('dynamic-hash');

// Creating new salt
const saltObject = dynamicHash.genSalt();
const saltObjectSync = await dynamicHash.genSaltAsync(); // Asyncronically
// Returned salt Object example: 
//  { 
//      "salt":"179fb28f85137a00aeef89f80546207dea93f45af04e5efff8b4c00885b827d3", 
//      "time":1526541909196 
//  }

// Get current salt
const salt = dynamicHash.getSalt();
const saltSync = await dynamicHash.getSaltAsync(); // Asyncronically
// Returns:"179fb28f85137a00aeef89f80546207dea93f45af04e5efff8b4c00885b827d3"

// Encrypt value with current salt
const decrypt = dynamicHash.encrypt(value, salt);
const decryptSync = await dynamicHash.encryptAsync(value, salt); // Asyncronically
// Returns: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
// 
// value = value to hash
// salt = current salt

// Decrypt hash from current salt
const decrypt = dynamicHash.decrypt(hash, salt);
const decryptSync = await dynamicHash.decryptAsync(hash, salt); // Asyncronically
// Returns: 'utf8 val'
// 
// hash = hash to decrypt
// salt = current salt

// Compare value and hash with given salt
const compare = dynamicHash.compare(value, hash, salt);
const compareSync = await dynamicHash.compareAsync(value, hash, salt); // Asyncronically
// Returns: boolean - true | false
// 
// value = value to compare
// hash = hash to decrypt
// salt = current salt   

// Backup current data into a local file
const backup = dynamicHash.backup(data, type);
const backupSync = await dynamicHash.backupAsync(data, type); // Asyncronically
// Returns: boolean - true | false

```
## Funcionality
**Method** | **Description** 
--- | --- 
genSalt() / genSaltAsync() | Creating new local salt Object, will be stored in './salt/prase.json' path.
getSalt() / getSaltAsync() | Getting the current salt key.
backup() / backupAsync() |  Backup current data into a local file.
encrypt(value, salt) / encryptAsync(value, salt) | Encrypt given value with current salt.
decrypt(value, salt) / decryptAsync(value, salt) | Decrypt given hash from current salt.
compare(value, hash, salt) / compareAsync(value, hash, salt) | Compare value and hash with given salt.


## Examples
To run the examples:
```javascript
$ node examples/example-secure.js
$ node examples/example-migrate.js

```
## License
GNU GPLv3