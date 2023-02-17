const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js")
const warns = require("../schemas/warns.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "warn-list",
    description: "",
  aliases:["تحذيرات"],
   usage: `{prefix}warn-list`,
  examples:`{prefix}warn-list`,
   type: "warns",
    run: async (client, message , args) => {
        
        let roles = await db.get(`role_${message.guild.id}_warns`);
        if (roles?.length || roles) {
          let allowed = false;
          if (Array.isArray(roles) && roles?.length) {
              for (let i = 0; i < roles.length; i++) {
                  if (message.member.roles.cache.get(roles[i])) allowed = true
              }
          } else {
              if (message.member.roles.cache.get(roles)) allowed = true
          }
      
          if (!allowed) return;
      } else if (!message.member.permissions.has("MUTE_MEMBERS")) return;
  
  
var msg = "Member is not found."

var msg1 = "you are warn for"

var msg2 = "Requested By: "

 
 const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return  message.channel.send(msg);         
       warns.findOne({ gid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) throw err;
            if(!data) {
                message.channel.send('User has no data')
            
            } else {
                message.channel.send(data.content.map((w, i) => `\`${i + 1}\` | Moderator : ${message.guild.members.cache.get(w.moderator).user.tag}\nReason : ${w.reason}`).join("\n"))
                
            }
        })
    }
} 