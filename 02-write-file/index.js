const readline = require('readline');
const fs = require('fs');
const {stdin: input, stdout: output} = require('node:process');
const result = readline.createInterface({ input, output });
const writeStream = fs.createWriteStream('02-write-file\\test.txt', {flags: 'a'});
console.log('Enter something...');
function goodbye () {
  console.log('Goodbye');
  writeStream.close((err) => {
    if(err) throw err;
  });
  result.close();
}
result.on('SIGINT', () => {
  goodbye();
});
result.on('line', (input) => {
  if( input === 'exit') goodbye();
  else writeStream.write(input + '\r\n');
});