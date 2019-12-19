const crypto = require('crypto')

const CRYPTO_MODE = 'aes-256-cbc'
const CRYPTO_KEY = '22ce5s426193d9f9fsd1cc9gc36ceb16bb02ff2c0a8ed75sbsca12b4698541e6'

function getKeyWidthIvBuffer(key, iv) {
  return {
    keyBuf: Buffer.alloc(32, key),
    ivBuf: Buffer.alloc(16, iv, 'hex'),
  }
}

module.exports = {
  encrypt(data) {
    const keyBuf = Buffer.alloc(32, CRYPTO_KEY)
    const ivBuf = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv(CRYPTO_MODE, keyBuf, ivBuf)
    let encrypted = cipher.update(Buffer.from(data))
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return {
      ciphertextIv: ivBuf.toString('hex'),
      ciphertext: encrypted.toString('hex'),
    }
  },
  decrypt(iv, data) {
    const { keyBuf, ivBuf } = getKeyWidthIvBuffer(CRYPTO_KEY, iv)
    const decipher = crypto.createDecipheriv(CRYPTO_MODE, keyBuf, ivBuf)
    let decrypted = decipher.update(Buffer.from(data, 'hex'))
    decrypted = Buffer.concat([decrypted, decipher.final()])
    return decrypted.toString()
  },
}
