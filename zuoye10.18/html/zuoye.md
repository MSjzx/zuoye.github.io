下⾯哪两个 URL 都拥有相同的⽂档源？

http://www.foo.com:8088/path/to/file1.html //协议不同

 https://www.foo.com:8088/path/to/file2.html //

 https://www.bar.com:8088/path/to/file3.html //域名不同

 https://www.foo.com:8080/path/to/file4.html //端口不同

 https://www.foo.com:8088/path/to/file5.html //

 请简述 localStorage 与 sessionStorage 的区别
 localStorage 除⾮ web 应⽤⾃⼰删除 或者⽤户清除浏览器缓存，否则数据将会被永久保存，永不过期同源的⽂档间共享相同的localStorage数据。它们可以互相读取、修改和删除对⽅存储的数据。但是 ⾮同源的⽂档之间存储的数据是相互对⽴的，彼此⽆法共享
 sessionStorage  使⽤ sessionStorage 对象存储的数据只在页⾯被打开期间有效，⼀旦浏览器窗⼝或者标签页被关 闭，那么所有存储的数据都将被删除。sessionStorage 的可见范围还被限定在窗⼝中。如果同源的⽂档渲染在不同的浏览器标 签页中，那么它们互相之间拥有的是各⾃的 sessionStorage 数据，⽆法共享