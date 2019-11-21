import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer-core';
import {pathExist} from "../utils";
import ProgressBar from 'progress';


const command = `render <url>`;
const desc = '预渲染单页';
const aliases = ['r'];
function builder (yargs) {
    yargs.positional('url',{
        describe: '预渲染单页',
        type: 'string'
    })

}

async function handler(argv) {
    const { url } = argv;
    const dest = './dist/html'+ converUrl2Path(url);
    const browserFetcher = puppeteer.createBrowserFetcher({
        host: 'https://npm.taobao.org/mirrors',
    });
    // The version must is mapped to the puppeteer version! Please notice the message
    const version = '706915';
    const green = '\u001b[42m \u001b[0m';
    const red = '\u001b[41m \u001b[0m';
    let bar, total, per, num;
    const revisionInfo = await browserFetcher.download(version, function (...args) {
        let [ one, two] = args;
        if(!total){
            total = Number(two/one).toFixed(0);
            per = one;
        }
        num = Number(one/per).toFixed(0)
        if (!bar){
            bar = new ProgressBar('下载 [:bar] :percent :etas', {
                complete: green,
                incomplete: red,
                width: 30,
                total: parseInt(total,10),
            });
        } else{
            if(bar.curr < bar.total){
                if(num <= bar.total){
                    bar.tick(parseInt(num, 10));
                }
            }
        }
    });
    console.log('开始启动puppeteer！');
    const browser = await puppeteer.launch({
        executablePath: revisionInfo.executablePath,
    });
    console.log('启动puppeteer完毕，开始渲染页面');
    try {
        let page = await browser.newPage();
        await page.goto(url);
        const result = await page.mainFrame().content();
        const isExist = await pathExist(dest);
        if(!isExist){
            await fs.mkdirSync(dest, { recursive: true,mode: 0o777 });
        }
        fs.writeFileSync(path.join(process.cwd(), `${dest}/index.html`),result);
        console.log(`渲染成功，保存至${dest}`);
    } catch (e) {
        console.log('渲染失败',e.err);
        await browser.close();
    }
    await browser.close();
}

function converUrl2Path(url){
    if(url){
        const pathStr = url.split('?')[0];
        let urlMain = ''
        if(pathStr.split('#').length > 1){
            urlMain = pathStr.split('#')[1];
        } else {
            urlMain = pathStr.split('#')[0];
        }

        if(urlMain.length >0){
            if(urlMain.includes('https://')|| urlMain.includes('http://')) {
                urlMain = urlMain.replace('https://','').replace('http://','');
                const list = urlMain.split('/');
                list.shift();
                return '/'+list.join('/');
            } else {
                return urlMain;
            }
        }
    }
    return '';
}

export {
    command,
    desc,
    builder,
    handler,
    aliases
}


