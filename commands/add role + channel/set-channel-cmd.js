const { prefix, owner } = require("../../config.json");
const { MessageEmbed, Discord } = require('discord.js');
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "set",
    description: "تحديد شات الاوامر العامه",
    aliases: ["set"],
    memberPermissions: ['ADMINISTRATION'], // Member Permission Check
    usage: `{prefix}set \`#chat\``,
    examples: `{prefix}set-channel`,
   
    serverOwner: true, // Server Owner check
    type: "ownerShip",
    run: async (client, message,args) => {
     
     let check = await db.get(`add_${message.author.id}_users`);
     if(!check == true || !owner.includes(message.author.id)) {

          let dogeguild = args[0];
          if(!dogeguild) return message.channel.send({ embeds: [new MessageEmbed()
            .setTitle(`> ${prefix}set cmd \`[chat]\``)
            .setColor('RED')
          ]});
       
       if(dogeguild == "cmd") {

 let channel = [...message.mentions.channels.values()]

     if (channel.length == 0) {    
return message.channel.send(`Please Mention the channel first`)
             
     }
await db.set(`channel_${message.guild.id}`, channel.toString());
 message.channel.send(`Channel is setup as ${channel.join(", ")}`)

} else if(dogeguild == "delete") {
    const de = await db.delete(`channel_${message.guild.id}`);
    console.log(de)
     return message.react("✅")

}
     }
}
 }