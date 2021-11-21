// 2. 创建表示面板的构造函数 Board

function Board(width, height) {
    // 面板的宽高
    this.width = width;
    this.height = height;

    // 面板中格子的尺寸
    this.cellSize = 60;

    // 根据面板的宽高和格子的大小计算行数和列数
    this.rows = this.height / this.cellSize;
    this.cols = this.width / this.cellSize;

    // 创建用于显示面板的 div 元素
    this.ele = null;

    // 创建用于保存面板中所有小格子的二维数组
    /* 
        [
            [new Cell(), new Cell(), new Cell(), ...],
            [new Cell(), new Cell(), new Cell(), ...],
            [new Cell(), new Cell(), new Cell(), ...],
            ...
        ]
    */
    this.cells = [];

    // 用于计算赢家
    this.arrary = [];

    // 设置标识，用于指示当前该落黑子还是白子
    // 0，表示还没有任何棋子，1，表示该黑子下，2，表示该白子下
    this.player = 0;

    // 用于保存赢家
    this.winner = null;
}

// 3. 创建 init 方法用于做一些初始化的工作
Board.prototype.init = function() {

    // 创建面板中的所有小格子（生成二维数字 this.cells）
    for (var y = 0; y < this.rows; y++) {
        var temp = [];
        for (var x = 0; x < this.cols; x++) {
            if (y === 0 && x === 0) {
                // 左上角
            } else if (y === 0 && x === this.cols - 1) {
                // 右上角
            } else if (y === this.rows - 1 && x === 0) {
                // 左下角
            } else if (y === this.rows - 1 && x === this.cols - 1) {
                // 右下角
            } else

            if (y !== 0 && y != this.rows - 1 && x === 0) {
                // 左边
                temp.push(new Cell(this.cellSize, x, y, 'left'));
            } else if (y !== 0 && y != this.rows - 1 && x === this.cols - 1) {
                // 右边
                temp.push(new Cell(this.cellSize, x, y, 'right'));
            } else if (y === 0 && x !== 0 && x !== this.cols - 1) {
                // 上边
                temp.push(new Cell(this.cellSize, x, y, 'top'));
            } else if (y === this.rows - 1 && x !== 0 && x !== this.cols - 1) {
                // 下边
                temp.push(new Cell(this.cellSize, x, y, 'bottom'));
            } else {
                temp.push(new Cell(this.cellSize, x, y, 'center'));
            }
        }
        this.cells.push(temp);
    }

    return this;
};

// 5. 显示面板和面板中的小格子
Board.prototype.draw = function() {

    // 创建用于表示面板的 div 元素
    this.ele = document.createElement('div');
    this.ele.style.width = this.width + 'px';
    this.ele.style.height = this.height + 'px';
    this.ele.style.position = 'relative';
    // 为了能看到面板，临时加一个背景色
    this.ele.style.backgroundColor = '#ccc';

    // 7. 为面板注册点击事件，用于处理点击小格子时的业务逻辑
    this.ele.onclick = this.handleClick.bind(this);

    // 将二维数组变成一维数组，然后遍历一维数组，并将数组中小格子添加到面板中
    this.cells.flat().forEach(function(cell) {
        this.ele.appendChild(cell.ele);
    }, this);

    // 将面板显示 body 元素中
    document.body.appendChild(this.ele);
};

// 8. 创建处理小格被点击时的业务逻辑方法
Board.prototype.handleClick = function(evt) {

    if (this.winner) return alert('已经有赢家产生了');

    // 通过自定义属性获取小格子的坐标
    // console.log(evt.target.dataset.x)
    // console.log(evt.target.dataset.y)

    // 根据坐标获取二维数组中 Cell 对象（当前点击的小格子）
    var cell = this.cells[evt.target.dataset.y][evt.target.dataset.x];

    // 如果小格子中没有棋子的时候才能添加棋子
    if (!cell.chess) {

        // 随机获取一个小格子，然后这个格子中下
        var randomCell = null;
        do {
            randomCell = this.cells[Math.floor(Math.random() * this.rows)][Math.floor(Math.random() * this.cols)];
        } while (randomCell.chess);

        // 黑白棋交替落子
        // this.player = 0，表示还没有任何棋子，1，表示该黑子下，2，表示该白子下
        if (this.player && this.player == Chess.Types.black) {

            cell.addChess(this.player, evt.target.dataset.x, evt.target.dataset.y);

            this.player = Chess.Types.white;

            // 电脑自动下的
            randomCell.addChess(this.player, evt.target.dataset.x, evt.target.dataset.y)
            this.player = Chess.Types.black;

        }

        // else if (this.player && this.player == Chess.Types.white) {
        //     cell.addChess(Chess.Types.white)
        //     this.player = Chess.Types.black;
        // } 
        else {
            // 我们添加的棋子
            cell.addChess(Chess.Types.black, evt.target.dataset.x, evt.target.dataset.y);
            this.player = Chess.Types.white;

            // 电脑自动下的棋子
            randomCell.addChess(this.player, evt.target.dataset.x, evt.target.dataset.y)
            this.player = Chess.Types.black;
        }

        // 计算是否有赢家产生
        this.winner = this.scanToRight()
        if (!this.winner) {
            this.winner = this.scanToBottom();
        }

        if (!this.winner) {
            this.winner = this.scanToRightTop();
        }

        if (!this.winner) {
            this.winner = this.scanToRightBottom();
        }

        if (this.winner && this.winner.type === Chess.Types.black) {
            alert('黑棋赢了')
        } else if (this.winner && this.winner.type === Chess.Types.white) {
            alert('白棋赢了')
        } else {
            this.player === Chess.Types.black ? console.log('该黑棋下') : console.log('该白棋下')

        }
    } else {
        alert('不能在有棋子的格子中落子')
    }
};

