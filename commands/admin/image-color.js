const { prefix, owner } = require("../../config.json");
const { MessageEmbed } = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = {
  name: "icolors",
  description: "اضافه وحذف خلفيه علبه اللوان",
  aliases: [""],
  usage: `{prefix}icolors add \`[imageURL]\``,
  examples: `{prefix}`,
  type: "admin",
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
    if(!img) return message.channel.send("Add image")

await db.set(`img_${message.guild.id}_colors`, img) // add image colors
    return message.channel.send(`Done add image colors`)
  }
  else if(dogeguild == "delete") {

    await db.delete(`img_${message.guild.id}_colors`) // delete image colors
    return message.channel.send(`Done delete image colors`)

}

  }
}