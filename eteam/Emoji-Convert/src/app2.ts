// Create "in", "out" folders
// Put export form after effects into "in" folder
// Run script
// In out you should have gifs

import * as fs from "fs";
import * as path from "path";

const getDirectories = source => {
  return fs
    .readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => {
      return {
        path: path.join(__dirname, "../in", dirent.name),
        name: dirent.name
      };
    });
};

const getCommands = folder => {
  const commands = [];

  // cd 21_Joke
  // gifski -o test.gif 21_Joke_*.png
  // mv

  const customName = folder.name
    .split("!")
    .join("\\!")
    .split(" ")
    .join("\\ ");

  commands.push(`cd 'in/${folder.name}'`);
  commands.push(`gifski -o '${folder.name}.gif' ${customName}_*.png`);
  commands.push(`mv '${folder.name}.gif' '../../out/${folder.name}.gif'`);
  commands.push(`cd ../../`);

  // commands.push(
  //   `ffmpeg -i "in/${folder.name}/${folder.name}_%05d.png" -vf palettegen=reserve_transparent=1 "palette.png"`
  // );
  // commands.push(
  //   `ffmpeg -framerate 25 -i "in/${folder.name}/${folder.name}_%05d.png" -i "palette.png" paletteuse=alpha_threshold=128 "out/${folder.name}.gif"`
  // );
  // commands.push(`rm palette.png`);

  return commands;
};

const commands = getDirectories(path.join(__dirname, "../in")).map(f => {
  return getCommands(f);
});

let cmdStr = "";

commands.forEach(cs => {
  cs.forEach(c => {
    cmdStr += c;
    cmdStr += " && ";
  });
});
cmdStr = cmdStr.slice(0, -4);

console.log(cmdStr);