// 11. 计算赢家
Board.prototype.calcWinner = function(x, y, newLine) {
    // 扫描新行时，需要数组容器清空
    if (newLine) this.arrary.splice(0);

    // 1. 数组为空，格子为空，什么都不做
    // 2. 数组为空，格子不为空，则将格子中的棋子添加到数组中。
    // 3. 数组不为空，格子为空，将数组清空
    // 4. 数组不为空，格子也不为空，则需要进一步判断棋子是黑棋还是白棋
    // 4.1 如果棋子与数组中的所有棋子都相同，则将棋子放到数组中
    // 4.2 只要数组中有一个棋子与当前遍历出来的棋子不相同，则将数组清空，将当前遍历出来的棋子放到数组中。
    // 5. 如果数组长度等于 5，则赢家产生，将赢家返回。
    if (this.arrary.length && this.cells[x][y].chess) {
        // 判断当前扫描出来的棋子是否与数组中最后一个棋子是否相同
        if (this.arrary[this.arrary.length - 1].type === this.cells[x][y].chess.type) {
            // 如果相同，则将棋子添加到数组中
            this.arrary.push(this.cells[x][y].chess);
        } else {
            // 否则，清空数组
            this.arrary.splice(0);
            // 将当前遍历出来的棋子放到数组中
            this.arrary.push(this.cells[x][y].chess);
        }
    } else if (this.arrary.length && !this.cells[x][y].chess) {
        this.arrary.splice(0)
    } else if (!this.arrary.length && this.cells[x][y].chess) {
        this.arrary.push(this.cells[x][y].chess);
    }

    // 判断数组长度是否等于 5，如果等于 5，说明赢家产生了
    if (this.arrary.length === 5) {
        return this.cells[x][y].chess;
    }

    return null;
};

// 10. 水平扫描棋盘
Board.prototype.scanToRight = function() {
    for (var row = 0; row < this.rows; row++) {
        for (var col = 0; col < this.cols; col++) {
            var winner = this.calcWinner(row, col, col === 0);
            if (winner) {
                return winner;
            }
        }
    }
    // 当所有的行都扫描完了之后，还未找到赢家，则返回 null;
    return null;
};


// 14. 垂直扫描棋盘
Board.prototype.scanToBottom = function() {
    for (let col = 0; col < this.cols; col++) {
        for (let row = 0; row < this.rows; row++) {
            var winner = this.calcWinner(row, col, row === 0);
            if (winner) {
                return winner;
            }
        }
    }
    // 当所有的列都扫描完了之后，还未找到赢家，则返回 null;
    return null;
};

// 15. 斜向上扫描棋盘
Board.prototype.scanToRightTop = function() {
    for (var row = 0, col = 0; row < this.rows - 1 || col < this.cols; row === this.rows - 1 ? col++ : row++) {
        for (var r = row, c = col; r > 0 || c < this.cols; r--, c++) {
            console.log(r, c)
            var winner = this.calcWinner(r, c, c === 0 || r === this.cols - 1);
            if (winner) {
                return winner;
            }
            if (r === 0 || c === this.cols - 1) {
                break;
            }
        }
    }

    // 当所有斜向上的行都扫描完了，还未找到赢家，则返回 null;
    return null;
};

// 16. 斜向下扫描棋盘
Board.prototype.scanToRightBottom = function() {
    for (var row = 0, col = this.cols - 1; col > 0 || row < this.rows; col === 0 ? row++ : col--) {
        for (var r = row, c = col; c < this.cols || r < this.rows; r++, c++) {
            var winner = this.calcWinner(c, r, c === this.cols - 1 || r === this.rows - 1);
            if (winner) {
                return winner;
            }
            if (c === this.cols - 1 || r === this.rows - 1) {
                break;
            }
        }
    }
    // 当所有斜向下的行都扫描完了，还未找到赢家，则返回 null;
    return null;
};



var board = new Board(600, 600)
board.init().draw()


// var rows = 8, cols = 8;
// for (var i = 0; i < rows * cols; i++) {
//     // console.log(Math.floor(i / 8), i % 8)
//     console.log(i % 8, Math.floor(i / 8))
// }