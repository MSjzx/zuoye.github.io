// 4. 创建表示棋盘中小格子的构造函数 Cell
function Cell(size, x, y, bgc) {
    // 小格子的尺寸
    this.size = size;

    // 小格子在面板中的坐标
    this.x = x;
    this.y = y;

    // 棋盘线的颜色
    this.bdc = '#000';

    // 创建用于显示小格子的 div 元素
    this.ele = document.createElement('div');
    this.ele.style.width = this.size + 'px';
    this.ele.style.height = this.size + 'px';
    this.ele.style.position = 'absolute';
    this.ele.style.left = this.x * this.size + 'px';
    this.ele.style.top = this.y * this.size + 'px';



    // 设置格子的背景色和棋盘线颜色
    this.ele.style.background = Cell.Bgcs[bgc];
    // this.ele.style.background = 'linear-gradient(to right,\
    //     rgba(0, 0, 0, 0) 45%, '+ this.bdc +' 45%, '+ this.bdc +' 55%, rgba(0, 0, 0, 0) 55%), linear-gradient(to bottom,\
    //     rgba(0, 0, 0, 0) 45%, '+ this.bdc +' 45%, '+ this.bdc +' 55%, rgba(0, 0, 0, 0) 55%)';

    // 使用自定义属性，将小格子的坐标绑定到 div 元素上
    this.ele.dataset.x = this.x;
    this.ele.dataset.y = this.y;

    console.log(this.ele.style.background)

    // 为了能看到小格子，临时加一个边框
    // this.ele.style.border = '1px solid #000';

    // 创建用于保存小格子中棋子的属性 chess
    this.chess = null;
}

// 9. 创建 addChess 方法向当前小格中添加棋子
Cell.prototype.addChess = function(type, x, y) {
    // 创建表示棋子的 div 元素
    this.chess = new Chess(type, x, y);

    this.ele.appendChild(this.chess.ele);
};

// 格子的所有的背景
Cell.Bgcs = {
    left: 'linear-gradient(to right,\
        #ccc 45%, #000 45%, #000 55%, rgba(0, 0, 0, 0) 55%), linear-gradient(to bottom,\
        #ccc 45%, #000 45%, #000 55%, #ccc 55%)',
    right: 'linear-gradient(to right,\
        rgba(0, 0, 0, 0) 45%, #000 45%, #000 55%, #ccc 55%), linear-gradient(to bottom,\
        #ccc 45%, #000 45%, #000 55%, #ccc 55%)',
    top: 'linear-gradient(to bottom,\
        #ccc 45%, #000 45%, #000 55%, rgba(0, 0, 0, 0) 55%), linear-gradient(to right,\
        #ccc 45%, #000 45%, #000 55%, #ccc 55%)',
    bottom: 'linear-gradient(to bottom,\
        rgba(0, 0, 0, 0) 45%, #000 45%, #000 55%, #ccc 55%), linear-gradient(to right,\
        #ccc 45%, #000 45%, #000 55%, #ccc 55%)',
    center: 'linear-gradient(to bottom,\
        rgba(0, 0, 0, 0) 45%, #000 45%, #000 55%, rgba(0, 0, 0, 0) 55%), linear-gradient(to right,\
        rgba(0, 0, 0, 0) 45%, #000 45%, #000 55%, rgba(0, 0, 0, 0) 55%)',


    leftTop: 'linear-gradient(to bottom,\
        #ccc 45%, rgba(0, 0, 0, 0) 45%, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0) 55%), linear-gradient(to right,\
        #ccc 45%, #000 45%, #000 55%, rgba(0, 0, 0, 0) 55%), linear-gradient(to bottom,\
        #ccc 45%, #000 45%, #000 55%, #ccc 55%)',
    rightTop: 'linear-gradient(to bottom,\
            #ccc 45%, rgba(0, 0, 0, 0) 45%, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0) 55%), linear-gradient(to right,\
            rgba(0, 0, 0, 0) 45%, #000 45%, #000 55%, #ccc 55%), linear-gradient(to bottom,\
            #ccc 45%, #000 45%, #000 55%, #ccc 55%)',
    leftBottom: 'linear-gradient(to bottom,\
                rgba(0, 0, 0, 0) 45%, rgba(0, 0, 0, 0) 45%, rgba(0, 0, 0, 0) 55%, #ccc 55%), linear-gradient(to right,\
                #ccc 45%, #000 45%, #000 55%, rgba(0, 0, 0, 0) 55%), linear-gradient(to bottom,\
                #ccc 45%, #000 45%, #000 55%, #ccc 55%)',

    rightBttom: 'linear-gradient(to bottom,\
                    rgba(0, 0, 0, 0) 45%, rgba(0, 0, 0, 0) 45%, rgba(0, 0, 0, 0) 55%, #ccc 55%), linear-gradient(to right,\
                    rgba(0, 0, 0, 0) 45%, #000 45%, #000 55%, #ccc 55%), linear-gradient(to bottom,\
                    #ccc 45%, #000 45%, #000 55%, #ccc 55%)'

};