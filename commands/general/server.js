const { MessageEmbed, Discord } = require('discord.js');
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const moment = require("moment")
module.exports = {
    name: "server",
    description: "اظهار معلومات السيرفر",
    aliases: ["سيرفر"],
    usage: `{prefix}server`,
    examples: `{prefix}server`,
    type: "general",
    run: async (client, message) => {
      // let cha = await db.get(`channel_${message.guild.id}`);
      // if (!cha || !cha.includes(message.channel.toString())) return message.channel.send(`Go To Room ${cha}`)
   
 var Bots = message.guild.members.cache.filter(Mem => Mem.user.bot)
 var roles = message.guild.roles.cache.map(r => `<@&${r.id}>`)
 
 var emojissize = message.guild.emojis.cache.size;
   var emojis = message.guild.emojis.cache.map(emoji => emoji.toString()).join(" ");
 
  let embed = new MessageEmbed()
  
  .setThumbnail (message.guild.iconURL({ dynamic: true}))
  .setColor('DARK_BUT_NOT_BLACK')
  .addField("Server Name:",`\`${message.guild.name}\``)
 .addField(`Server Owner:`,`<@!${message.guild.ownerId}>`)
 .addField("Server ID:",`\`${message.guild.id}\``)
 .addField(`Server Members [${message.guild.memberCount}]`,`\`Members: [${message.guild.memberCount}] | Bots: ${Bots.size}\``)
 .addField(`Server Emojis [${emojissize}]`, `\`Animated: ${message.guild.emojis.cache.filter((e) => e.animated).size} | Normal: ${message.guild.emojis.cache.filter((e) => !e.animated).size} | Stickers: ${message.guild.stickers.cache.size}\``, true)
 .addField(`Server Cateogory and Channels [${message.guild.channels.cache.size}]`,`\`Cateogory: ${message.guild.channels.cache.filter(c=> c.type === "GUILD_CATEGORY").size} | Text: ${message.guild.channels.cache.filter(c =>c.type === "GUILD_TEXT").size} | Voice ${message.guild.channels.cache.filter(c=>c.type === "GUILD_VOICE").size} | Threads: ${message.guild.channels.cache.filter((c) => c.type === "GUILD_NEWS_THREAD" && "GUILD_PRIVATE_THREAD" && "PUILD_PUBLIC_THREAD").size} | Stages: ${message.guild.channels.cache.filter((c) => c.type === "GUILD_STAGE_VOICE").size}\``)
 .addField("Server Boost Level",`\`${message.guild.premiumTier}\``)
 .addField(`Server Boosts Amount`,`\`${message.guild.premiumSubscriptionCount}\``)
 .addField(`Verification Level:`,`\`${message.guild.verificationLevel}\``)
 .addField(`Roles:`,`\`${message.guild.roles.cache.size}\``)
 .addField(`Created At:`,`\`${message.guild.createdAt.toLocaleString()} (${moment(message.guild.createdAt).fromNow()})\``)
 .setFooter({text: `Requested ${message.author.tag}`, iconURL: message.author.avatarURL()})
      .setTimestamp()
     return message.channel.send({embeds: [embed]});
  }
}