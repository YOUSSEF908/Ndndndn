const { guild } = require("../../config.json")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { MessageEmbed } = require("discord.js")
module.exports = async (client, oldEmoji, newEmoji) => {

  //let cha = await db.get(`channel_${oldEmoji.guild.id}_emojis`);
  var logChannel = oldEmoji.guild.channels.cache.find(channel => channel.name === "edit-emojis");
  if (!logChannel) return;

  const fetchedLogs = await oldEmoji.guild.fetchAuditLogs({
    limit: 1,
    type: 'Update_Emoji'
  });
  const Link = `https://cdn.discordapp.com/emojis/${oldEmoji.id}.${oldEmoji.animated ? "gif" : "png"}`

  const updateLog = fetchedLogs.entries.first();
  const emojilog = new MessageEmbed()
    .setTitle('Emoji Logs Update')
    .setColor(`${oldEmoji.guild.me.displayHexColor}`)
    .setThumbnail(updateLog.executor.avatarURL({ dynamic: true }))
    .addField(`By`, `${updateLog.executor.tag}`)
    .addField(`Name Emoji`, `:${oldEmoji.name}:`)
    .addField(`Old Emoji`, `:${updateLog?.changes[0]?.old}:`)
    .addField(`New Emoji`, `:${updateLog?.changes[0]?.new}:`)
    .setImage(Link)
    .addField(`link`, `${Link}`)
  logChannel.send({ embeds: [emojilog] })
}


