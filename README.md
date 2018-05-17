# Dynamic Hash lib
Generate a dynamic hash with random salt (hourly, daily and monthly created)

## How to use
```javascript
    const hash = require('dynamic-hash');

    // Creating new salt
    const salt = hash.genSalt();
    
    // Dynamic-Hash will generate new prase.json file that contains salt json object
    // Located in ./salt/ folder
    // 
    // Object example: {"salt":"179fb28f85137a00aeef89f80546207dea93f45af04e5efff8b4c00885b827d3","time":1526541909196}
    // 
```
## License
GNU