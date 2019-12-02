import fs from 'fs';
import path from "path";
import {pathExist, fileExist, runTimePath} from "../utils";

const command = `create docker [publicPath]`;
const aliases = ['create d'];
const desc = '创建Docker容器化套件';
const builder = (yargs) => {
    yargs.positional('publicPath', {
        describe: '创建Docker容器化套件,nginx静态资源的虚拟路径',
        type: 'string'
    });

};

const handler = async function (argv) {
    // do something with argv.
    const { publicPath } = argv;
    const dic = `./`;
    if (fileExist('./Dockerfile')) {
        console.log('Dockerfile已经存在');
        return;
    }
    if (fileExist('./nginx.conf')) {
        console.log('nginx.conf文件已经存在');
        return;
    }

    if(publicPath){
        const readable = fs.createReadStream(path.resolve(__dirname, '../../templates/docker/Dockerfile'));//创建读取流
        const writable = fs.createWriteStream(path.join(process.cwd(), 'Dockerfile'));//创建写入流
        readable.pipe(writable);
        const fileStr = fs.readFileSync(path.resolve(__dirname, '../../templates/docker/nginx.conf'), 'utf-8');
        console.log(fileStr);
        const result = fileStr.replace('public',publicPath)
        fs.writeFileSync(runTimePath('nginx.conf'),result, 'utf-8');
    } else {
        checkDirectory(path.resolve(__dirname, '../../templates/docker/'), path.join(process.cwd(), dic), copy);
    }
};

const copy = function (src, dst) {
    let paths = fs.readdirSync(src); //同步读取当前目录
    paths.forEach(function (path) {
        var _src = src + '/' + path;
        var _dst = dst + '/' + path;
        fs.stat(_src, function (err, stats) { //stats 该对象 包含文件属性
            if (err) throw err;
            if (stats.isFile()) { //如果是个文件则拷贝
                let readable = fs.createReadStream(_src);//创建读取流
                let writable = fs.createWriteStream(_dst);//创建写入流
                readable.pipe(writable);
            } else if (stats.isDirectory()) { //是目录则 递归
                checkDirectory(_src, _dst, copy);
            }
        });
    });
};

const checkDirectory = function (src, dst, callback) {
    fs.access(dst, fs.constants.F_OK, (err) => {
        if (err) {
            fs.mkdirSync(dst);
            callback(src, dst);
        } else {
            callback(src, dst);
        }
    });
};


export {
    command,
    desc,
    builder,
    handler,
    aliases
}
