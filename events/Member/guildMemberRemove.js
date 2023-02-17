const { MessageEmbed, GuildMember } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = async (client, member) => {

//let cha = await db.get(`channel_${member.guild.id}_GuildUser`);
var logChannel = member.guild.channels.cache.find(channel => channel.name === "ban-unban");
if(!logChannel) return;

    const logs = await member.guild.fetchAuditLogs({
        limit: 1,
      })
      const log = logs.entries.first(); // Fetches the logs and takes the last entry
  
      const memberLeftEmbed = new MessageEmbed()
        .setTitle("A Member Left the guild")
        .setColor("RED")
        .setTimestamp()
        .setFooter(member.guild.name)
  
      if (log.action == "MEMBER_KICK") { // If the last entry fetched is of the type "MEMBER_KICK" it means the member got prunned out of the server
        memberLeftEmbed.setDescription(`The member \`${log.target.tag}\` has been kicked from this guild by \`${log.executor.tag}\``)
        if (log.reason) memberLeftEmbed.addField("Reason:", `\`${log.reason}\``)
  
      } else if (log.action == "MEMBER_PRUNE") { // If the last entry fetched is of the type "MEMBER_PRUNE" it means the member got prunned out of the server
        memberLeftEmbed.setDescription(`The member \`${log.target.tag}\` has been prunned from this guild by \`${log.executor.tag}\``)
        if (log.reason) memberLeftEmbed.addField("Reason:", `\`${log.reason}\``)
        return await logChannel.send({embeds: [memberLeftEmbed]})
      }
}