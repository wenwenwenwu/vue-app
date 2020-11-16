const isIphoneX = () => {
    //window对象存在
    if (typeof window !== "undefined" && window) {
        // 正则语句判断是否为刘海屏iPhone
        return /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 780
    }
    return false
}

// 赋值给window对象下的isIphoneX属性
window.isIphoneX = isIphoneX()