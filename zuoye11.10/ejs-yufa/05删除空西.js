const ejs = require('ejs')

// <%# %> 用于为JS 代码注释 注释不会被输出执行
const scripts = '<% <% %>'
const template = `

<h1><%% <% %><h1>

`;
// <%=  %>这个标签内容输出会被转义
// 如果我们想要输出我们的内容 则需要时用 <%- %>
console.log(ejs.render(template, { scripts }))