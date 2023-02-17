const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { MessageEmbed } = require("discord.js");

module.exports = async (client,oldMessage, newMessage) => {
    if(oldMessage.author.bot) return;
    if(!oldMessage.channel.type === 'dm') return;

   // let cha = await db.get(`channel_${oldMessage.guild.id}_messages`);
    var logChannel = oldMessage.guild.channels.cache.find(channel => channel?.name === "message-delete-edit");
     if(!logChannel) return;
     let messageUpdate = new MessageEmbed()
     .setAuthor({name: oldMessage.author.tag, iconURL: oldMessage.author.displayAvatarURL({ dynamic: true})})
     .setThumbnail(oldMessage.author.displayAvatarURL({ dynamic: true}))
     .setColor(`${oldMessage.guild.me.displayHexColor}`)
     .setDescription(`ارسلت رسالة من ${oldMessage.author.tag} وحذفت من شات ${oldMessage.channel}`)
     .addField(`الرسالة القديمه`,`${oldMessage}`)
     .addField(`الرسالة الجديده`,`${newMessage}`)
     .setTimestamp()
      .setFooter({text: "MESSAGE EDIT"})
     logChannel.send({embeds: [messageUpdate]});
}