const dynamicHash = require('../index');
const fs = require('fs');

(securingData = () => {
    // get the current salt
    const currentSalt = dynamicHash.genSalt().salt;

    console.log('-- starting securing DB process...');
    console.log('')
    // fetching all users from the example DB
    const users = JSON.parse(fs.readFileSync('examples/db.json', 'utf8')).users;
    console.log('-- securing users fullName attribute in db...');
    console.log('---------------------------------------------')
    console.log('')
    // replacing sensitive data with encrypted values with current salt
    users.map(user => user.fullName = dynamicHash.encrypt(user.fullName, currentSalt));
    console.log('-- new secured DB:');
    // updated db:
    console.log(users)
})()