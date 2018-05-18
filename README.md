# Dynamic Hash lib
Generate a dynamic hash with random salt (hourly, daily and monthly created)

## How to use
```javascript
    const dynamicHash = require('dynamic-hash');

    // Creating new salt
    const salt = await dynamicHash.genSalt();
    
    // Dynamic-Hash will generate new prase.json file that contains salt json object
    // and return back the object 
    // Located in ./salt/ folder
    // 
    // Object example: { "salt":"179fb28f85137a00aeef89f80546207dea93f45af04e5efff8b4c00885b827d3", "time":1526541909196 }

    // Get current salt
    const salt = await dynamicHash.getSalt();
    // Returns:"179fb28f85137a00aeef89f80546207dea93f45af04e5efff8b4c00885b827d3"

    // Encrypt value with current salt
    const salt = await dynamicHash.hashVal(value, salt);
    // Returns: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
    // 
    // value = value to hash
    // salt = current salt

    // Decrypt hash from current salt
    const salt = await dynamicHash.getVal(hash, salt);
    // Returns: 'utf8 val'
    // 
    // hash = hash to decrypt
    // salt = current salt

    // Compare value and hash with given salt
    const salt = await dynamicHash.checkVal(value, hash, salt);
    // Returns: boolean - true | false
    // 
    // value = value to compare
    // hash = hash to decrypt
    // salt = current salt   
```
## License
GNU