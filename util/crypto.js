const crypto = require('crypto');
let secret = 'is blog';
function md5(password) {
    let cryp = crypto.createHash('md5',secret);
    return cryp.update(password).digest('hex');
}
module.exports = md5;