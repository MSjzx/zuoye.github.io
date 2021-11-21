const http = require('http');

const app = http.createServer();

app.on('request', (req, res) => {
    // // 请求方式
    // console.log(req.method);
    // // 请求路径
    // console.log(req.url);
    // // 请求头

    // console.log(req, headers);
    let body = []
        // 获取客户端传入的数据
    req.on('data', data => {
        // 当客户端有数据传入时 会触发data 事件
        body.push(data)
    });
    req.on('end', () => {
        body = Buffer.concat(body).toString();
        console.log(body)
    })
    res.end('Hello')



});
app.listen(8080, () => {

    console.log('The server listening on the port 8080')

})