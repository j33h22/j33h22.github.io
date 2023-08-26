const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const out = [];
const re = /---(.*?)---/sg;

function readAll(parentPath) {
    const files = fs.readdirSync(parentPath);
    files.forEach(item => {
        const tempPath = path.join(parentPath, item); // 当前文件或文件夹的路径
        const stats = fs.statSync(tempPath); // 判断是文件还是文件夹
        if (stats.isDirectory()) { // 文件夹递归处理
            readAll(tempPath);
        } else if (path.extname(tempPath) === '.md') { // 只处理扩展名为.md的文件
            const content = fs.readFileSync(tempPath, 'utf8'); // 获取文件内容
            const matches = [...content.matchAll(re)]; // 使用matchAll匹配所有frontmatter
            matches.forEach(match => {
                const frontmatterContent = match[1].trim();
                try {
                    const docs = yaml.load(frontmatterContent); // 通过yaml转换成对象
                    docs.link = '/littlear' + tempPath.slice(tempPath.indexOf("/Blog"), -3); // 文章列表的跳转
                    out.push(docs);
                } catch (error) {
                    console.error(`Error parsing frontmatter in file ${tempPath}: ${error}`);
                }
            });
        }
    });
}

readAll('./Blog/Articles');

const filePath = './Blog/components/docs.json';
fs.writeFileSync(
    filePath,
    JSON.stringify(out, null, 2), // 添加漂亮的格式化，2个空格缩进
    {
        encoding: 'utf8',
    }
);

console.log(`Parsed ${out.length} documents. JSON data written to ${filePath}`);
