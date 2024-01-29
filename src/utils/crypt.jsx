import  CryptoJS, { AES, enc } from "crypto-js";

export function generateId() {
  const uniqueValue = new Date().getTime().toString();
  const hashedValue = CryptoJS.SHA256(uniqueValue).toString();

  return hashedValue.substring(0, 8);
}

export function encode(string, key) {
  return AES.encrypt(string, key).toString();
}

export function decode(string, key) {
  return AES.decrypt(string, key).toString(
    enc.Utf8
  );
}
