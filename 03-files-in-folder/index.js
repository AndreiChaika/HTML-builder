const path = require('path');
const promises = require('fs/promises');
(async () => {
  const files = await promises.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true });
  for (const file of files) {
    if (file.isFile()) {
      const dataSize = await promises.stat(path.join(__dirname, 'secret-folder', file.name));
      console.log(`${file.name.split('.')[0]} - ${file.name.split('.')[1]} - ${dataSize.size}b`);
    }
  }
})();