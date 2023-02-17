const { readdirSync } = require("fs");
const ascii = require("ascii-table");
const adminTable = new ascii("Admin Commands");
const blacklistTable = new ascii("blacklist Commands");
const emojisTable = new ascii("Emoji Commands");
const generalTable = new ascii("General Commands");
const logsTable = new ascii("logs Commands");
const infoTable = new ascii("Info Commands");
const protectionTable = new ascii("protection Commands");
const schemasTable = new ascii("schemas Commands");
const warnsTable = new ascii("Warns Commands");


adminTable.setHeading("Command", "Load status");
blacklistTable.setHeading("Command", "Load status");
emojisTable.setHeading("Command", "Load status");
generalTable.setHeading("Command", "Load status");
logsTable.setHeading("Command", "Load status");
protectionTable.setHeading("Command", "Load status");
infoTable.setHeading("Command", "Load status");
schemasTable.setHeading("Command", "Load status");
warnsTable.setHeading("Command", "Load status");

module.exports = client => {
  const adminCommands = [];
  const blacklistCommands = [];
  const emojisCommands = [];
  const generalCommands = [];
  const infoCommands = [];
  const logsCommands = [];
  const protectionCommands = [];
  const schemasCommands = [];
  const warnsCommands = [];


  readdirSync("./commands/").forEach(dir => {
    const commands = readdirSync(`./commands/${dir}/`).filter(file =>
      file.endsWith(".js")
    );

    for (let file of commands) {
      let cmd = require(`../commands/${dir}/${file}`);

      if (cmd.name && typeof cmd.name === "string") {

if (dir === "admin") adminCommands.push([file, "✅"]);

else if (dir === "blacklist") blacklistCommands.push([file, "✅"]);

else if (dir === "emojis") emojisCommands.push([file, "✅"]);

else if (dir === "general") generalCommands.push([file, "✅"]);

else if (dir === "info") infoCommands.push([file, "✅"]);

else if (dir === "logs") logsCommands.push([file, "✅"]);

else if (dir === "protection") protectionCommands.push([file, "✅"]);

else if (dir === "schemas") schemasCommands.push([file, "✅"]);

else if (dir === "warns") warnsCommands.push([file, "✅"]);


        client.commands.set(cmd.name, cmd);
      } else {
if (dir === "admin") adminCommands.push([file, "❌  -> missing a help.name, or help.name is not a string."]);

else if (dir === "blacklist") blacklistCommands.push([file, "❌  -> missing a help.name, or help.name is not a string."]);

else if (dir === "emojis") emojisCommands.push([file, "❌  -> missing a help.name, or help.name is not a string."]);

else if (dir === "general") generalCommands.push([file, "❌  -> missing a help.name, or help.name is not a string."]);

else if (dir === "info") infoCommands.push([file, "❌  -> missing a help.name, or help.name is not a string."]);

else if (dir === "logs") logsCommands.push([file, "❌  -> missing a help.name, or help.name is not a string."]);

else if (dir === "protection") protectionCommands.push([file, "❌  -> missing a help.name, or help.name is not a string."]);

else if (dir === "schemas") schemasCommands.push([file, "❌  -> missing a help.name, or help.name is not a string."]);

else if (dir === "warns") warnsCommands.push([file, "❌  -> missing a help.name, or help.name is not a string."]);

        continue;
      }
      if (cmd.aliases && Array.isArray(cmd.aliases))
        cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name));
    }
  });
  

  adminCommands.forEach((cmd) => adminTable.addRow(cmd));
  blacklistCommands.forEach((cmd) => blacklistTable.addRow(cmd));
  emojisCommands.forEach((cmd) => emojisTable.addRow(cmd));
  generalCommands.forEach((cmd) => generalTable.addRow(cmd));
  infoCommands.forEach((cmd) => infoTable.addRow(cmd));
  logsCommands.forEach((cmd) => logsTable.addRow(cmd));
  protectionCommands.forEach((cmd) => protectionTable.addRow(cmd));
  schemasCommands.forEach((cmd) => schemasTable.addRow(cmd));
  warnsCommands.forEach((cmd) => warnsTable.addRow(cmd));
  
  /*
  console.log(adminTable.toString().bgBlack);
  console.log(blacklistTable.toString().brightCyan);
  console.log(emojisTable.toString().brightBlue);
  console.log(generalTable.toString().grey);
  console.log(infoTable.toString().grey);
  console.log(logsTable.toString().grey);
  console.log(protectionTable.toString().magenta);
  console.log(schemasTable.toString().red);
  console.log(warnsTable.toString().brightBlue);
*/
};