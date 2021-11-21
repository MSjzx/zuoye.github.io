const ejs = require('ejs')

// <%# %> 用于为JS 代码注释 注释不会被输出执行
const fullName = 'zhangsan'
const template = `

<！--html注释 会被输出到编译结果中 -->
<%#  %> 这才是ejs模板中的注释语法 不被被输出 也不会被执行
<%# fullName %>


`;

console.log(ejs.render(template, { fullName }))