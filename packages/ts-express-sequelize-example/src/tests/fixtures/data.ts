import helper from '@/utils'
import randomstring from 'randomstring'

const passwordSalt1 = randomstring.generate(32)
const passwordSalt2 = randomstring.generate(32)

const fixtures = {
  users: [
    {
      id: 1,
      nickname: 'nickname 1',
      username: 'user1',
      password: helper.getEncryptedPassword('123456', passwordSalt1),
      passwordSalt: passwordSalt1,
    },
    {
      id: 2,
      nickname: 'nickname 2',
      username: 'user2',
      password: helper.getEncryptedPassword('234567', passwordSalt2),
      passwordSalt: passwordSalt2,
    },
  ],
}
export default { fixtures }
