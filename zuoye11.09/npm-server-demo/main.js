// 使用require()函数导入 http模块 该模块提供了web服务相关的功能
const http = require('http');

//导入fs模块 该模块提供了文件系统相关的功能
const fs = require('fs');
// 创建常量 port 用于保存web监听的端口
const port = 8080;
// 导入http-status-codes 模块
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

// 创建路由映射对象
// const routeMap = {


//     '/': 'views/index.html',
//     '/about': 'views/about.html',

// }

// 使用createServer()方法创建一个Server实例对象
const main = http.createServer((req, res) => {

    let viewUrl = req.url == '/' ? `views/index.html` : `views${req.url}.html`;

    fs.readFile(viewUrl, 'utf8', (error, data) => {
        if (error) {

            res.writeHead(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, { 'Content-type': 'text/html' });
            res.end('<h1>404 Not Found</h1>');
        } else {
            res.writeHead(StatusCodes.OK, ReasonPhrases.OK, { 'Content-Ttype': 'text/html' });
            res.end(data)
        }
    });
});
// 调用Server实例对象listen()方法，启动HTTP服务
main.listen(port, () => {
    console.log(`Server on the port:${port}`)
})