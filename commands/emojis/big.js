const discord = require("discord.js")
module.exports = {
    name: "big",
     description: "تكبير الاموجي",
    aliases: [""],
    usage: `{prefix}big [emoji]`,
    examples: `{prefix}big`,
    type: "admin",
    run: async(client, message, args) => {
   
      if (!args[0]) return message.channel.send("emote is a required argument that is missing.");
      var Msg = ""
    args.forEach(a=>{
  var emo = discord.Util.parseEmoji(a)
  if(emo.id){
    
   Msg += `Name: ${emo.name}\nLink: https://cdn.discordapp.com/emojis/${emo.id}.${emo.animated?"gif":"png"}\n`;
  }
  })
  message.channel.send(`${Msg}`)
  
  }
  } 