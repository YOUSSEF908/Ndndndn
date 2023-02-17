const { Client, GuildBan, MessageEmbed } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = async (client, ban) => {
  
  //let cha = await db.get(`channel_${ban.guild.id}_GuildUser`);
  var logChannel = ban.guild.channels.cache.find(channel => channel.name === "ban-unban");
    if(!logChannel) return;

    const logs = await ban.guild.fetchAuditLogs({
        type: "MEMBER_BAN_REMOVE",
        limit: 1,
      });
      const log = logs.entries.first(); // Fetches the logs and takes the last entry of the type "MEMBER_BAN_REMOVE"
  
      if (log) { // If there is a corresponding entry creates the embed
        const memberBannedLogEmbed = new MessageEmbed()
          .setTitle("A Member Has Been Banned From the guild")
          .setColor("#00f5d4")// green
          .setThumbnail(log.executor.displayAvatarURL({ dynamic: true}))
          .setTimestamp()
          .setFooter(ban.guild.name)
          .setDescription(`The user \`${log.target.tag}\` has been unbanned from this guild by \`${log.executor.tag}\``);
  
        return await logChannel.send({embeds: [memberBannedLogEmbed]})// executes the function bellow with as parameter the embed name
      } else { // Else if nothing can be found in the audit logs executes code
        const memberBannedEmbed = new MessageEmbed()
          .setTitle("A Member Has Been Banned From the guild")
          .setColor("#00f5d4")// green
          .setTimestamp()
          .setFooter(ban.guild.name)
          .setDescription(`The user \`${ban.user.tag}\` has been unbanned from this guild`);
     await logChannel.send({embeds: [memberBannedEmbed]})
        }
    }  