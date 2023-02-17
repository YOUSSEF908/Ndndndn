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
        type: "INVITE_CREATE"
      })
      const log = logs.entries.first(); // Fetches the logs and takes the last entry
  
      const inviteCreateEmbed = new MessageEmbed()
        .setTitle("A Invite Has Been Created To The Server")
        .setColor("#00f5d4")// green
        .setThumbnail(log.executor.displayAvatarURL({ dynamic: true}))
        .setTimestamp()
        .setFooter(invite.guild.name)
  
  
      if (log) { // If entry is existing executes code
        inviteCreateEmbed.setDescription(`An invite \`${invite.code}\` has been created by \`${log.executor.tag}\``)
          .addFields(
            {
              name: "Channel",
              value: `<#${invite.channelId}>`
            },
            {
              name: "Expires at",
              value: invite.maxAge != 0 ? `<t:${parseInt(invite.expiresTimestamp / 1000)}:R>` : "Never expires"
            },
            {
              name: "Maximum age",
              value: invite.maxAge != 0 ? `\`${ms(invite.maxAge * 1000)}\`` : "No limit"
            },
            {
              name: "Maximum uses",
              value: invite.maxUses != 0 ? `\`${invite.maxUses}\`` : "No max uses"
            }
          )
  
        if (invite.temporary) inviteCreateEmbed.addField("Temporary", `\`Yes\``) // If temporary membership add field
        }
        await logChannel.send({embeds: [inviteCreateEmbed]})
    }  