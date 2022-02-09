// import * as cheerio from "cheerio";
// import * as fs from "fs";
// import * as mkdirp from "mkdirp";
// import * as path from "path";
import * as puppeteer from "puppeteer";
import { writeFileTree } from "./utils.js";

// function writeFile(filePath, contents, cb) {
//   mkdirp(path.dirname(filePath), (err) => {
//     if (err) {
//       return cb(err);
//     }

//     fs.writeFile(filePath, contents, cb);
//   });
// }

export async function createSnapshot(webRoute, dirPath) {
  const browser = await puppeteer.launch();

  console.log(`Statisfying ${webRoute}`);

  let html;
  let success = false;
  let tryCounter = 0;

  while (!success && tryCounter <= 3) {
    try {
      const page = await browser.newPage();
      await page.goto(webRoute);
      html = await page.evaluate(() => document.documentElement.outerHTML);
      await page.close();
      success = true;
    } catch (e) {
      console.warn(`Could not evaluate ${webRoute} in try ${tryCounter++}.`);
      console.warn(`Error: ${e}`);
    }
  }

  if (!success) {
    console.error(`Could not evaluate ${webRoute} in ${tryCounter} tries.`);
    return;
  }

  // UNDO UPLOAD TO CLOUD
  writeFileTree(dirPath, [`${webRoute}`]);

  // writeFile(`static/static/${route ? route : "index"}.html`, html, (err) => {
  //   if (err) {
  //     console.log(err);
  //     process.exit(1);
  //   }
  // });

  await browser.close();
}

(async () => {})();
