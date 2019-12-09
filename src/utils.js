import fs from 'fs';
import path from 'path';

/**
 * 拼接运行路径下相对路径
 * @param {string} path 路径
 */

function runTimePath(dir) {
    return path.join(process.cwd(),dir)
}
/**
 * 读取路径信息
 * @param {string} path 路径
 */

function getStats(dir){
    return new Promise((resolve, reject) => {
        fs.stat(dir, (err, stats) => {
            if(err){
                resolve(false);
            }else{
                resolve(stats);
            }
        })
    })
}
async function pathExist(dir) {
    const isExists = await getStats(runTimePath(dir));
    if(isExists && isExists.isDirectory()){
        return true;
    }else if(isExists){
        //如果该路径存在但是文件，返回false
        return false;
    }

}

function fileExist(file) {
    console.log(runTimePath(file))
    return fs.existsSync(runTimePath(file));
}

//**
// 示例 replaceFile(
//      [{ reg: '<\\$modules\\$>', val: 'User'}],   替换规则
//      '../templates/page/modules/index.vue',  模版文件
//      './src/modules/User/index.vue'          目标文件
// );
//
//
// ***//

function replaceFile(temList, temPath, desPath) {
    let fileStr = fs.readFileSync(temPath, 'utf-8');
    temList.map((v) => {
        fileStr = fileStr.replace(new RegExp(v.reg,"gm"), v.val);
    });
    fs.writeFileSync(runTimePath(desPath), fileStr, 'utf-8');
}

export {
    pathExist,
    fileExist,
    runTimePath,
    replaceFile
}
