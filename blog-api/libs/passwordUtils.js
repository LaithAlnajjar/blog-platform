const bycrypt = require('bcryptjs');

const generatePassword = (password) => {
  return bycrypt.hash(password, 10);
};

module.exports = { generatePassword };
