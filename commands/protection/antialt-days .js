const { prefix, owner } = require("../../config.json");
const { MessageEmbed , discord } = require("discord.js")
const alt = require("../schemas/antialt.js");
module.exports = {
  name: "antialt-days",
  description: "تحديد مده الحساب",
  aliases: [""],
  usage: `{prefix}antialt-days [1 DAY]`,
  examples: `{prefix}antialt-days 10 days`,
  DeveloperUser: true , // Developer User
  serverOwner: true, // Server Owner check
  type: "protection",
  run: async (client, message,args) => {
    const guildDB = await alt.findOne({
        guildID: message.guild.id
    });

      

      let days = args[0]
      if(!days) return message.channel.send('Please specify the amount of days!')
      if(isNaN(days)) return message.channel.send('That is not a valid number!')
   
    let day = Number(days)
    
    if(day > 100) return message.channel.send('You can only have up to 100 days!')


     alt.findOne({
      guildID: message.guild.id
    }, async (err, data) => {
      if(!data) {
            let newGuild = new alt({
            guildID: message.guild.id,
            altDays: days,
            allowedAlts: [],
            altAction: 'none',
            altToggle: false,
            notifier: false,
            })
            
            await newGuild.save()
            .catch(err => { console.log( err ) })
            
            return message.channel.send(`Successfully set the amount of days to \`${day}\``)

      }
      
       data.updateOne({
        altDays: day,
      })
      
      message.channel.send(`Successfully set the amount of days to \`${day}\``)
    })



  }
}