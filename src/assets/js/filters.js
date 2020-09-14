import Vue from 'vue'

Vue.filter('priceValue', function (value) {
    if (!value) {
        return ''
    }
    let result = parseFloat(value)
    if (Number.isInteger(result)) {
        return result
    } else {
        return result.toFixed(2)
    }
})

Vue.filter('filterTime', function (value) {
    if (!value) {
        return ''
    }
    if (value.indexOf(':') === -1) { //判断时间格式
        return value
    }
    const arr = value.split(':')
    let result = ''
    // 时
    if (parseInt(arr[0]) < 10) {
        result = '0' + arr[0]
    } else {
        result = arr[0]
    }
    // 分
    if (parseInt(arr[1]) < 10) {
        result = result + ':0' + arr[1]
    } else {
        result = result + ':' + arr[1]
    }
    // 秒
    if (parseInt(arr[2]) < 10) {
        result = result + ':0' + arr[2]
    } else {
        result = result + ':' + arr[2]
    }
    return result
})