// "use strict";
const crypto = require("crypto");
const fs = require("fs");

module.exports = {

    // generate random hash string by timestamp
    genHash: async (type = 'sha256') => { // type = md5 | sha1 | sha256
        let time = new Date().getUTCMilliseconds();
        let hash = crypto.createHash(type);
        hash.update(String(time));
        let str = await hash.digest("hex");
        return str;
    },
    // gen random salt string
    genSalt: async () => {
        const salt = this.genHash();
        // delete local prase file
        try {
            fs.unlinkSync('./salt/prase.json');
            console.log('successfully deleted prase.json');
        } catch (err) {
            console.log('no such file')
        }

    },
    getSalt: () => {
        
    }

}