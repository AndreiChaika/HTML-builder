const path = require('path');
const fs = require('fs');
fs.rm(path.join(__dirname, 'project-dist'), { recursive: true, force: true }, () => {
  fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, err => {
    if (err) throw err;
    fs.readFile(path.join(__dirname, 'template.html'), (err, file) => {
      if (err) throw err;
      let template = file.toString();
      fs.readdir(path.join(__dirname, 'components'), (err, file) => {
        if (err) throw err;
        file.forEach(el => {
          if (path.extname(el) === '.html') {
            let teg = `{{${path.parse(path.join(__dirname, 'components', el)).name}}}`;
            fs.readFile(path.join(__dirname, 'components', el), (err, file) => {
              if (err) throw err;
              template = template.replace(teg, file.toString());
              fs.rm(path.join(__dirname, 'project-dist', 'index.html'), { recursive: true, force: true }, () => {
                fs.writeFile(
                  path.join(__dirname, 'project-dist', 'index.html'),
                  template,
                  (err) => {
                    if (err) throw err;
                  });
              });
            });
          }
        });
      });
    });
    fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {
      if (err) throw err;
      fs.writeFile(
        path.join(__dirname, 'project-dist', 'style.css'),
        '',
        (err) => {
          if (err) throw err;
        }
      );
      files.forEach(file => {
        if (file.isFile() && file.name.split('.')[1] === 'css') {
          fs.readFile(path.join(__dirname, 'styles', file.name), (err, file) => {
            if (err) throw err;
            fs.appendFile(
              path.join(__dirname, 'project-dist', 'style.css'),
              file,
              err => {
                if (err) throw err;
              }
            );
          });
        }
      });
    });
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, err => {
      if (err) throw err;
      function copyFile(name = '') {
        fs.readdir(path.join(__dirname, 'assets', name), { withFileTypes: true }, (err, file) => {
          if (err) throw err;
          file.forEach(element => {
            if (element.isFile()) {
              fs.copyFile(path.join(__dirname, 'assets', name, element.name), path.join(__dirname, 'project-dist', 'assets', name, element.name), err => {
                if (err) throw err;
              });
            } else {
              fs.mkdir(path.join(__dirname, 'project-dist', 'assets', element.name), { recursive: true }, err => {
                if (err) throw err;
              });
              copyFile(element.name);
            }
          });
        });
      }
      copyFile();
    });
  });
});