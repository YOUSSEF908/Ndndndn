const { MessageEmbed } = require("discord.js")
const fs = require("fs")
const { QuickDB } = require("quick.db");
const db = new QuickDB();;
module.exports = {
  name: "color",
  description: "اخذ لون",
  aliases: ["لون"],
  usage: `{prefix}color \`[number role]\``,
  examples: `{prefix}color 3`,
  type: "general",
  run: async (client, message , Discord) => {
 let args = message.content.split(" ").slice(1);
  if (!args[0]) return message.channel.send("Enter the color you want!");
 const allowedColors = ["1","2","3","4","5","6","7","8","9","10"];
    
  if (!allowedColors.includes(args[0]))
    return message.channel.send(
      "The color you selected doesn't exist or the role is not allowed to be given!"
    );
  let a = message.guild.roles.cache.find(
    (r) => r.name.toLowerCase() === `${args.join(" ").toLowerCase()}`
  );
  if (!a) return message.channel.send("Couldn't find that color role!");
  if (!a.editable)
    return message.channel.send("I don't have permissions to edit/give that role!");

  const memberRoles =[...message.member.roles.cache.values()]
  memberRoles.forEach((role) => {
    if (
      allowedColors.includes(role.name.toLowerCase()) &&
      args.join(" ").toLowerCase() !== role.name.toLowerCase()
    )
      if (message.member.roles.cache.find((r) => (r.id = role.id)))
        message.member.roles.remove(role).catch((err) => message.channel.send(err.message));
  });
 await message.member.roles.add(a).then(() => message.channel.send(`<@!${message.author.id}> **Color has been changed successfully.**`)).catch((err) => message.channel.send(err.message));

}
}