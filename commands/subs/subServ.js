const subcModel = require("../schemas/sub.js");
const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js")
const ms = require("ms")
module.exports = {
  name: "addvip",
  description: "",
  aliases: [""],
  usage: `{prefix}vip`,
  examples: `{prefix}vip`,
  type: "subs",
  run: async (client, message, args) => {

    var user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    if (!user) return message.channel.send("**Send userID **");

    if (!args[1]) return message.channel.send("**Send message to add the message **");

    if (!args[2])
      return message.channel.send("**Send subscribe type to add the time in database.**");

    let tt;

    if (args[3] == "30d") {
      tt = ms("30d");
    } else if (args[3] == "90d") {
      tt = ms("90d");
    }
    if (args[3] == "7d") {
      tt = ms("7d");
    } else if (args[3] == "3d") {
      tt = ms("3d");
    }

    let time = new Date().getTime();

    var prime = new subcModel({
      userId: user.id,
      subs: [args[1], args[2]],
      startAt: time,
      endAt: time + tt
    });
    await prime.save({}, async err => {
      if (err) return console.error(err);
    });
    //     console.log(prime)
    message.reply(`Done Add time sub **${args[3]}**`)
  }
}