let http = require('http');
let fs = require('fs');
let url = require('url');
const { parse } = require('path');
let port = process.argv[2];

if(!port) {
  console.log(`没有指定端口, 正确用法是: \nnode-dev server.js 3000`);
}

let server = http.createServer(function(request, response) {
  let parsedUrl = url.parse(request.url, true);
  let pathWithQuery = request.url;
  let queryString = '';
  if(pathWithQuery.indexOf('?') >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'));
  }
  let path = parsedUrl.pathname;
  let query = parsedUrl.query;
  let method = request.method;
  // 以上不懂
  console.log(`请求过来了! 路径(带查询参数)为: ${pathWithQuery}`);
  // 默认成功
  response.statusCode = 200;
  // 默认首页
  const filePath = path === '/' ? '/index.html' : path;
  const index = filePath.lastIndexOf('.');
  // suffix 后缀
  const suffix = filePath.substring(index);
  const fileTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg'
  };
  response.setHeader('Content-Type', `${fileTypes[suffix] || 'text/html'};charset=utf-8`);
  let content;
  try{
    // readFileSync 同步读取文件
    content = fs.readFileSync(`./public${filePath}`);
  } catch(error) {
    content = '文件不存在';
    response.statusCode = 404;
  }
  response.write(content);
  response.end();
})

// 下面不懂
server.listen(port);
console.log(`监听:${port}成功 \n请在浏览器打开http://localhost:${port}`);