const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const out = [];
const re = /---(.*?)---/sg;

function readAll(parentPath) {
    const files = fs.readdirSync(parentPath)
    files.map(item => {
      let tempPath = path.join(parentPath, item); //当前文件或文件夹的路径
      let stats = fs.statSync(tempPath); //判断是文件还是文件夹
      if (stats.isDirectory()) { //文件夹递归处理
        readAll(tempPath);
      } else {
        const content = fs.readFileSync(tempPath, 'utf8') //获取文件内容
        let s = re.exec(content) //通过正则获取frontmatter的内容
        re.lastIndex = 0 // 这里如果不操作，在后面正则判断时会有问题，当时在这里卡了很久
        if (s) {
          let docs = yaml.load(s[1]) // 通过yaml转换成对象
          docs.link = tempPath.slice(4, -3) // 这里是为了文章列表的跳转
          out.push(docs);
        }
      }
    })
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
