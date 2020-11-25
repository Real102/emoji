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
  // 有些表情是一个码点的？
  if (emoji.length > 1) {
    return `${emoji[0].codePointAt(0).toString(16)}-${emoji[1].codePointAt(0).toString(16)}`
  } else {
    return `${emoji[0].codePointAt(0).toString(16)}`
  }
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