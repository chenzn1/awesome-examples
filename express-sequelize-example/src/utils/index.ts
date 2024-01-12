import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

export function envParser(...paths: string[]): Record<string, any> {
  const buf = fs.readFileSync(path.join(...paths))
  const config = dotenv.parse(buf)

  return config
}

export default {
  getEncryptedPassword(password: string, salt: string) {
    const text = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512')
    return text.toString('hex')
  },
}
