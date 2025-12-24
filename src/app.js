/* eslint-disable no-console */
'use strict';

const fs = require('fs');

function copyFile() {
  const [, , source, dest] = process.argv;

  if (!source || !dest) {
    console.error('Please provide both source and destination paths.');
    process.exit(1);
  }

  if (source === dest) {
    return;
  }

  fs.promises
    .stat(source)
    .then((stats) => {
      if (stats.isDirectory()) {
        console.error('Source path is a directory, not a file.');
        process.exit(1);
      }

      fs.promises.stat(dest).catch((error) => {
        if (error.code === 'ENOENT') {
          fs.copyFile(source, dest, (err) => {
            if (err) {
              console.error(err.message);
              process.exit(1);
            }
          });
        } else if (error.code === 'EISDIR') {
          console.error('Destination path must be a file, not a directory.');
          process.exit(1);
        } else {
          console.error(error.message);
          process.exit(1);
        }
      });
    })
    .catch((error) => {
      if (error.code === 'ENOENT') {
        console.error('Source file does not exist.');
      } else {
        console.error(error.message);
      }
      process.exit(1);
    });
}

copyFile();
