const { sequelize } = require('../db/index')
const { DataTypes, Sequelize } = require('sequelize')

const User = sequelize.define('User', {
    sid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    sname: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    },
    sex: {
        type: DataTypes.CHAR,
        defaultValue: 'm'
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    birthday: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    tableName: 'myusers',
    createdAt: 'create_time',
    updatedAt: 'update_time'
})

// async function run () {
//     await User.sync()

// }

// run()

exports = module.exports = User;
