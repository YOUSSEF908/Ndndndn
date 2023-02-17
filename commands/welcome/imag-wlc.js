const { MessageEmbed } = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();;
const { prefix, owner } = require("../../config.json");
module.exports = {
    name: "image-wlc",
    description: "تحديد صوره الترحيب",
    aliases: [""],
    usage: `{prefix}image-wlc \`[image]\``,
    examples: `{prefix}image-wlc`,
    DeveloperUser: true , // Developer User
    serverOwner: true, // Server Owner check
    type: "welcome",
    run: async (client, message,args) => {

        let check = await db.get(`add_${message.author.id}_users`);
        if(!check == true && !owner.includes(message.author.id)) return
    
    let dogeguild = args[0];
      if(!dogeguild) return message.channel.send({ embeds: [new MessageEmbed()
        .setDescription(`❌ **Please Provide Me add Or delete**`)
        .setColor('RED')
      ]})
    
      if(dogeguild == "add") {
        const img = message.attachments.first() ? message.attachments.first().url : args[1]; 
        if(!img) return message.channel.send("Add image welcome")
    
    await db.set(`img_${message.guild.id}_wlc`, img) // add image welcome
        return message.channel.send(`Done add image welcome`)
      }
      else if(dogeguild == "delete") {
    
        await db.delete(`img_${message.guild.id}_wlc`) // delete image welcome
        return message.channel.send(`Done delete image welcome`)
    
    }
    
    }
}