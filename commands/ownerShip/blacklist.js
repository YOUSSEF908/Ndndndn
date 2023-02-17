const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const UserModel = require("../schemas/user.js");
const { prefix, owner } = require("../../config.json");

module.exports = {
  name: "blacklist",
  description: "بلاك ليست ل الاوامر العامه",
  aliases: ["bluser"],
  usage: `{prefix}blacklist`,
  examples: `{prefix}blacklist`,
  DeveloperUser: true , // Developer User
  serverOwner: true, // Server Owner check
  addUser: true , // add user
  type: "ownerShip",
  run: async (client, message) => {
    const [userId, ...args] = message.content
      .trim()
      .split(/ +/)
      .slice(1);
    if (!userId) return message.channel.send("Please provide a user id or mention");
    const user = message.mentions.users.first() || await client.users.fetch(userId).catch(() => {});
    if (!user) return message.channel.send("Couldn't find this user");
    let userData = await UserModel.findOne({ userId: user.id });
    if (!userData) userData = await UserModel.create({ userId: user.id });
    
    if (!userData.blocked) {
      try {
        userData.blocked = true;
        userData.markModified("blocked");
        userData.save();
        return message.channel.send(`Successfully added ${user.tag} to the block list`);
      } catch (err) {
        console.error(err);
        return message.channel.send("There was an error while trying to save the data, please try again later");
      }
    } else {
      // if (!userData.guilds.includes(server)) return message.channel.send("This user is not blocked in the provided server");
      try {
        userData.blocked = false;
        userData.markModified("blocked");
        userData.save();
        
        return message.channel.send(`Successfully removed ${user.tag} from the block list`);
      } catch (err) {
        console.error(err);
        return message.channel.send("There was an error while trying to save the data, please try again later");
      }
    }
  }
};