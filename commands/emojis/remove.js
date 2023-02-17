const Discord = require('discord.js')

module.exports = {
  name: "remove",
  description: "حذف الاموجي من السيرفر",
  aliases:[""],
  usage: `{prefix}remove \`[emoji]\``,
  examples:`{prefix}remove`,
   type: "admin",
  run: async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) return; 
   if (!args[0]) return message.channel.send("emote is a required argument that is missing.");
  for(let i = 0; i < args.length; i++){
  let emo = args[i].match(/(?<=<?a?:?\w{2,32}:)\d{17,19}(?=>?)/gi)[0];
  if(emo){
  if (message.guild.emojis.cache.get(emo)) {
    emo = message.guild.emojis.cache.get(emo)
  
  if (emo.name && emo.id) {
     try {
       emo.delete()
       message.channel.send("**The Emoji has been removed**")
     } catch (err) {
       message.channel.send("❌ | **An Error occured**")
     }
    }
  }
  }
  }
  }
  } 