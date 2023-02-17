const { guild: guildData} = require('../../config.json');
const { MessageEmbed, Role, Permissions, Client } = require("discord.js");
const rolelog  = require("../../index.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = async (client, role) => {

  //  let id = await db.get(`add_${role.guild.id}_guilds`);
  //   if (role.guild.id == id) return


    /**
     @param {Role} role
     */

     //let cha = await db.get(`channel_${role.guild.id}_roles`);
     var logChannel = role.guild.channels.cache.find(channel => channel.name === "role-edit-all");

  if(!logChannel) return;

  const logs = await role.guild.fetchAuditLogs({
    limit: 1,
    type: "ROLE_DELETE"
  });

  const log = logs.entries.first(); // Fetches the logs and takes the last entry

    const roleCreateEmbed = new MessageEmbed()
      .setTitle("A Role Has Been Deleted")
      .setColor("AQUA")
      .setTimestamp()
      .setFooter(role.guild.name)

    if (log) { // If entry first entry is existing executes code
      roleCreateEmbed.setDescription(`The role \`${role.name}\` has been deleted by \`${log.executor.tag}\``)
      .setTitle('ROLE DELETE')
    .setThumbnail(log.executor.avatarURL({dynamic:true}))
.addField("Role Name:",`\`\`${role.name}\`\` (ID: ${role.id})`)
await logChannel.send({embeds: [roleCreateEmbed]})
  }
}