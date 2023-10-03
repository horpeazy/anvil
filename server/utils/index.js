const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config();

const sessionSecret = process.env.SESSION_SECRET;

const encryptData = (data) => {
	const cipher = crypto.createCipher('aes-256-cbc', sessionSecret);
  let encryptedData = cipher.update(data, 'utf8', 'hex');
  encryptedData += cipher.final('hex');
  return encryptedData;
}

const decryptData = (encryptedData) => {
  const decipher = crypto.createDecipher('aes-256-cbc', sessionSecret);
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');
  return decryptedData;
}

module.exports = {encryptData, decryptData}
