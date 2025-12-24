/* eslint-disable no-console */
'use strict';

const { cp } = require('fs/promises');

async function copyFile() {
  const [, , source, dest] = process.argv;

  if (!source || !dest) {
    console.error('Please provide both source and destination paths.');

    return;
  }

  if (source === dest) {
    console.log('Source and destination paths are the same');

    return;
  }

  try {
    await cp(source, dest);
    console.log(`File copied from ${source} to ${dest}`);
  } catch (error) {
    console.error(`Error copying file: ${error.message}`);
  }
}

copyFile();
