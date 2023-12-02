import { AES, enc } from "crypto-js";

const SECRET_KEY = "6604CA011756EEC8BEC750F91667938E";

export function getEncrypted(dataToCrypto) {
  const data = JSON.stringify(dataToCrypto);

  const cryptoData = AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();

  return cryptoData;
}

export function getDecrypted(cryptoData) {
  try {
    const deCryptoData = AES.decrypt(cryptoData, SECRET_KEY).toString(enc.Utf8);

    return JSON.parse(JSON.parse(deCryptoData));
  } catch (error) {
    console.log(error);
  }
}
