const bcrypt = require('bcrypt');

const saltRounds = 10;

export const hashPassword = (password: string) => {
  try {
    return bcrypt.hashSync(password, saltRounds);
  } catch (error) {
    console.log(error);
  }
};
