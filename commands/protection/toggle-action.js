const { prefix, owner } = require("../../config.json");
const { MessageEmbed , discord } = require("discord.js")
const alt = require("./../schemas/antialt.js");
module.exports = {
  name: "toggle-antialt",
  description: "تشغيل وايقاف حمايه التوكنات",
  aliases: [""],
  usage: `{prefix}toggle-user off/on`,
  examples: `{prefix}toggle-user`,
  DeveloperUser: true , // Developer User
  serverOwner: true, // Server Owner check
  type: "protection",
  run: async (client, message,args) => {
const guildDB = await alt.findOne({
    guildID: message.guild.id
});

  
  let choices = ["on", "off"]
  if(!args[0] || !choices.includes(args[0].toLowerCase())) return message.channel.send('That is not a valid choice! Options: on, off')
  
    alt.findOne({ guildID: message.guild.id }, async (err, data) => {
    if(!data){
        let newGuild = await new alt({
        guildID: message.guild.id,
        altDays: 3 /*86400000*/,
        allowedAlts: [],
        altAction: 'none',
        altToggle: args[0].toLowerCase(),
        notifier: false,
        })
      
        await newGuild.save()
        
        return message.channel.send('Successfully updated toggle anti alt!')
    }
    
    data.updateOne({
     altToggle: args[0].toLowerCase()
    })
    
          let choice;
  if(args[0].toLowerCase() === "on"){ 
    choice = "on" 
  }
  else if(args[0].toLowerCase() === "off") { 
    choice = "off" 
  }
    
    return message.channel.send('Successfully updated toggle anti alt!')

    }
    )

}}