const fs = require('fs');

module.exports = fileContents => {
  return new Promise((resolve, reject) => {
    fs.writeFile('./dist/data.csv', fileContents, err => {
      if(err) {
        reject(err);
        return;
      }
      resolve({
        ok:true,
        message: 'data.csv file created. Check dist directory.'
      });
    });
  });
};