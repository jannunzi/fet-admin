/*
  Duke SRTs can be found here:
  https://drive.google.com/drive/u/1/folders/1F6lAEwq18ACEyrveqp7Ow9LkYrmYSdfI
*/
const translations = require("../i18n/translations.json");
const times = require("./times.json");
const fs = require("fs");
function convertTime(timeInMilliseconds) {
  const timeInSeconds = timeInMilliseconds / 1000;
  const hour = Math.floor(timeInSeconds / 3600);
  const minute = Math.floor((timeInSeconds % 3600) / 60);
  const second = (timeInSeconds % 60).toFixed(3);

  return `${hour}:${minute}:${second.replace(".", ",")}`;
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
Object.entries(translations).forEach(([lang, translation]) => {
  const subtitles = translation.translation.subtitles;
  Object.entries(subtitles).forEach(([video, subtitleArray]) => {
    if (subtitleArray["1"] === "") return;
    const srt = Object.values(subtitleArray)
      .map((subtitle, index) => {
        const time = times[video][index + 1 + ""];
        return `${index + 1}
${convertTime(time[0])} --> ${convertTime(time[1])}
${subtitle.replace("’", "'")}\n`;
      })
      .join("\n");
    const outputName = capitalizeFirstLetter(video);
    fs.writeFileSync(`./srts/${outputName}/${outputName}-${lang}.srt`, srt);
  });
});
