import fs from 'fs';
import path from "path";
import { pathExist } from "../utils";

const command = `create router <name>`;
const aliases = ['create r'];
const desc = '创建新路由模块套件';
const builder = (yargs) => {
    yargs.positional('name', {
        describe: '创建新模块的名称',
        type: 'string'
    });
};

const handler = async function (argv) {
    // do something with argv.
    const {name} = argv;
    const modulesDic = `./src/modules/${name}`;
    const vuexDic = `./src/vuex/${name}`;

    const isExitModules = await pathExist(modulesDic);
    const isExitVuex = await pathExist(vuexDic);

    if (isExitModules) {
        console.log('modules目录下已存在该模块');
        return;
    }
    if (isExitVuex) {
        console.log('vuex目录下已存在该模块');
        return;
    }
    fs.mkdirSync(modulesDic);
    checkDirectory(path.resolve(__dirname, '../../templates/page/modules'), path.join(process.cwd(), modulesDic), copy);
    fs.mkdirSync(vuexDic);
    checkDirectory(path.resolve(__dirname, '../../templates/page/vuex'), path.join(process.cwd(), vuexDic), copy);
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
}
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
