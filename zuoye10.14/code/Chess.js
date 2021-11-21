// 12. 创建用于表示棋子的构造函数
function Chess (type, x, y) {
    // 用于表示棋子颜色的属性
    this.type = type;

    // 用于表示棋子的 div 元素
    this.ele = document.createElement('div');
    this.ele.style.width = '40px';
    this.ele.style.height = '40px';
    this.ele.style.borderRadius = '50%';
    this.ele.style.backgroundColor = Chess.Colors[type];
    this.ele.style.position = 'absolute';
    this.ele.style.left = '10px';
    this.ele.style.top = '10px';
    // 棋子的坐标
    this.ele.dataset.x = x;
    this.ele.dataset.y = y;
}

Chess.Colors = ['', '#000', '#fff'];

Chess.Types = {
    black: 1,
    white: 2
};

