// 监听html文档解析完成事件
document.addEventListener('DOMContentLoaded', () => {
    // 设置html标签的字体大小,即1rem的px大小
    const html = document.querySelector('html');
    let fontSize = window.innerWidth / 10; //单位为px
    const MAX_FONT_SIZE = 42
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
    html.style.fontSize = fontSize + 'px'
}
)