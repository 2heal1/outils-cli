const fs = require("fs");

module.exports = (path, content, callback=()=>{})=>{
    let lastPath = path.substring(0, path.lastIndexOf("/"));
    fs.mkdir(lastPath, {recursive: true}, (err) => {
        if (err) return callback(err);
        fs.writeFile(path, content, function(err){
            if (err) return callback(err);
            return callback(null);
        });
    });
}