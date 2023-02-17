const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const GuldModel = require("../schemas/guild.js");
const { prefix, owner } = require("../../config.json");

module.exports = {
    name: "guild",
    description: "حفظ ايدي السيرفر",
    aliases: [""],
    usage: `{prefix}guild \`[id]\``,
    examples: `{prefix}guild\n{prefix}guild \`id\``,
    DeveloperUser: true , // Developer User
    serverOwner: true, // Server Owner check
    addUser: true , // add user
    type: "ownerShip",
    run: async (client, message , args) => {
      let dogeguild = args[0];
      if(!dogeguild) return message.channel.send({ embeds: [new MessageEmbed()
        .setDescription(`❌ ${prefix}guild start`)
        .setColor('RED')
      ]})
   

   if(dogeguild == "start") {
    var prime = new GuldModel({
    GuildId: message.guild.id
   });
   await prime.save({}, async err => {
     if (err) return console.error(err);
   });
     return message.react("✅")
  
     } else if(dogeguild == "delete") {
await GuldModel.findOneAndDelete({  GuildId: message.guild.id })
return message.react("✅")
} else {
     return message.channel.send(`> **${prefix}guild \`start - delete\`**`);

     }
     }
     }