const { MessageEmbed } = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();;
const { prefix, owner } = require("../../config.json");
module.exports = {
    name: "channel-wlc",
    description: "تحديد الشات الترحيب",
    aliases: [""],
    usage: `{prefix}channel-wlc \`[#chat , ID]\``,
    examples: `{prefix}channel-wlc`,
    DeveloperUser: true , // Developer User
    serverOwner: true, // Server Owner check
    type: "welcome",
    run: async (client, message,args) => {

if (!owner.includes(message.author.id)) return
let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
if (!channel) {
return message.channel.send(`> **Please Mention the channel first**`)

}
await db.set(`channel_${message.guild.id}_wlc`, channel.id);
await db.set(`togg_${message.guild.id}`, true);
message.channel.send(`<:true_1:885597001654370354> **Channel is setup as ${channel}**`)

    }
}