let http = require('http');
let fs = require('fs');
let url = require('url');
const port = process.argv[2];

if(!port){
    console.log('请指定端口？\nnode server.js 8888 belike')
    process.exit(1)
}

const server = http.createServer(function (request, response) {
    const parsedUrl = url.parse(request.url, true);
    const pathWithQuery = request.url;
    let queryString = '';
    if (pathWithQuery.indexOf('?') >= 0) {
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
    }
    const path = parsedUrl.pathname;
    const query = parsedUrl.query;
    const method = request.method;

    /******** 从这里开始看，上面不要看 ************/

    console.log('收到请求：路径（带查询参数）为：' + pathWithQuery)
    response.statusCode = 200
    //默认首页
    let rpath = path === '/' ? '/index.html' : path
    let index = filePath.lastIndexOf('.')
    let suffix = filePath.substring(index)
    let fileType = {
        '.html':'text/html',
        '.css':'text/css',
        '.js':'text/javascript',
        'png':'image/png',
        '.jpg':'image/jpeg'
    }
    response.setHeader('Content-Type', `${fileType[suffix]||'text/html'};charset=utf-8` )
    let content
    try {
        content = fs.readFileSync(`./public/${rpath}`)
    } catch (error) {
        response.statusCode = 404
        content = '文件不存在'
    }

    response.write(content)
    response.end()


    /******** 代码结束，下面不要看 ************/
});

server.listen(port)
console.log('监听 ' + port + ' 成功\n请打开 http://localhost:' + port)
