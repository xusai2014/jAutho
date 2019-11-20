import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import {pathExist} from "../utils";


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
    const dest = './dist/html';
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const result = await page.mainFrame().content();
    const isExist = await pathExist(dest);
    if(!isExist){
        await fs.mkdirSync(dest, { recursive: true,mode: 0o777 });
    }
    fs.writeFileSync(path.join(process.cwd(), `${dest}/u.html`),result);
    await browser.close();
}

export {
    command,
    desc,
    builder,
    handler,
    aliases
}


