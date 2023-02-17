const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const UserModel = require("../schemas/user.js");
const {MessageEmbed} = require("discord.js")

module.exports = {
  name: "check-blacklist",
 description: "قائمه الاعضاء بلاك ليست",
  aliases: ["chblack"],
  usage: `{prefix}check-blacklist`,
  examples: `{prefix}check-blacklist`,
  DeveloperUser: true , // Developer User
  serverOwner: true, // Server Owner check
  addUser: true , // add user
  type: "ownerShip",
  run: async (client, message) => {

    const users = await UserModel.find({ blocked: true});
    if (!users.length)
      return message.channel.send("There isn't any user in the list for this server");

    const embed = new MessageEmbed()
      .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
      .setFooter({
        text: message.author.username,
        iconURL: message.author.avatarURL({ dynamic: true }) })
      .setTimestamp()
      .setColor(`${message.guild.me.displayHexColor}`)
      .setDescription(users.map((u) => client.users.cache.has(u.userId) ? client.users.cache.get(u.userId).tag : "Unknown User#0000"));
    message.channel.send({embeds: [embed]});
  }
};
