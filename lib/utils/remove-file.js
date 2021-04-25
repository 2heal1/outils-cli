const exec = require('child_process').exec;
const log = require("./log");

module.exports = (path)=>{
    const cmdStr = `rm -rf ${path}`;
    exec(cmdStr, function (err, stdout, srderr) {
        if (err) {
          log.error(err);
        } 
    });
}