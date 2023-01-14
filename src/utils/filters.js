export function wanNumFilter(num) {
  if (typeof num === 'string' && num.includes('万')) {
    return num
  }
  if (num && typeof Number(num) === 'number') {
    num = Number(num)
    if (num == 0) {
      return num + ''
    } else if (num >= 1 && num < 10000) {
      return num + ''
    } else {
      return (num / 10000).toFixed(2) + '万'
    }
  } else {
    return 0
  }
}

export function priceFilter(num) {
  const splitNum = String(num).split('.')
  if (!splitNum[1]) {
    return num
  } else if (splitNum[1].length > 2) {
    return num.toFixed(2)
  } else {
    return num
  }
}
