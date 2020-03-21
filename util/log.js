const fs = require('fs');
const path = require('path');
//获取流对象
function createWriteStream(filePath) {
    return fs.createWriteStream(filePath,{flags:'a'});
}
//写日志
function writeLog(stream,log) {
    stream.write(log+'\n');
}
//access log
const accessLogPath = path.resolve(__dirname,"../",'logs','access.log');
const accessWriteStream = createWriteStream(accessLogPath);
function access(log) {
    writeLog(accessWriteStream,log);
}
module.exports = {
    access
}
