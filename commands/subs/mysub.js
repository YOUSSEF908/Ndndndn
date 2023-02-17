const subc = require("../schemas/sub.js");
const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js")
const ms = require("ms");
const pretty = require("pretty-ms")
module.exports = {
  name: "mysub",
  description: "",
  aliases: [""],
  usage: `{prefix}mysub`,
  examples: `{prefix}mysub`,
  type: "subs",
  run: async (client, message, args) => {
    var user = message.mentions.users.first() || message.guild.members.cache.get(args[1]) || message.author;
    subc.find({ userId: user.id }, async (err, data) => {
      if (err) throw err;
      if (!data) {
        message.channel.send('User has no data')

      } else {
let wa = new Discord.MessageEmbed()
            .setFooter({ text: `${message.guild.name} time`, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setDescription("")
            .setColor(`#FDFDFD`)

for (i = 0; i < data.length; i++) {
        var Data = data[i],
         times =  pretty(Data.endAt - new Date());
    //    console.log(times)
          wa.description += `*\`#\`* ${i + 1} | ${Data.subs} | ${times}\n`
           }
          message.reply({ embeds: [wa] })
      }
    })
  }
}