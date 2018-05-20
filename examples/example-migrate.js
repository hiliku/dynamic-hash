const dynamicHash = require('../index');
const fs = require('fs');

(migrate = () => {
    // -----------------------
    // SIMULATING SECURED DATA
    // -----------------------

    // creating salt to secure the data
    let currentSalt = dynamicHash.genSalt().salt;

    // getting the current secured data
    const currentUsers = JSON.parse(fs.readFileSync('example/db.json', 'utf8')).users;
    // replacing sensitive data with encrypted values with current salt
    currentUsers.map(value => value.fullName = dynamicHash.encrypt(value.fullName, currentSalt))
    // updated db:
    console.log('current users:')
    console.log(currentUsers)
    console.log('---------------------------------------------')
    console.log('')

    // -------------------------
    // SIMULATING DATA MIGRATION
    // -------------------------

    // get the current salt
    currentSalt = dynamicHash.getSalt();
    // generate new salt Object and get the salt attribute
    const newSalt = dynamicHash.genSalt().salt;
    // once you generate new salt - you must update your database

    console.log('-- starting migration...')
    // fetching all users from the example DB
    const users = currentUsers;
    // decrypting sensetive data
    users.map(user => user.fullName = dynamicHash.decrypt(user.fullName,currentSalt));
    console.log('-- decrypted DB before migration:')
    console.log(users)
    console.log('---------------------------------------------')
    console.log('')
    console.log('-- encrypting users fullName attribute in db with new salt key...')
    // replacing sensitive data with encrypted values with current salt
    users.map(user => user.fullName = dynamicHash.encrypt(user.fullName,newSalt))
    console.log('')
    console.log('-- DB after migration:')
    // updated db:
    console.log(users)
})()