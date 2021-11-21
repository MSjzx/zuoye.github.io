const http = require('http');

const server = http.createServer((request, response) => {

    request.on('data', function (data) {
        console.log(decodeURIComponent(data.toString('utf8')))
        
    })
    console.log(request.method)
    response.setHeader('aaaa', 'bbbb')
    response.write('{"name": "zhangsan", "age": 20}')
    response.end()
});

server.listen(8080, () => {
    console.log('Server is running at: http://127.0.0.1:8080')
})
