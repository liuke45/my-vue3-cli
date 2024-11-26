// tree扁平化
export function flattenTree(datas: any[]) {
  return datas.reduce((conn, data) => {
    conn.push(data)
    if (data.children && data.children.length) {
      conn.push(...flattenTree(data.children))
    }
    return conn
  }, [])
}

// 根据数字转化成中文大写金额
export function convertToChineseCurrency(
  num: number | string,
  hasComma = false,
) {
  // 判断传入的num是否被千分化
  if (hasComma) {
    num = num.toString().replace(/,/g, '')
  }
  // 定义数字对应的汉字
  const cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  // 定义数字位对应的汉字
  const cnIntRadice = ['', '拾', '佰', '仟']
  // 定义整数单位对应的汉字
  const cnIntUnits = ['', '万', '亿', '兆']
  // 定义小数点后面的单位
  const cnDecUnits = ['角', '分', '厘', '毫', '丝']
  // 定义输出的大写金额
  let cnCurrencyStr = ''

  // 判断是否为零
  if (num === 0) {
    return cnNums[0] + '元整'
  }

  // 将金额转换为字符串
  const numStr = num.toString()
  // 判断是否有小数点
  const index = numStr.indexOf('.')
  // 截取整数部分
  let integerNum
  // 截取小数部分
  let decimalNum

  if (index > 0) {
    // 如果有小数点，则截取整数部分和小数部分
    integerNum = numStr.substring(0, index)
    decimalNum = numStr.substring(index + 1)
  } else {
    // 如果没有小数点，则直接截取整数部分
    integerNum = numStr
    decimalNum = ''
  }

  // 处理整数部分
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0
    const IntLen = integerNum.length
    for (let i = 0; i < IntLen; i++) {
      const n = integerNum.substr(i, 1)
      const p = IntLen - i - 1
      const q = p / 4
      const m = p % 4
      if (n === '0') {
        zeroCount++
      } else {
        if (zeroCount > 0) {
          cnCurrencyStr += cnNums[0]
        }
        zeroCount = 0
        cnCurrencyStr += cnNums[parseInt(n)] + cnIntRadice[m]
      }
      if (m === 0 && zeroCount < 4) {
        cnCurrencyStr += cnIntUnits[q]
      }
    }
  } else {
    cnCurrencyStr += cnNums[0]
  }

  // 添加元单位
  cnCurrencyStr += '元'

  // 处理小数部分
  if (decimalNum !== '') {
    const decLen = decimalNum.length
    for (let i = 0; i < decLen; i++) {
      const n = decimalNum.substr(i, 1)
      if (n !== '0') {
        cnCurrencyStr += cnNums[Number(n)] + cnDecUnits[i]
      }
    }
  } else {
    cnCurrencyStr += '整'
  }

  // 如果大写金额以“零”结尾，则去除结尾的“零”
  if (cnCurrencyStr.endsWith(cnNums[0])) {
    cnCurrencyStr = cnCurrencyStr.substring(0, cnCurrencyStr.length - 1)
  }

  return cnCurrencyStr
}
