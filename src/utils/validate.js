// 判断是不是手机号
export function isMobile(str) {
  return /^1[0-9]{10}$/.test(str)
}

// 判断是不是邮箱
export function isEmail(str) {
  return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str)
}

// 判断是不是数组
export function isArray(param) {
  return Object.prototype.toString.call(param) === '[object Array]'
}

// 判断是不是对象
export function isObject(param) {
  return Object.prototype.toString.call(param) === '[object Object]'
}

export default {
  // 判断是不是字符串
  isString(param) {
    return Object.prototype.toString.call(param) === '[object String]'
  },
  // 判断是不是数字
  isNumber(param) {
    return Object.prototype.toString.call(param) === '[object Number]'
  },
  // 判断是不是布尔
  isBoolean(param) {
    return Object.prototype.toString.call(param) === '[object Boolean]'
  },
  // 判断是不是Undefined
  isUndefined(param) {
    return Object.prototype.toString.call(param) === '[object Undefined]'
  },
  // 判断是不是Null
  isNull(param) {
    return Object.prototype.toString.call(param) === '[object Null]'
  },
  // 判断是不是function
  isFunction(param) {
    return Object.prototype.toString.call(param) === '[object Function]'
  },
  // 判断是不是日期类型
  isDate(param) {
    return Object.prototype.toString.call(param) === '[object Date]'
  },
  // 判断是不是正则
  isRegExp(param) {
    return Object.prototype.toString.call(param) === '[object RegExp]'
  },
  // 判断各种数据类型是不是为空 空对象 空字符串 空数组等等
  isEmpty(param) {
    try {
      // 判断是不是null 或者Undefined
      if (this.isNull(param) || this.isUndefined(param)) {
        return false
      }
      // 判断数字是不是NAN
      if (this.isNumber(param)) {
        if (isNaN(param)) {
          return false
        } else {
          return true
        }
      }
      // 判断是不是布尔 函数 日期 正则 是则返回true
      if (this.isBoolean(param) || this.isFunction(param) || this.isDate(param) || this.isRegExp(param)) {
        return true
      }
      // 判断是不是是字符串，去空 长度为o返回false
      if (this.isString(param)) {
        if (param.trim().length === 0) {
          return false
        } else {
          return true
        }
      }
      // 判断是否是数组，数组为空返回0
      if (this.isArray(param)) {
        if (param.length === 0) {
          return false
        } else {
          return true
        }
      }
      // 判断是否是对象，判断是否是空对象是则返回false
      if (this.isObject(param)) {
        // 判断对象属性个数
        if (Object.getOwnPropertyNames(param).length === 0) {
          return false
        } else {
          return true
        }
      }
    } catch (e) {
      console.log(e)
      return false
    }
  },

  /**
   *
   * @desc  判断是否为身份证号
   * @param  {String|Number} str
   * @return {Boolean}
   */
  isIdCard(str) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(
      str
    )
  }
}
