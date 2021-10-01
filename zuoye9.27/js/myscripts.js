// 创建一个通用的方法，用于向左或向右移动元素
function animate (ele, target, step) {
    // 清除上一个定时器
    clearInterval(ele.timer)
    ele.timer = setInterval(function () {
        // 如果偏移量等于目标位置，则说明说明已经移动目标位置了
        if (ele.offsetLeft == target) {
            // 清除定时器，元素停止移动
            clearInterval(ele.timer);
        } else {
            // 先计算步长
            var step = (target - ele.offsetLeft) / 20;
            // 然后，根据步长的正负，绝定是向上取整还是向下取整
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
            
            // 改变元素的 left 值
            ele.style.left = ele.offsetLeft + step + 'px';
        }
    }, 16.7);
}