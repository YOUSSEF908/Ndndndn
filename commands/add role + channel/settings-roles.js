const { prefix, owner } = require("../../config.json");
const { MessageEmbed } = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = {
  name: "settings-roles",
  description: "اظهار اعدادات الرتب",
  aliases: [""],
  usage: `{prefix}settings-roles`,
  examples: `{prefix}`,
 
  serverOwner: true, // Server Owner check
  type: "ownerShip",
  run: async (client, message,args) => {
  
    if (!owner.includes(message.author.id)) return
   
    let roleadd = await db.get(`role_${message.guild.id}_role`) // role
    let bans = await db.get(`role_${message.guild.id}_bnan`); // bans , kick  
    let mutes = await db.get(`role_${message.guild.id}_mutes`) // mute text
    let clears = await db.get(`role_${message.guild.id}_clear`) // clear message + clear message file
    let locks =  await db.get(`role_${message.guild.id}_lock`) // lock + unlock
    let nickname = await db.get(`role_${message.guild.id}_nickname`) // mute text
    let move = await db.get(`role_${message.guild.id}_move`) // move
    let vkick = await db.get(`role_${message.guild.id}_vkick`) // vkick
    let vmutes = await db.get(`role_${message.guild.id}_vmute`) // vmute , vunmute
    let timeout = await db.get(`role_${message.guild.id}_timeoute`) // timeout

    const settings = new MessageEmbed()
    .setTitle("Settings Roles")
    .setColor(`${message.guild.me.displayHexColor}`)
    .setThumbnail(message.guild.iconURL({ dynamic: true, format: "png" }))
    .addField(`Role , Role-info , Check`,`${roleadd?.map(roleadd => `<@&${roleadd || "Nothing Roles"}>`) || "None" }`)
    .addField(`Ban , Unban , Kick , user-ban , banlist`,`${bans?.map(value => `<@&${value || "Nothing Roles"}>`) || "None" }`)
    .addField(`Mute , Unmute , Mute-user`,`${mutes?.map(value => `<@&${value || "Nothing Roles"}>`)|| "None" }`)
    .addField(`Clear`,`${clears?.map(value => `<@&${value || "Nothing Roles"}>`) || "None" }`)
    .addField(`lock , Unlick`,`${locks?.map(value => `<@&${value || "Nothing Roles"}>`) || "None"}`)
    .addField(`Move`,`${move?.map(value => `<@&${value || "Nothing Roles"}>`) || "None"}`)
    .addField(`vkick`,`${vkick?.map(value => `<@&${value || "Nothing Roles"}>`)|| "None"}`)
    .addField(`Vmute , Vunmute`,`${vmutes?.map(value => `<@&${value || "Nothing Roles"}>`)|| "None" }`)
    .addField(`Timeout`,`${timeout?.map(value => `<@&${value || "Nothing Roles"}>`) || "None" }`)
    .addField(`NickName`,`${nickname?.map(value => `<@&${value || "Nothing Roles"}>`) || "None" }`)
    .setTimestamp()
   await message.channel.send({embeds: [settings]})
}
}
