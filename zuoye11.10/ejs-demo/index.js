// 导入EJS模板引擎
const ejs = require('ejs')

// EJS 模板代码
// const tempate = `

// <h1><%= std.length %></h1>
// <ul>
// <% std.forEach(std=>{ %>

//    <li>姓名： <%= std.name%> 年龄：<%= std.age %> </li>

// <%})%>
// </ul>
// `;
// 数据库中的数据
const students = [{
        name: 'zhangsan',
        age: 18
    },
    {
        name: 'zhangsan',
        age: 18
    },
    {
        name: 'zhangsan',
        age: 18
    },
];
// 将模板代码翻译成HTml代码
const html = ejs.renderFile('views/index.ejs', { className: 'ss', std: students })
console.log(html);