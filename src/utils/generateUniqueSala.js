const crypto = require('crypto'); //gera uma string aleatoria

module.exports = function generateUniqueSala() {
    return crypto.randomBytes(3).toString('HEX');
}