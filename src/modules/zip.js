import fs from 'fs';
import path from "path";
import imagemin from 'imagemin';
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

const command = `zip <path>`;
const aliases = ['zip'];
const desc = '压缩图片';
const builder = (yargs) => {
    yargs.positional('path', {
        describe: '图片所在文件夹',
        type: 'string'
    });
};

const handler = async function (argv) {
    // do something with argv.
    const {path:imagePath} = argv;
    fileDisplay(imagePath);
    
};

function fileDisplay (imagePath){
    const filePath = imagePath;
    fs.readdir(filePath,(err,files)=>{
        if(err) console.log('读取文件异常',err);
        imagemin([`${filePath}/*.{jpg,png}`],{
            destination: filePath,
            plugins: [
                imageminJpegtran(),
                imageminPngquant({
                    quality: [0.6, 0.8]
                })
            ]
        }).then((...args) => {
            console.log(`${filePath}/*.{jpg,png}`,'压缩图片成功！',args);
            files.forEach((filename)=>{
                const filedir = path.join(imagePath,filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,function(eror,stats){
                if(eror){
                    console.warn('获取文件stats失败');
                }else{
                    const isFile = stats.isFile();//是文件
                    const isDir = stats.isDirectory();//是文件夹
                    if(isFile){
                    return;
                    }
                    if(isDir){
                    return fileDisplay(filedir.split(path.sep).join('/'));//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                    }
                }
                })
            })
        });
  
    })
  }


export {
    command,
    desc,
    builder,
    handler,
    aliases
}
