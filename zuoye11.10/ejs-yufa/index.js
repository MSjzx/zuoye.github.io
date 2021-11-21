const ejs = require('ejs');

const links = [{
    title: 'shouye',
    value: '/'
}]
const html = ejs.renderFile('views/index.ejs', { links });

console.log(html)