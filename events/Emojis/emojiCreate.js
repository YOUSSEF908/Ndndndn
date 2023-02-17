const { guild } = require("../../config.json")
const { MessageEmbed } = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = async (client, emoji) => {

 // let cha = await db.get(`channel_${emoji.guild.id}_emojis`);
  var logChannel = emoji.guild.channels.cache.find(channel => channel.name === "edit-emojis");
if(!logChannel) return;
if (emoji.guild.id !== `${guild}`) return;
const fetchedLogs = await emoji.guild.fetchAuditLogs({
    limit: 1,
    type: 'Create_Emoji' });
    const Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${ emoji.animated ? "gif" : "png" }`
    
    const updateLog = fetchedLogs.entries.first();
    const emojilog = new MessageEmbed()
    .setTitle('Emoji Logs Add')
    .setColor(`${emoji.guild.me.displayHexColor}`)
    .setThumbnail(updateLog.executor.avatarURL({ dynamic: true}))
    .addField(`By`,`${updateLog.executor.tag}`)
    .addField(`name Emoji`,`:${emoji.name}:`)
    .setImage(Link)
    .addField(`link`,`${Link}`)
    logChannel.send({embeds: [emojilog]})

}
