import crypto from 'crypto'
import config from '@/config'

const CRYPTO_MODE = 'aes-256-cbc'
const CRYPTO_KEY = config.user.passwordCryptoKey
function getKeyWidthIvBuffer(iv: string) {
  return {
    keyBuf: Buffer.alloc(32, CRYPTO_KEY),
    ivBuf: Buffer.alloc(16, iv, 'hex'),
  }
}

export default {
  encrypt(data: string): { iv: string; text: string } {
    const keyBuf = Buffer.alloc(32, CRYPTO_KEY)
    const ivBuf = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv(CRYPTO_MODE, keyBuf, ivBuf)
    let encrypted = cipher.update(Buffer.from(data))
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return {
      iv: ivBuf.toString('hex'),
      text: encrypted.toString('hex'),
    }
  },
  decrypt(iv: string, text: string): string {
    const keyBuf = Buffer.alloc(32, CRYPTO_KEY)
    const ivBuf = Buffer.alloc(16, iv, 'hex')
    const decipher = crypto.createDecipheriv(CRYPTO_MODE, keyBuf, ivBuf)
    let decrypted = decipher.update(Buffer.from(text, 'hex'))
    decrypted = Buffer.concat([decrypted, decipher.final()])
    return decrypted.toString()
  },
}
