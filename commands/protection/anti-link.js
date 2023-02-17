const { prefix, owner } = require("../../config.json");
const { MessageEmbed } = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = {
    name: "anti-link",
    description: "حمايه روابط",
    aliases: ["link"],
    usage: `{prefix}anti-link off/on`,
    examples: `{prefix}anti-link`,
    DeveloperUser: true , // Developer User
    serverOwner: true, // Server Owner check
    type: "protection",
    run: async (client, message, args) => {

     if (!owner.includes(message.author.id)) return

     var msg2 = `> **The antilink is \`${args[0]}\` in your server **`
     var msg3 = `> **The antilink is \`${args[0]}\` in your server **`
     var msg5 = `> **please \`${prefix}anti-link on/off\` **`
     
     let dogeguild = args[0];
     if(!dogeguild) return message.channel.send({ embeds: [new MessageEmbed()
       .setDescription(`❌ **Please Provide Me \`on\` Or \`off\` Statement**`)
       .setColor('RED')
     ]})
 
     if(dogeguild == "on") {
     await db.set(`antilink_${message.guild.id}`, 'on');
   
     message.channel.send(msg2);
  
     } else if(dogeguild == "off") {
     await db.set(`antilink_${message.guild.id}`, 'off');

     message.channel.send(msg3);
} else {
     return message.channel.send(msg5);

     }
     }
     }