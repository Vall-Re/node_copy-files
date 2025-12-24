/* eslint-disable no-console */
'use strict';

const fs = require('fs');
// eslint-disable-next-line no-unused-vars
const path = require('path');

async function copyFile() {
  const [, , source, dest] = process.argv;

  // Перевірка на наявність обох шляхів
  if (!source || !dest) {
    console.error('Please provide both source and destination paths.');
    process.exit(1);
  }

  // Якщо source і dest однакові — нічого не робимо
  if (source === dest) {
    return;
  }

  try {
    // Перевірка існування source
    const stats = await fs.promises.stat(source);

    if (stats.isDirectory()) {
      console.error('Source path is a directory, not a file.');
      process.exit(1);
    }

    try {
      // Перевірка на існування призначення
      const destStats = await fs.promises.stat(dest);

      if (destStats.isDirectory()) {
        console.error('Destination path must be a file, not a directory.');
        process.exit(1);
      }
    } catch (error) {
      // Якщо dest не існує, можна копіювати файл
      if (error.code === 'ENOENT') {
        await fs.promises.copyFile(source, dest);

        return; // Завершуємо, якщо все успішно
      }

      // Якщо виникає інша помилка, виводимо повідомлення
      console.error(error.message);
      process.exit(1);
    }

    // Копіюємо файл
    await fs.promises.copyFile(source, dest);
  } catch (error) {
    // Обробка помилки, якщо source не існує або інші помилки
    if (error.code === 'ENOENT') {
      if (error.path === source) {
        console.error('Source file does not exist.');
      } else {
        console.error('Destination path does not exist.');
      }
    } else {
      console.error(error.message);
    }
    process.exit(1);
  }
}

copyFile();
