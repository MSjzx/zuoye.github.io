const ejs = require('ejs')

// <% %> 用于写Nodejs代码

const template = `


<% 
 
if(3>15){
    console.log(ture)
}else{
    console.log(false)
}

%>



 
<% if(3>15){ %>
  <h1>成立</h1>
<% }else{ %>
    <h1>不成立</h1>
<% } %>


`;
// 如果想在js语句中输出html标签 需要将
// 不能将HTML 标签直接嵌套在<% %> 标签中 需要将JS代码拆解 然后嵌套在HTML标签中
console.log(ejs.render(template))