const { prefix, owner } = require("../../config.json");
const { MessageEmbed } = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = {
  name: "add",
  description: "اضافه رتب ل اوامر الادمن",
  aliases: [""],
  memberPermissions: ['ADMINISTRATION'], // Member Permission Check
  usage: `{prefix}add \`add role command admin\``,
  examples: `{prefix}add`,
  owner: true, // Owner Only check
  serverOwner: true, // Server Owner check
  type: "ownerShip",
  run: async (client, message,args) => {

    let dogeguild = args[0];
    if(!dogeguild) return message.channel.send({ embeds: [new MessageEmbed()
      .setTitle("Add Role List")
      .setDescription(`${prefix}role @role\n${prefix}bans @role\n${prefix}mutes @role\n${prefix}clear @role\n${prefix}lock @role\n${prefix}nickname @role\n${prefix}move @role\n${prefix}vkick @role\n${prefix}vmutes @role`)
     .setColor("BLURPLE")
    ]});

    if(dogeguild == "role") {
      const role = await [...message.mentions.roles.values()];
         if(!role.length == 1) return message.channel.send("Add role")
      
      await db.set(`role_${message.guild.id}_role`,role.map(x => x.id)) // role
      return message.channel.send(`Role Add Done ${role.map(x => x.name).join(",")}`)
          }

    else if(dogeguild == "bans") {
    const bans = await [...message.mentions.roles.values()];
   if(!bans.length == 1) return message.channel.send("Add role")

await db.set(`role_${message.guild.id}_bnan`,bans.map(x => x.id)) // ban + kick
return message.channel.send(`Role Add Done ${bans.map(x => x.name).join(",")}`)
    }

    else if(dogeguild == "mutes") {
      const mutes = await [...message.mentions.roles.values()];
   if(!mutes.length == 1) return message.channel.send("Add role")

await db.set(`role_${message.guild.id}_mutes`,mutes.map(x => x.id)) // mute text
return message.channel.send(`Role Add Done ${mutes.map(x => x.name).join(",")}`)
    }

    else if(dogeguild == "clear") {
      const clear = await [...message.mentions.roles.values()];
      if(!clear.length == 1) return message.channel.send("Add role")
   
   await db.set(`role_${message.guild.id}_clear`,clear.map(x => x.id)) // clear message + clear message file
   return message.channel.send(`Role Add Done ${clear.map(x => x.name).join(",")}`)
    }

    else if(dogeguild == "lock") {
      const lock = await [...message.mentions.roles.values()];
      if(!lock.length == 1) return message.channel.send("Add role")
   
   await db.set(`role_${message.guild.id}_lock`,lock.map(x => x.id)) // lock + unlock
   return message.channel.send(`Role Add Done ${lock.map(x => x.name).join(",")}`)
    }

    else if(dogeguild == "nickname") {
      const nickname = await [...message.mentions.roles.values()];
      if(!nickname.length == 1) return message.channel.send("Add role")
   
   await db.set(`role_${message.guild.id}_nickname`,nickname.map(x => x.id)) // mute text
   return message.channel.send(`Role Add Done ${nickname.map(x => x.name).join(",")}`)
    }

    else if(dogeguild == "move") {
      const move  = await [...message.mentions.roles.values()];
      if(!move.length == 1) return message.channel.send("Add role")
   
   await db.set(`role_${message.guild.id}_move`,move.map(x => x.id)) // move
   return message.channel.send(`Role Add Done ${move.map(x => x.name).join(",")}`)
    }

    else if(dogeguild == "vkick") {
      const vkick  = await [...message.mentions.roles.values()];
      if(!vkick.length == 1) return message.channel.send("Add role")
   
   await db.set(`role_${message.guild.id}_vkick`,vkick.map(x => x.id)) // vkick
   return message.channel.send(`Role Add Done ${vkick.map(x => x.name).join(",")}`)
    }

    else if(dogeguild == "vmutes") {
      const vmutes  = await [...message.mentions.roles.values()];
      if(!vmutes.length == 1) return message.channel.send("Add role")
   
   await db.set(`role_${message.guild.id}_vmute`,vmutes.map(x => x.id)) // vmute , vunmute
   return message.channel.send(`Role Add Done ${vmutes.map(x => x.name).join(",")}`)
    }

    else if(dogeguild == "timeout") {
      const timeout  = await [...message.mentions.roles.values()];
      if(!timeout.length == 1) return message.channel.send("Add role")
   
   await db.set(`role_${message.guild.id}_timeoute`,timeout.map(x => x.id)) // timeout
   return message.channel.send(`Role Add Done ${timeout.map(x => x.name).join(",")}`)
    }
    else if(dogeguild == "warn") {
      const role = await [...message.mentions.roles.values()];
         if(!role.length == 1) return message.channel.send("Add role")
      
      await db.set(`role_${message.guild.id}_warns`,role.map(x => x.id)) // role
      return message.channel.send(`Role Add Done ${role.map(x => x.name).join(",")}`)
          }

  }
}