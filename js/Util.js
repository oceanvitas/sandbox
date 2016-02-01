/**
 * 安全检测JavaScript基本数据类型和内置对象
 * o 检测的值
 * 
 * return "undefined"、"number"、"boolean"、"string"、"function"、
          "regexp"、"array"、"date"、"error"、"object"或"null"
 */
function typeOf(o){
  var _toString = Object.prototype.toString;
  //获取对象的toString()方法引用
  //列举基本数据类型和内置对象类型，可以进一步补充该数组的检测数据类型范围
  var _type = {
    'undefined': 'undefined',
    'number': 'number',
    'boolean': 'boolean',
    'string': 'string',
    '[object Function]': 'function',
    '[object RegExp]': 'regexp',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object Error]': 'error'
  }
  return _type[typeof o] || _type[_toString.call(o)] || (o ? 'object' : 'null');
}

/**
 * 检测数字
 * value 检测的值
 * 
 * return true | false
 */
function isNumber (value) {
  return typeof value === 'number' && isFinite(value);
}
