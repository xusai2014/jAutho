import http from 'http';
import fs from 'fs';
import path from'path';


const command = `serve <staticPath> [port]`;
const desc = '托管文件夹';
const aliases = 'serve';
function builder(yargs) {
    yargs.positional('staticPath', {
        describe: '文件夹路径',
        type: 'string'
    });
    yargs.positional('port',{
        describe: '静态服务端口',
        type: 'string',
        default: '3000'
    });
}
function handler(argv) {
    const { staticPath, port } = argv;
    const server = http.createServer(function(req,response){
        var dirpath = path.resolve(process.cwd(),staticPath+req.url);
        console.log(staticPath+req.url,1);
        fs.stat(dirpath, function (err, stats) {
            if(err){
                console.log('Mark:', '不存在该路径');
                response.setHeader('Content-Type','text/plain;charset=utf-8');
                response.writeHead(200,);
                response.write('不存在该路径');
                response.end();
                return;
            }

            if (stats.isFile()) {
                console.log('Mark:', 'success');
                var contentType = 'text/plain';
                if(req.url.indexOf('.html')>-1){
                    contentType = 'text/html';
                } else if(req.url.indexOf('.js')>-1){
                    contentType = 'application/x-javascript';
                } else if( req.url.indexOf('.css')>-1 ){
                    contentType =  'text/css';
                } else {
                    contentType =  'text/plain';
                }
                response.writeHead(200, { 'Content-Type': contentType,'Trailer': 'Content-MD5' });
                var file = fs.readFileSync(dirpath);
                response.write(file);
                response.end();

            } else {
                console.log('Mark:', '不存在该文件');
                response.setHeader('Content-Type','text/plain;charset=utf-8');
                response.writeHead(200);
                response.write('不存在该文件');
                response.end();
            }
        });


    });
    server.listen(port,function(){
        console.log(`静态资源服务启动，监听端口 ${port}!!`);
    });
}

export {
    command,
    desc,
    builder,
    handler,
    aliases
}






