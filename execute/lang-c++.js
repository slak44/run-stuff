'use strict';
const cp = require('child_process');
cp.exec(`g++ ${process.argv[2]} -o ${process.argv[2]}.exe`, function (err, stdout, stderr) {
  if (err) throw err;
  cp.exec(`${process.argv[2]}.exe`, function (error, stdout, stderr) {
    if (error) throw error;
    console.log(stdout);
    require('fs').unlink(`${process.argv[2]}.exe`);
  });
});