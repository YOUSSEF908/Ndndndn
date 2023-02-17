const { prefix, owner } = require("../../config.json");
const { MessageEmbed } = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = {
  name: "auto-role",
  description: "اضافه رول تلقائي",
  aliases: [""],
  usage: `{prefix}auto-role\` @role/id\``,
  examples: `{prefix}auto-role @everyone`,
  DeveloperUser: true , // Developer User
  serverOwner: true, // Server Owner check
  addUser: true , // add user
  type: "ownerShip",
  run: async (client, message,args) => {
    // let check = await db.get(`add_${message.author.id}_users`);
    // if(check == true) {

const role = await message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) 
   if(!role) return message.channel.send("Add role")
  await db.set(`autorole ${message.guild.id}`, role.id)
 message.reply(`Auto Role is now ${role.name}`)
}
}