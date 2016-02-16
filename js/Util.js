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

/**
 * 合并排序
 * 迭代
 */
function merge (left, right) {
  var result = [];
  while(left.length > 0 && right.length > 0){
    if(left[0] < right[0]){
      result.push(left.shift());
    }else{
      result.push(right.shift());
    }
  }
  return result.concat(left).concat(right);
}
function mergeSort (items) {
  if(items.length == 1){
    return items;
  }
  var work = [];
  for (var i = 0, len = items.length; i < len; i++) {
    work.push([items[i]]);
  };
  work.push([]);
  for (var lim = len; lim > 1; lim = (lim + 1) /2) {
    for(var j = 0, k = 0; k < lim; j++, k += 2){
      work[j] = merge(work[k], work[k + 1]);
    }
    //原代码bug,如果第二层循环最后一个是work[k] < work[k + 1],
    //则work[j]已为空，应置空work[j+1]
    work[j] = work[j + 1] = [];
  }
  return work[0];
}