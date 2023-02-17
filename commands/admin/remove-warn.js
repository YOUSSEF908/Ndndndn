const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js")
const warns = require("../schemas/warns.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = {
    name: "removewarn",
    description: "",
  aliases:[""],
   usage: `{prefix}removewarn`,
  examples:`{prefix}removewarn`,
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
 const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send('User not found.')

        if (user.roles.highest.position >= message.member.roles.highest.position) 
        return message.channel.send(`**You can't warn this user.**`)
        

      if(!args[1] || isNaN(+args[1])) {
        await warns.findOneAndDelete({ gid : message.guild.id, user: user.user.id})
              return message.channel.send(`All warnings removed !`);
        }
    warns.findOne({ gid : message.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                data.content.splice(Number(args[1]) -1, 1)
                message.channel.send('deleted the warn')
                data.save()
            } else {
                message.channel.send('This user does not have any warns in this server!')
            }
        })
  }
}