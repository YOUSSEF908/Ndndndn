const { guild: guildData } = require('../../config.json');
const { MessageEmbed, Role, Permissions, Client } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = async (client, role) => {

  // let id = await db.get(`add_${role.guild.id}_guilds`);
  // if (role.guild.id == id) return


  /**
    @param {Role} role
    */
  //  let cha = await db.get(`channel_${role.guild.id}_roles`);

  var logChannel = role.guild.channels.cache.find(channel => channel.name === "role-edit-all");
  if (!logChannel) return;
 
   const logs = await role.guild.fetchAuditLogs({
    limit: 1,
    type: "ROLE_CREATE"
  })
  const log = logs.entries.first(); // Fetches the logs and takes the last entry

  const roleCreateEmbed = new MessageEmbed()
    .setTitle("A Role Has Been Created")
    .setColor(`${role.guild.me.displayHexColor}`)
    .setTimestamp()
    .setFooter({ text: role.guild.name })


  if (log) { // If entry first entry is existing executes code
    roleCreateEmbed.setDescription(`<:Discord_settings:907011748425502720> The role \`${role.name}\` has been created by \`${log.executor.tag}\``)
      .addField("Color", `\`${role.color}\``)
      .addField("Hoisted", `${role.hoist ? "\`Yes\`" : "\`No\`"}`)
      .addField("Mentionable", `${role.mentionable ? "\`Yes\`" : "\`No\`"}`)
      .addField("Position", `\`${role.position - 1}\``)

    if (role.permissions.bitfield !== "0") { // If bitfield of allowed permissions is different than 0 (null) maps all the allowed permissions
      const p = new Permissions(role.permissions.bitfield).toArray().slice(" ").map(e => `\`${e}\``).join(", \n").toLowerCase().replaceAll("_", " ");
    //  roleCreateEmbed.addField("Permissions", p)
    }
    await logChannel.send({ embeds: [roleCreateEmbed] })
  }
}