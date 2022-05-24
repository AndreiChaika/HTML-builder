const path = require('path');
const fs = require('fs');
fs.rm(path.join(__dirname, 'files-copy'), { recursive: true, force: true }, () => {
  fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => {
    if (err) throw err;
    fs.readdir(path.join(__dirname, 'files'), (err, file) => {
      if (err) throw err;
      file.forEach(element => {
        fs.copyFile(path.join(__dirname, 'files', element), path.join(__dirname, 'files-copy', element), err => {
          if (err) throw err;
        });
      });
    });
  });
});