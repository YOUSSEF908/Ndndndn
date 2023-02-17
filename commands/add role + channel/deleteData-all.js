const { prefix, owner } = require("../../config.json");
const { MessageEmbed } = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = {
  name: "delete",
  description: "حذف قاعده البيانات تعيت الرتب",
  aliases: [""],
  memberPermissions: ['ADMINISTRATION'], // Member Permission Check
  usage: `{prefix}delete \`delete role command admin\``,
  examples: `{prefix}delete`,
 
  serverOwner: true, // Server Owner check

  type: "ownerShip",
  run: async (client, message,args) => {

    if (!owner.includes(message.author.id)) return
    let dogeguild = args[0];
    if(!dogeguild) return message.channel.send({ embeds: [new MessageEmbed()
      .setTitle("Add Role List")
      .setDescription(`\n${prefix}role\n${prefix}bans\n${prefix}mutes\n${prefix}clear\n${prefix}lock0\n${prefix}nickname\n${prefix}move\n${prefix}vkick\n${prefix}vmutes\``)
     .setFooter({text: `${prefix}delete all / delete [⬆]`})
      .setColor("BLURPLE")
    ]});

    if(dogeguild == "role") {
      
      await db.delete(`role_${message.guild.id}_role`) // role
      return message.react("✅")
    }

    else if(dogeguild == "bans") {
   
await db.delete(`role_${message.guild.id}_bnan`) // ban + kick
return message.react("✅")
}

    else if(dogeguild == "mutes") {
    
await db.delete(`role_${message.guild.id}_mutes`) // mute text
return message.react("✅")
}

    else if(dogeguild == "clear") {
    
   await db.delete(`role_${message.guild.id}_clear`) // clear message + clear message file
   return message.react("✅")
}

    else if(dogeguild == "lock") {
    
   await db.delete(`role_${message.guild.id}_lock`) // lock + unlock
   return message.react("✅")
}

    else if(dogeguild == "nickname") {
    
   await db.delete(`role_${message.guild.id}_nickname`) // mute text
   return message.react("✅")
}

    else if(dogeguild == "move") {
     
   await db.delete(`role_${message.guild.id}_move`) // move
   return message.react("✅")
}

    else if(dogeguild == "vkick") {
    
   await db.delete(`role_${message.guild.id}_vkick`) // vkick
   return message.react("✅")
     }

    else if(dogeguild == "vmutes") {
     
   await db.delete(`role_${message.guild.id}_vmute`) // vmute , vunmute
   return message.react("✅")
    }

    else if(dogeguild == "timeout") {
     
   await db.delete(`role_${message.guild.id}_timeoute`) // timeout
   return message.react("✅")
}

else if(dogeguild == "all") {
  await db.delete(`role_${message.guild.id}_role`) // role
  await db.delete(`role_${message.guild.id}_bnan`) // ban + kick
  await db.delete(`role_${message.guild.id}_clear`) // clear message + clear message file
  await db.delete(`role_${message.guild.id}_nickname`) // mute text
  await db.delete(`role_${message.guild.id}_vkick`) // vkick
  await db.delete(`role_${message.guild.id}_move`) // move
  await db.delete(`role_${message.guild.id}_lock`) // lock + unlock
  await db.delete(`role_${message.guild.id}_vmute`) // vmute , vunmute
  await db.delete(`role_${message.guild.id}_timeoute`) // timeout
  await db.delete(`role_${message.guild.id}_warns`) // warns
    
return message.react("✅")
}
  }
}