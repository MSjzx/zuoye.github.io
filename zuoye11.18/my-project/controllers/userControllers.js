const { connect } = require('../db/index');
const pool = require('../db/index')

const getUsers = (req, res, next) => {
    const pageSize = parseInt(req.query.pageSize);
    const pageNo = parseInt(req.query.pageNo);
    // console.log(req.query.pageSize, req.query.pageNo)
    // res.send('chaxun')





    pool.getConnection((err, connect) => {
        if (err) {

            next(err);
        }
        // 计算总数

        // Promise.all([
        //     connect.promise().query('select count(*) as totalPage from students'),

        //     connect.promise().query(`select * from students limit ${start} , ${pageSize}`)
        // ]).then((result => {
        //         const [{ totalPage }] = results[0]
        //         const [date] = results[1]
        //         console.log(JSON.stringify(totalPage))
        //         console.log(JSON.stringify(date)) 
        //         res.json({});
        //     })



        connect.query('select count(*) as total from students', (err, result) => {

            if (err) {
                next(err);
            }
            // 数据的总条数
            const [{ total }] = result;
            // 计算总页数
            const totalPage = Math.ceil(total / pageSize)

            // 判断前台传入的页数是否合理
            if (pageNo > totalPage) {
                pageNo = totalPage
            } else if (pageNo < 1) {
                pageNo = 1
            }

            // 计算每页的起始位置
            const start = (pageNo - 1) * pageSize;


            connect.query(`select * from students limit ${start} , ${pageSize}`, (err, result) => {

                if (err) {
                    next(err);
                }
                // 为前台相应数据
                res.json({ code: 1, message: '获取数据成功', date: { totalPage, list: result } });
                // 将连接放回连接池
                connect.release();
            })


            // // 为前台相应数据
            // res.json(totalPage);

            // // 将连接放回连接池
            // connect.release();
        })

    })
};

const saveUser = (req, res, next) => {

    let user = req.body;

    pool.getConnection((err, connect) => {
        if (err) next(err);

        connect.query(`insert into
         users (stdid,sname,age,sex,email,score,birthday)
          values(${user.stdid},'${user.sname}',${user.age},'${user.sex}','${user.email}',${user.score},'${user.birthday}')`, (err, result) => {
            if (err) next(err);


            if (result.affectedRows > 0) {
                res.json({ code: 1, message: '新建用户成功' })
            }
            // 将连接放回连接池
            connect.release();
        })
    })
};
const updateUser = (req, res, next) => {

    let user = req.body;

    pool.getConnection((err, connect) => {
        if (err) next(err);

        connect.query(`update users set sname='lisi ' where stdid=18`, (err, result) => {
            if (err) next(err);


            if (result.affectedRows > 0) {
                res.json({ code: 1, message: '更改用户成功' })
            }
            // 将连接放回连接池
            connect.release();
        })
    })
};
const deleteUser = (req, res, next) => {

    let user = req.body;

    pool.getConnection((err, connect) => {
        if (err) next(err);

        connect.query(`delete from users where stdid=${19}`, (err, result) => {
            if (err) next(err);


            if (result.affectedRows > 0) {
                res.json({ code: 1, message: '删除用户成功' })
            }
            // 将连接放回连接池
            connect.release();
        })
    })
};


exports = module.exports = {
    getUsers,
    saveUser,
    updateUser,
    deleteUser
};