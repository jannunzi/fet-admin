const { exec, execSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const { exit } = require("node:process");

const listFolderContent = (folderPath) => {
  return fs.readdirSync(folderPath);
};

const filesInFolder = listFolderContent("./srts/Nature");

filesInFolder.forEach((srtFile) => {
  const fileName = srtFile.split(".")[0];
  console.log(fileName);
  execSync(
    `"/Applications/HandBrakeCLI" --input ./videos/original/Nature.mp4 --output ./videos/subtitled/${fileName}.mp4 --srt-burn --srt-file ./srts/Nature/${fileName}.srt --srt-codeset UTF-8`
  );
  exit();
});
/*
SRT Validator
https://validator.subtitledpro.com/results

Character Sets
https://en.wikipedia.org/wiki/ISO/IEC_8859-1
https://en.wikipedia.org/wiki/ISO/IEC_8859
https://en.wikipedia.org/wiki/CJK_characters
*/
