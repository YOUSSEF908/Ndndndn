const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { MessageEmbed, Message, Client } = require("discord.js");

module.exports = async (client, message) => {

  //let cha = await db.get(`channel_${message.guild.id}_messages`);
  var logChannel = message.guild.channels.cache.find(channel => channel?.name === "message-delete-edit");
  if (!logChannel) return;

  const fetchedLogs = await message.guild.fetchAuditLogs({
    limit: 1,
    type: 'messageDelete'
  });
  const updateLog = fetchedLogs.entries.first();
  if (message.embeds[0]) {
    const newEmbed = new MessageEmbed(message.embeds[0]);
    logChannel.send({ content: `By : ${message.author.tag}\n<#${message.channel.id}>`, embeds: [newEmbed] });
  } else {

    let messageDelete = new MessageEmbed()
      .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      .setColor(`${message.guild.me.displayHexColor}`)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`أرسلت رسالة من ${message.author.tag} وحذفت من الشات من الشات ${message.channel}`)
      .addField(`الرسالة المحذوفه`, `${message.content.length ? message : "\`No Message\`"}`, false)
      .addField(`حذفت من قبل`, `${updateLog.executor.username}#${updateLog.executor.discriminator}`, false)
      .setTimestamp()
      .setFooter({ text: "MESSAGE DELETE 🗑" })

    /* if (message.attachments.first()) {
       messageDelete.embed({attachments: message.attachments.map(a => a.url)});
     }*/

    logChannel?.send({ embeds: [messageDelete], files: message.attachments.map(a => a) });
  }
}