import { AES } from 'crypto-js';

export const encryptPassword = (key: string, value: string) => {
  const encrypt = AES.encrypt(key, value);
  return encrypt.toString();
};
