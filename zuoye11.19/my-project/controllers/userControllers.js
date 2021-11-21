const User = require('../models/User')
const { Sequelize } = require('sequelize')

const getUsers = (req, res, next) => {
    
    let pageSize = parseInt(req.query.pageSize) || 2;
    let pageNo   = parseInt(req.query.pageNo) || 1;

    let message = res.app.locals.message;

    res.app.locals.message = '';

    
    if (pageNo <= 0) pageNo = 1;

    User.findAndCountAll({
        limit: pageSize,
        offset: (pageNo - 1) * pageSize
    }).then(results => {
        // 计算总页数
        const totalPage = Math.ceil(results.count / pageSize)

        res.render('index', {totalPage, pageNo, users: results.rows, message})

        

        // res.json({code: 1, message: '获取数据成功', data: {totalPage, list: results.rows}})
    }).catch(error => {
        console.log(error)
        res.render('index', {totalPage: 0, pageNo: 0, users: [], message})

        // res.json({code: 0, message: '获取数据失败'})
    })
};

const saveUser = (req, res, next) => {

    User.create(req.body)
        .then(result => {
            console.log(result)
            res.app.locals.message = '新建用户成功'
            res.redirect('/users')
            // res.json({code: 1, message: '新建用户成功'})
        })
        .catch(error => {
            console.log(error)
            res.app.locals.message = '新建用户失败'
            res.redirect('/users')
            // res.json({code: 0, message: '新建用户失败'})
        })
};

const updateUser = (req, res, next) => {
    User.update(req.body, {
        where: {
            sid: req.body.sid
        }
    })
    .then(result => {
        res.redirect('/users')
        // res.json({code: 1, message: '修改用户成功'})
    })
    .catch(error => {
        console.log(error)
        res.redirect('/users')
        // res.json({code: 0, message: '修改用户失败'})
    })
};

const deleteUser = (req, res, next) => {
    User.destroy({
        where: {
            sid: req.query.sid
        }
    })
    .then(result => {
        res.redirect('/users')
        // res.json({code: 1, message: '删除用户成功'})
    })
    .catch(error => {
        console.log(error)
        res.redirect('/users')
        // res.json({code: 0, message: '删除用户失败'})
    })
};

const showNew = (req, res, next) => {
    res.render('new');
};

const showEdit = (req, res, next) => {
    User.findOne({
        attributes: [
            'sid',
            'sname',
            'age',
            'sex',
            'email',
            [Sequelize.fn('date_format', Sequelize.col('birthday'), '%Y-%m-%d'), 'birthday']
        ],

        where: {
            sid: req.query.sid
        }
    })
    .then(result => {
        res.render('edit', {user: result});
    })
    // req.query.sid
};


exports = module.exports = {
    getUsers,
    saveUser,
    updateUser,
    deleteUser,
    showNew,
    showEdit
};
