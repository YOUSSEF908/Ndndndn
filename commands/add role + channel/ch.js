const { prefix, owner } = require("../../config.json");
const { MessageEmbed } = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  name: "ch",
  description: "تحديد شات الحذف التلقائي",
  aliases: [""],
  memberPermissions: ['ADMINISTRATION'], // Member Permission Check
  usage: `{prefix}ch \`[add,delete + #chat]\``,
  examples: `{prefix}ch add #chat\n{prefix}ch delete`,
  owner: true, // Owner Only check
  serverOwner: true, // Server Owner check
  type: "ownerShip",
  run: async (client, message ,args) => {
     let check = await db.get(`add_${message.author.id}_users`);
     if(!check == true || !owner.includes(message.author.id)) return
 
 let dogeguild = args[0];
   if(!dogeguild) return message.channel.send({ embeds: [new MessageEmbed()
     .setDescription(`❌ **Please Provide Me add Or delete**`)
     .setColor('RED')
   ]})
   if(dogeguild == "add") {
    let args = message.content.split(" ");
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        if (channel.length == 0) {    
   return message.channel.send(`Please Mention the channel first`)
                
        } 
  const ad = await db.set(`channel_${message.guild.id}_clear`, channel);

  message.channel.send(`Channel is setup as <#${channel.id}>`)
     }
     if(dogeguild == "delete") {
         const de = await db.delete(`channel_${message.guild.id}_clear`);
         console.log(de) 
         message.react("✅")
     }
}
}