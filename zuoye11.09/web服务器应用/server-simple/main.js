// 使用require()函数导入 http模块 该模块提供了web服务相关的功能
const http = require('http');

// 创建常量 port 用于保存web监听的端口
const port = 8080;

// 使用createServer()方法创建一个Server实例对象
const main = http.createServer((req, res) => {
    console.log('received an incoming request!')
        //设置状态吗和响应头
    res.writeHead(200, 'ok', { 'Content-Type': 'text/html' });
    let responseMessage = '<h1>Hello World </h1>';
    // 设置要发送给浏览器的数据
    res.write(responseMessage);
    // 将数据发送给浏览器
    res.end();
    console.log(`Sent a response: ${responseMessage}`)
});
// 调用Server实例对象listen()方法，启动HTTP服务
main.listen(port, () => {
    console.log(`Server on the port:${port}`)
})












// main.on('request',(req,res)=>{

// });