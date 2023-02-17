const { prefix, owner } = require("../../config.json");
const { MessageEmbed , discord } = require("discord.js")
const alt = require("./../schemas/antialt.js");
module.exports = {
  name: "antialt-action",
  description: "تحديد طر + باند + لاشيء",
  aliases: ["anti-action"],
  usage: `{prefix}antialt-action [kick,ban,none]`,
  examples: `{prefix}antialt-action kick`,
  DeveloperUser: true , // Developer User
  serverOwner: true, // Server Owner check
  type: "protection",
  run: async (client, message,args) => {
    
         
    const guildDB = await alt.findOne({
        guildID: message.guild.id
    });
    
    
  
  let choices = ["none", "kick", "ban"]
  if(!args[0]) return message.channel.send('Please pick a choice! Options: none, kick, ban')

  if(!choices.includes(args[0].toLowerCase())) return message.channel.send('That is not a valid choice! Options: none, kick, ban')
  
   alt.findOne({ guildID: message.guild.id }, async (err, data) => {
              if(!data) {
            let newGuild = new alt({
            guildID: message.guild.id,
            altDays: 7,
            allowedAlts: [],
            altAction: args[1].toLowerCase(),
            altToggle: false,
            notifier: false,
            })
            
            await newGuild.save()
            .catch(err => { console.log( err ) })
            return message.channel.send('Successfully enabled alt action!')
          }
       alt.updateOne({
        altAction: args[0].toLowerCase()
      })

      return message.channel.send('Successfully updated alt action!')
    
  })
  }
}