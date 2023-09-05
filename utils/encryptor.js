let cryptoJS = require('crypto-js');

const encryptPassword = (plainText) => {
    return cryptoJS.AES.encrypt(plainText, process.env.PASSWORD_SECRET).toString();
}

const decryptPassword = (encryptedText) => {
    let bytes = cryptoJS.AES.decrypt(encryptedText, process.env.PASSWORD_SECRET);
    return bytes.toString(cryptoJS.enc.Utf8);
}

module.exports = { encryptPassword, decryptPassword };