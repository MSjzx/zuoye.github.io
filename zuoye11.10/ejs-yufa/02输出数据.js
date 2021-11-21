const ejs = require('ejs')

// <% %> 用于写Nodejs代码
const fullName = 'zhangsan'
const template = `


<%= fullName %>


`;

console.log(ejs.render(template, { fullName }))