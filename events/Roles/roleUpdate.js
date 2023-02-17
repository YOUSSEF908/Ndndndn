const { guild: guildData } = require('../../config.json');
const { MessageEmbed, Role, Permissions, Client } = require("discord.js");

const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = async (client, oldRole, newRole) => {

  // let id = await db.get(`add_${oldRole.guild.id}_guilds`);
  // if (oldRole.guild.id == id) return


  /**
    * @param {Role} oldRole
    * @param {Role} newRole
    * @param {Client} client
    */

  // let cha = await db.get(`channel_${oldRole.guild.id}_roles`);
  var logChannel = oldRole.guild.channels.cache.find(channel => channel.name === "role-edit-all");
  if (!logChannel) return;

  const logs = await oldRole.guild.fetchAuditLogs({
    limit: 1,
    type: "ROLE_UPDATE"
  });

  const log = logs.entries.first();
  const roleUpdateEmbed = new MessageEmbed()
    .setTitle('A Role Has Been Updated')
    .setColor(`${oldRole.guild.me.displayHexColor}`)
    .setThumbnail(log.executor.avatarURL({ dynamic: true }))
    .setTimestamp()
    .setFooter({ text: oldRole.guild.name, iconURL: oldRole.guild.iconURL({ dynamic: true }) })

  if (log) { // If entry first entry is existing executes code
    if (oldRole.permissions.bitfield !== newRole.permissions.bitfield) {
      roleUpdateEmbed.setDescription(`The Update Role of ${newRole} has been changed by \`${log.executor.tag}\``)
       if (!log) return logEmbed.setTitle(`Updat Role permissions ${changes[0].key === "$add" ? "Add" : "Remove"}`)
       roleUpdateEmbed.addField("permission", `${changes[0].key === "$add" ? "✅" : "⛔"} **${changes[0].new[0]}**`)
      if (target.id === newRole.id) {
        logChannel.send(logEmbed);
      } else return logChannel.send(roleUpdateEmbed.setDescription(`${newRole.user.username}'s roles were updated, but i coculdn't find by who.`));
    logChannel.send({ embeds: [roleUpdateEmbed] })
  }

  if (oldRole.name !== newRole.name) { // If name changed executes code
    roleUpdateEmbed.setDescription(`<:Discord_settings:907011748425502720> The name of ${newRole} has been updated by \`${log.executor.tag}\``)
      .addField("Old name", `${oldRole.name}`)
      .addField("New name", `${newRole.name}`)


    if (oldRole.color !== newRole.color) { // If color changed executes code
      roleUpdateEmbed.setDescription(`<:Discord_settings:907011748425502720> The color of ${newRole} has been updated by \`${log.executor.tag}\``)
        .addField("Old color", `${oldRole.color}`)
        .addField("New color", `${newRole.color}`)
    }
    if (oldRole.icon !== newRole.icon) { // If icon changed executes code
      roleUpdateEmbed.setDescription(`<:Discord_settings:907011748425502720> The icon of ${newRole} has been changed by \`${log.executor.tag}\``)
        .setImage(newRole.iconURL())
        .addField("Old icon", `${oldRole.icon ? `${oldRole.iconURL()}` : "No icon before"}`)
        .addField("New icon", `${newRole.icon ? `${newRole.iconURL()}` : "No new icon"}`)
    }
    await logChannel.send({ embeds: [roleUpdateEmbed] })
  }
}
}