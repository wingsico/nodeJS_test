var http = require('http');
var server = http.createServer();
var url = require('url')
server.on('request', function (req, res) {
    // req.url 是获取 完整路径 （包括路径参数）
    const parseObj = url.parse(req.url, true)
    const pathName = parseObj.pathname // 而此处是获取路径 （不包括参数）
    res.writeHeader(200, {
        'Content-Type': 'text/html;charset=utf-8',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*' //可以是*，也可以是跨域的地址
    });
    var data = {
        users: [
            {
                id: 1,
                name: '追梦',
                age: 18,
                job: 4
            }, {
                id: 2,
                name: '小飞飞',
                age: 22,
                job: 3
            }, {
                id: 3,
                name: '小火锅',
                age: 25,
                job: 2
            }, {
                id: 4,
                name: '大宝',
                age: 26,
                job: 1
            }
        ],
        jobs: [
            {
                id: 1,
                name: '讲师'
            }, {
                id: 2,
                name: '吃饭'
            }, {
                id: 3,
                name: '睡觉'
            }, {
                id: 4,
                name: '打豆豆'
            }
        ]
    };

    if (pathName === '/users') {

        if (parseObj.query.id) {
            var id = parseObj.query.id
            var result = data
                .users
                .find(function (item) {
                    return item.id == id
                })
            console.log(id, result)
            res.end(JSON.stringify(result))
        } else {
            res.end(JSON.stringify(data.users))
        }

    } else if (pathName === '/jobs') {

        if (parseObj.query.id) {
            var id = parseObj.query.id
            var result = data
                .jobs
                .find(function (item) {
                    return item.id == id
                })
            //console.log(id, result )
            return res.end(JSON.stringify(result))
        }

        res.end(JSON.stringify(data.jobs))
    }
})

server.listen(6333, function () {
    console.log('服务器启动成功了')
})