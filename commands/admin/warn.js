const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js")
const warns = require("../schemas/warns.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = {
    name: "warn",
    description: "",
  aliases:["تحذير"],
   usage: `{prefix}warn`,
  examples:`{prefix}warn`,
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

if (user.roles.highest.position >= message.member.roles.highest.position) 
return message.channel.send(`**You can't warn this user.**`)


const reason = args.slice(1).join(" ")
if(!reason) return message.channel.send("**add reason warn**")

if (reason){
var r = reason
} else {
var r = 'null'

}

warns.findOne({ gid: message.guild.id, user: user.user.id}, async(err, data) => {

if(err) throw err;
if(!data) {
data = new warns({
gid: message.guild.id,
user : user.user.id,
content : [
{
moderator : message.author.id,
reason : r
}
]
})
} else {
const obj = {
moderator: message.author.id,
reason : r
}
data.content.push(obj)
}
data.save()
});

message.channel.send(`<:true_1:885597001654370354> Warned ${user.user.tag} for ${r}`)

const warn = new MessageEmbed()
.setTitle("Warn <a:warn:899928249059115048>")
.setThumbnail(message.author.avatarURL({ dynamic: true}))
.setDescription(`By warn : ${message.author.tag}\nReason: ${r}`)
user.send({embeds: [warn]})


// let cha = await db.get(`channel_${message.guild.id}_warns`);
// var logChannel = message.guild.channels.cache.find(channel => channel.id === cha);
//   if(!logChannel) return;
//   const warnlog = new MessageEmbed()
//   .setTitle("Warn <a:warn:899928249059115048>")
//   .setColor("AQUA")
//   .setThumbnail(user.avatarURL({ dynamic: true}))
//   .setDescription(`User: ${user.user.tag}\nBy warn : ${message.author.tag}\nReason: ${r}`)
//   logChannel.send({embeds: [warnlog]})
  
}
}