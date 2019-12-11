import fs from 'fs';
import path from "path";
import {fileExist, pathExist, replaceFile, runTimePath} from "../utils";

const command = `generate router <name>`;
const aliases = ['generate r'];
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
    fs.mkdirSync(`${modulesDic}/List`);
    fs.mkdirSync(`${modulesDic}/Add`);
    fs.mkdirSync(`${modulesDic}/Detail`);
    fs.mkdirSync(vuexDic);
    const tmpList = [{
        reg:'<\\$modules\\$>',
        val: name
    },{
        reg:'<\\$modulesName\\$>',
        val: name
    },{
        reg:'<\\$modulesPath\\$>',
        val: name.toLowerCase()
    }];
    replaceFile(tmpList, path.resolve(__dirname, '../../templates/page/modules/index.vue'), `./src/modules/${name}/index.vue`);
    replaceFile(tmpList, path.resolve(__dirname,'../../templates/page/modules/List/index.vue'), `./src/modules/${name}/List/index.vue`);
    replaceFile(tmpList, path.resolve(__dirname,'../../templates/page/modules/List/default.vue'), `./src/modules/${name}/List/default.vue`);
    replaceFile(tmpList, path.resolve(__dirname,'../../templates/page/modules/Add/index.vue'), `./src/modules/${name}/Add/index.vue`);
    replaceFile(tmpList, path.resolve(__dirname,'../../templates/page/modules/Detail/index.vue'), `./src/modules/${name}/Detail/index.vue`);
    [ 'actions', 'api', 'getters', 'index', 'mutations', 'state' ].map(v => {
        replaceFile(tmpList, path.resolve(__dirname,`../../templates/page/vuex/${v}.js`), `./src/vuex/${name}/${v}.js`);
    });
    if(fileExist(`./src/vuex/AutoVuex.js`)){
        fs.appendFile(runTimePath(`./src/vuex/AutoVuex.js`),`export { default as ${name} } from './${name}';`,function (err) {
            if(err) throw err;
        });
    } else {
        console.warn('无Vuex自动代码生成文件，故不进行状态自动绑定，该警告可忽略！');
    }
    replaceFile(tmpList, path.resolve(__dirname,'../../templates/page/router/tmp.js'), `./src/router/${name}.js`);
    if(fileExist(`./src/router/AutoRouter.js`)){
        fs.appendFile(runTimePath(`./src/router/AutoRouter.js`),`export { default as ${name} } from './${name}';`,function (err) {
            if(err) throw err;
        });
    } else {
        console.warn('无路由自动代码生成文件，故不进行路由自动绑定，该警告可忽略！');
    }
    console.info('路由套件生成成功！！');
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
