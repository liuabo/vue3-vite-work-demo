import CryptoJS from 'crypto-js'

/**
 * @word 要加密的内容
 * @keyWord String  服务器随机返回的关键字
 *  */
export function aesEncrypt(word, keyWord, iv) {
  let data = word;
  if (typeof data === "object") {
    try {
      // eslint-disable-next-line no-param-reassign
      data = JSON.stringify(data);
    } catch (error) {
      console.log("encrypt error:", error);
    }
  }
  // 十六位十六进制数作为密钥
  const SECRET_KEY = CryptoJS.enc.Utf8.parse("q7OoyUudD12FPG4n");
// 十六位十六进制数作为密钥偏移量
  const SECRET_IV = CryptoJS.enc.Utf8.parse("8243036970721456");
  const dataHex = CryptoJS.enc.Utf8.parse(data);
  const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString();
}
