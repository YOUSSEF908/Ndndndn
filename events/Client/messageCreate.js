const Discord = require("discord.js")
const { owner, prefix } = require("../../config.json");
const UserModel = require("../../commands/schemas/user.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

// Event: messageCreate 
module.exports = async (client, message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;
  let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

  // Command User Permissions Check
  if (command?.memberPermissions && !message.member.permissions.has(command?.memberPermissions)) return message.channel.send({ content: `I need **\`${command.memberPermissions}\`** to use this command!` });

  // Bot Developer Permissions Commands
  if (command?.DeveloperUser === true && !owner.includes(message.author.id)) return message.channel.send({ content: `This command is only accessible by the owner bot.` }).catch(_ => { });

  // Server Owner Permissions Check
  if (command?.serverOwner === true && message.author.id !== message?.guild.fetchOwner().then(u => u?.id).catch(_ => { return }));

  //quick.db add user
//   let whitelist = await db.get(`whitelist`)
//   if (command?.addUser === true && whitelist) return message.channel.send({ content: `This command is only accessible by the users add` }).catch(_ => { });
// console.log("tm")
  if (!command) return;

  let userData = await UserModel.findOne({ userId: message.author.id });
  if (!userData) userData = await UserModel.create({ userId: message.author.id });
  if (userData.blocked) return message.channel.send("You're blocked");
  command.run(client, message, args, userData, { usage: command.usage });
}