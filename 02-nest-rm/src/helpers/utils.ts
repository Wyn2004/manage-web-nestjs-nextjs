const bcrypt = require('bcrypt');

const saltRounds = 10;

export const hashPassword = (password: string) => {
  try {
    return bcrypt.hashSync(password, saltRounds);
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = (password: string, hashPassword: string) => {
  try {
    return bcrypt.compareSync(password, hashPassword);
  } catch (error) {
    console.log(error);
  }
};
