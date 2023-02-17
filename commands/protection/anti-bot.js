
const { MessageEmbed } = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { prefix, owner } = require("../../config.json");
module.exports = {
    name: "anti-bot",
    description: "حمايه البوتات",
    aliases: ["bot"],
    usage: `{prefix}anti-bot off/on`,
    examples: `{prefix}anti-bot`,
    DeveloperUser: true , // Developer User
    serverOwner: true, // Server Owner check
    type: "protection",
    run: async (client, message,args) => {
      let check = await db.get(`add_${message.author.id}_users`);
      if(check == true || owner.includes(message.author.id)) {
  let dogeguild = args[0];
    if(!dogeguild) return message.channel.send({ embeds: [new MessageEmbed()
      .setDescription(`❌ **Please Provide Me on Or off Statement**`)
      .setColor('RED')
    ]})
    
    if(dogeguild == "on") {
      await db.set(`anti_${message.guild.id}_bot`, true)
return message.reply(`> **The antibot is on \`${args[0]}\` in your server **`)
  }
  else if(dogeguild == "off") {
    await db.set(`anti_${message.guild.id}_bot`, false)
    return message.reply(`> **The antibot is off \`${args[0]}\` in your server **`)
    }
   } else {
         message.channel.send(`> **please \`${prefix}anti-bot on/off\`**`); 
     }

}
}