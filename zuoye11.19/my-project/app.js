const express = require('express');
const { StatusCodes } = require('http-status-codes')

const app = express();

app.use(express.json({extend: false}))
app.use(express.urlencoded())

// 设置模板引擎
app.set('view engine', 'ejs')
// 指定模板文件所在的文件夹
app.set('views', 'templates')

const apiUserRoutes = require('./routes/apiUsers');
const userRoutes = require('./routes/users');

app.use('/mgt/api/users', apiUserRoutes);
app.use('/users', userRoutes);

// 处理前端错误
app.use((req, res) => {
    let errorCode = StatusCodes.NOT_FOUND
    res.status(errorCode)
    res.sendFile(`public/${errorCode}.html`, {root: './'})
})

// 处理后端错误
app.use((err, req, res, next) => {
    let errorCode = StatusCodes.INTERNAL_SERVER_ERROR
    console.log(err)
    res.status(errorCode)
    res.sendFile(`public/${errorCode}.html`, {root: './'})
})

app.listen(8080)

console.log(`监听端口为 8080`)