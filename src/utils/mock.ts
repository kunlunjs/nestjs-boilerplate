import Mock, { Random, mock } from 'mockjs'

// 手机号
Mock.Random.extend({
  phone: function () {
    const phonePrefixs = ['1']
    return this.pick(phonePrefixs) + Mock.mock(/[3-9]\d{9}/)
  }
})

// 性别
Mock.Random.extend({
  gender: function () {
    return Mock.mock(/^(男|女|未知)$/)
  }
})

export { Random, mock }

export default Mock
