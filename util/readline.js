const fs = require('fs');
const path = require('path');
const readline = require('readline');
const logPath = path.resolve(__dirname,'../','logs','access.log');
const readStream = fs.createReadStream(logPath);
const readlines = readline.createInterface({
    input:readStream
});
let count = 0;
let chromeCount = 0;
readlines.on('line',data=>{
    count++;
    if(data.includes('Chrome')) {
        chromeCount++;
    }
});
readlines.on('close',err=>{
    console.log('Chrome占比'+chromeCount/count*100+'%');
});



