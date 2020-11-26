// 存储emoji表情
const emojiList = [{
  text: '😀',
  key: 's-1'
}, {
  text: '😁',
  key: 's-2'
}, {
  text: '😂',
  key: 's-3'
}, {
  text: '🤣',
  key: 's-4'
}, {
  text: '😃',
  key: 's-5'
}, {
  text: '😄',
  key: 's-6'
}, {
  text: '😅',
  key: 's-7'
}, {
  text: '😆',
  key: 's-8'
}, {
  text: '😉',
  key: 's-9'
}, {
  text: '😊',
  key: 's-10'
}]

const emojiToCode = emoji => {
  // 表情的码点可能有多个，因此需要遍历处理
  let res = []
  Array.from(emoji).forEach(i => {
    res.push(i.codePointAt(0).toString(16))
  });
  return res.join('-')
}

const codeToEmoji = code => {
  let unicodes = code.split('-')
  let codePoints = unicodes.map((u) => `0x${u}`)
  return String.fromCodePoint(...codePoints)
}

module.exports = {
  emojiList,
  emojiToCode,
  codeToEmoji
}