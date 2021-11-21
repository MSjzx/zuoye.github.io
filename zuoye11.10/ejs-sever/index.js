const ejs = require('ejs');
const fs = require('fs');

const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const rountMap = {
    '/': 'views/index.ejs',
    '/new': 'views/new.ejs'
};

require('http').createServer((req, res) => {

    if (req.url == '/') {
        fs.readFile('db/students.json', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR, {
                    'Contebt-Type': 'text/plain'
                });
                res.end(ReasonPhrases.INTERNAL_SERVER_ERROR, )
            } else {

                ejs.renderFile('views/index.ejs', { data: JSON.parse(data) })
                    .then(html => {
                        res.writeHead(StatusCodes.OK, ReasonPhrases.OK, {
                            'Contebt-Type': 'text/html'
                        })
                        res.end(html)
                    })
                    .catch(err => {
                        console.log(err)
                        res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR, {
                            'Contebt-Type': 'text/plain'
                        });
                        res.end(ReasonPhrases.INTERNAL_SERVER_ERROR, )
                    })
            }

        })



    } else if (req.url == '/new') {
        ejs.renderFile('views/new.ejs')
            .then(html => {
                res.writeHead(StatusCodes.OK, ReasonPhrases.OK, {
                    'Contebt-Type': 'text/html'
                })
                res.end(html)
            })
            .catch(err => {
                console.log(err)
                res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR, {
                    'Contebt-Type': 'text/plain'
                });
                res.end(ReasonPhrases.INTERNAL_SERVER_ERROR, )
            })
    } else if (req.url == '/create') {
        let body = [];
        req.on('data', data => {
            body.push(data)
        })
        req.on('end', () => {
            body = Buffer.concat(body).toString()
            body = decodeURI(body)
            body = body.split('&').reduce((obj, pair) => {
                let [key, value] = pair.split('=')
                obj[key] = value;
                return obj;
            }, {})
            console.log(body)
        })
    }

}).listen(8080, () => {
    console.log('服务器开始启动，并监听80808端口')
})