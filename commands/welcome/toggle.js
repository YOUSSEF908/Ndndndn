
const { MessageEmbed } = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();;
const { prefix, owner } = require("../../config.json");
module.exports = {
    name: "toggle",
    description: "تشغيل وايقاف الترحيب",
    aliases: ["tog"],
    usage: `{prefix}toggle`,
    examples: `{prefix}toggle`,
    DeveloperUser: true , // Developer User
    serverOwner: true, // Server Owner check
    type: "welcome",
    run: async (client, message,args) => {

  if (!owner.includes(message.author.id)) return
  let on = await db.get(`togg_${message.guild.id}`);
    message.channel.send(`> Welcome Mood : ${on ? '`Closed`' : '`Activated`'}`)
          await db.set(`togg_${message.guild.id}`, on ? false : true);

    }
}