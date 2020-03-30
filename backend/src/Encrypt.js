const crypto = require("crypto");

module.exports = {
    criptografar(senha) {
        const key = new Buffer.from(crypto.randomBytes(32));
        const iv = new Buffer.from(crypto.randomBytes(16));
        const cipher = crypto.createCipheriv("aes256", key, iv);
        cipher.update(senha);
        return cipher.final("hex");
    }
}