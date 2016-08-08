var fs = require('fs');
var prompt = require('prompt');

var properties = [{
    name: 'path',
    warning: 'Please input proper path'
}, {
    name: 'extensionName',
    warning: 'extension must be only letters'
}];
prompt.start();

prompt.get(properties, function(err, result) {
    if (err) {
        return onErr(err);
    }
    let userPath = result.path;
    let userFileExtension = result.extensionName;
    readPath(userPath, userFileExtension)
});

function readPath(path, userFileExtension) {
    fs.readdir(path, function(err, files) {
        if (files.length === 0) {
            return onErr("Directory is empty");
        }
        if (err) {
            return onErr(err);
        }
        getFileExtension(path, files, userFileExtension);
    });
}


function getFileExtension(path, fileNames, userFileExtension) {
    fileNames.forEach(function(fileName, index) {
        let fileExtension = fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2);
        if (fileExtension === userFileExtension) {
            deletefiles(path, fileName);
        };
    });
};

function deletefiles(path, fileName) {
    let currentPath = path + "/" + fileName;
    fs.unlink(currentPath, (err) => {
        if (err) {
            return onErr(err);
        }
        console.log('Deleted Successfully', fileName);
    });
};

function onErr(err) {
    console.log(err);
    return 1;
};