const path = require('path')

let p1 = 'E:\\VSC\\Workspaces\\zuoye\\zuoye11.10\\path-module\\folder1\\text.txt';

// 连接多个路径片段
console.log(path.join('foo', 'bar/text'))

// 扩展名
path.extname(p1)

// 获取文件的目录
path.dirname(p1)

// 获取路径的最后一部分
path.basename(p1, '.txt')