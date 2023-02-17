const { prefix, owner } = require('../../config.json');
const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'help',
  aliases: ["h"],
  run: async (client, message) => {
    var args = message.content.split(" ");
    if (args[1]) {
      var command = client.commands.find(c => c.name == args[1])
      var embed = new MessageEmbed()
      if (command) {
        embed
          .setTitle(`command: \`${command.name}\``)
          .setColor(message.guild.me.displayHexColor)
          .setDescription(`${command.description}`)
          .addField(`aliases:`, `${command.aliases}` || `No aliases`)
          .addField(`usage:`, `${command.usage.replace(/{prefix}/gi, `${prefix}`).replace(/{member}/gi, `${message.author}`)}`)
          .addField(`Example:`, `${command.examples.replace(/{prefix}/gi, `${prefix}`).replace(/{member}/gi, `${message.author}`)}`)
          .setFooter({ text: `Requested ${message.author.tag}`, iconURL: message.author.avatarURL({ dynamic: true }) })
          .setTimestamp();

      } else {
        embed.setDescription(`I can't find this command!`)
      }
      message.channel.send({ embeds: [embed] });
    } else {

      let embed = new Discord.MessageEmbed()
        .setTitle("HELP COMMAND")
        .setColor("LIGHT_GREY")
        .setDescription(`Welcome \`${message.author.tag}\` you are now on the list help`)
        .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
        .setFooter({ text: `${prefix}help [command]` });

      let admin = new Discord.MessageButton()
        .setStyle("SECONDARY")
        .setLabel("admin")
        .setCustomId('ADMIN')

      let protection = new Discord.MessageButton()
        .setStyle("SECONDARY")
        .setLabel("protection")
        .setCustomId('PROTECTION')

      let general = new Discord.MessageButton()
        .setStyle("SECONDARY")
        .setLabel("general")
        .setCustomId('GENERAL')

        let ownerShip = new Discord.MessageButton()
        .setStyle("SECONDARY")
        .setLabel("ownerShip")
        .setCustomId('OWNERSHIP')

        let welcom = new Discord.MessageButton()
        .setStyle("SECONDARY")
        .setLabel("welcome")
        .setCustomId('WELCOME')
  
        
      let row = new Discord.MessageActionRow()
        .addComponents([admin, general, protection, ownerShip,welcom])

      message.author.send({ embeds: [embed], components: [row] }).then(() =>
      message.react("✔").catch(err => message.react("❌")))
}
   
  }
}