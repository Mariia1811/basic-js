const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  generateKey(message, key) {
    let generatedKey = '';
    const keyLength = key.length;
    let messageIndex = 0;

    for (let i = 0; i < message.length; i++) {
      if (/[A-Za-z]/.test(message[i])) {
        generatedKey += key[messageIndex % keyLength].toUpperCase();
        messageIndex++;
      } else {
        generatedKey += message[i];
      }
    }

    return generatedKey;
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }

    const upperCaseMessage = message.toUpperCase();
    const generatedKey = this.generateKey(upperCaseMessage, key);

    let encrypted = '';

    for (let i = 0; i < upperCaseMessage.length; i++) {
      if (/[A-Z]/.test(upperCaseMessage[i])) {
        const messageCharCode = upperCaseMessage[i].charCodeAt(0) - 65;
        const keyCharCode = generatedKey[i].charCodeAt(0) - 65;
        const encryptedCharCode = (messageCharCode + keyCharCode) % 26 + 65;
        encrypted += String.fromCharCode(encryptedCharCode);
      } else {
        encrypted += upperCaseMessage[i];
      }
    }

    return this.isDirect ? encrypted : encrypted.split('').reverse().join('');
  }

  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) {
      throw new Error('Incorrect arguments!');
    }

    const upperCaseEncrypted = encryptedMessage.toUpperCase();
    const generatedKey = this.generateKey(upperCaseEncrypted, key);

    let decrypted = '';

    for (let i = 0; i < upperCaseEncrypted.length; i++) {
      if (/[A-Z]/.test(upperCaseEncrypted[i])) {
        const encryptedCharCode = upperCaseEncrypted[i].charCodeAt(0) - 65;
        const keyCharCode = generatedKey[i].charCodeAt(0) - 65;
        const decryptedCharCode = (encryptedCharCode - keyCharCode + 26) % 26 + 65;
        decrypted += String.fromCharCode(decryptedCharCode);
      } else {
        decrypted += upperCaseEncrypted[i];
      }
    }

    return this.isDirect ? decrypted : decrypted.split('').reverse().join('');
  }
}

module.exports = {
  VigenereCipheringMachine
};