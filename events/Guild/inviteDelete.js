const { MessageEmbed, Invite } = require("discord.js");
const ms = require("ms");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = async (client,invite) => {

  //let cha = await db.get(`channel_${invite.guild.id}_invites`);
  var logChannel = invite.guild.channels.cache.find(channel => channel?.name === "invite-log");
  if (!logChannel) return
 
    
    const logs = await invite.guild.fetchAuditLogs({
        limit: 1,
        type: "INVITE_DELETE"
      })
      const log = logs.entries.first(); // Fetches the logs and takes the last entry
  
      const inviteDeleteEmbed = new MessageEmbed()
        .setTitle("<:delete:975846841704915004> A Invite Has Been Deleted In The Server")
        .setColor("#ef233c") // red
        .setThumbnail(log.executor.displayAvatarURL({ dynamic: true}))
        .setTimestamp()
        .setFooter(invite.guild.name)
  
  
      if (log) { // If entry is existing executes code
        inviteDeleteEmbed.setDescription(`An invite \`${invite.code}\` has been deleted by \`${log.executor.tag}\``)
          .addField("Channel", `<#${invite.channelId}>`)
      }
      await logChannel.send({embeds: [inviteDeleteEmbed]})
    }  