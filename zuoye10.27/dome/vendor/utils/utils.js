function get(url, success) {
    // 创建 XMLHttpRequest 对象
    var xhr = new XMLHttpRequest();

    // 监听 readyState 属性的变化
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 300) {
            // 如果 readyState 属性变成 4，说明请求完成了
            // 如果 status 属性的值为 200 至 299 之间的状态码，说明请求成功了
            success(JSON.parse(xhr.response));
        }
    };

    xhr.open('get', url);
    xhr.send(null);
}

function post(url, data, type, success) {
    // 创建 XMLHttpRequest 对象
    var xhr = new XMLHttpRequest();

    // 监听 readyState 属性的变化
    xhr.onreadystatechange = function () {
        console.log(xhr.readyState)
        if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 300) {
            // 如果 readyState 属性变成 4，说明请求完成了
            // 如果 status 属性的值为 200 至 299 之间的状态码，说明请求成功了
            // 当请求成功时，调用传入函数
            success(JSON.parse(xhr.response));
        }
    };

    xhr.open('post', url);

    if (type == 'json') {
        data = JSON.stringify(data);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    } else if (type == 'urlencoded') {
        data =  Object.entries(data).map(function (pair) {
        return pair[0] + '=' + pair[1];
        }).join('&');

        // 进行 URL 编码
        data = encodeURI(data);

        // 设置请求头，告诉服务器数据的编码
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded; charset=utf-8');
    } else {
        xhr.setRequestHeader('Content-Type', 'text/plain; charset=utf-8');
    }

    xhr.send(data);
}

function remove (url, data, success) {
    // 创建 XMLHttpRequest 对象
    var xhr = new XMLHttpRequest();

    // 监听 readyState 属性的变化
    xhr.onreadystatechange = function () {
        console.log(xhr.readyState)
        if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 300) {
            success(JSON.parse(xhr.response));
        }
    };

    xhr.open('delete', url);

    data = JSON.stringify(data);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.send(data);
}

function put (url, data, success) {
    // 创建 XMLHttpRequest 对象
    var xhr = new XMLHttpRequest();

    // 监听 readyState 属性的变化
    xhr.onreadystatechange = function () {
        console.log(xhr.readyState)
        if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 300) {
            success(JSON.parse(xhr.response));
        }
    };

    xhr.open('put', url);

    data = JSON.stringify(data);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.send(data);
}