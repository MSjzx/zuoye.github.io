// 使用require()函数导入 http模块 该模块提供了web服务相关的功能
const http = require('http');
const { url } = require('inspector');

// 创建常量 port 用于保存web监听的端口
const port = 8080;
// 创建路由映射对象
const routeResponeMap = {
    '/': '<h1>Home Page </h1>',
    '/about': '<h1>About Us </h1>',
    '/contact': '<h1>Contact Us </h1>',
    '/product': '<h1>Product Center</h1>'
}

// 使用createServer()方法创建一个Server实例对象
const main = http.createServer((req, res) => {
    if (routeResponeMap[req.url]) {
        res.writeHead(200, 'ok', { 'Content-type': 'text/html' });

        res.end(routeResponeMap[req.url])
    } else {
        res.writeHead(404, 'NO Found', { 'Content-type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    }
});
// 调用Server实例对象listen()方法，启动HTTP服务
main.listen(port, () => {
    console.log(`Server on the port:${port}`)
})