const { MessageEmbed, Channel } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = async (client, channel) => {
  
 // let cha = await db.get(`channel_${channel.guild.id}_channels`);
  var logChannel = channel.guild.channels.cache.find(channel => channel?.name === "channel-edit-all");
if(!logChannel) return;

    if (channel.type == "DM" || channel.type == "GROUP_DM") return

    const logs = await channel.guild.fetchAuditLogs({
      limit: 1,
      type: "CHANNEL_CREATE"
    })
    const log = logs.entries.first(); // Fetches the audit logs and takes the last entry of type "CHANNEL_CREATE"

    if (log) { // If log exists executes code and creates embed
      const channelCreateembed = new MessageEmbed()
        .setColor("AQUA")
        .setTitle(`A Channel Has Been Created`)
        .setTimestamp()
        .setFooter(channel.guild.name)
        .setDescription(`The channel ${channel} has been created by \`${log.executor.tag}\``)
        .addField("Type", `\`${channel.type.slice(6).toLowerCase().replaceAll("_", " ")}\``)

      if (channel.type !== "GUILD_CATEGORY") { // If type is different than category adds the parent
        channelCreateembed.addField("Parent category", channel.parentId ? `\`${channel.parent.name}\`` : "No parent channel")
      }
      await logChannel?.send({embeds: [channelCreateembed]})
    }
}
   