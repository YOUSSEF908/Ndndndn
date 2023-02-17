const { prefix, owner } = require("../../config.json");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = {
    name: "dm",
    description: "send dm user message",
    aliases:[""],
    usage: `{prefix}dm @user message`,
    examples:`{prefix}dm`,
    DeveloperUser: true , // Developer User
    serverOwner: true, // Server Owner check
    run: async (client, message,args) => {


if (message.author.bot || !message.guild) return;
let argument = message.content.split(' ').slice(2).join(' ');

let member = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

if (!member) return message.reply({ content: '❌ Please mentione someone' });

if (!argument) return message.reply({ content: '❌ Please enter the argument' });

member.send({ content: `${argument}` }).then(() => message.reply({ content: '✅ | Done send the message' })).catch(() => message.reply({ content: '❌ The dm of this member is closed' }));
        }
}
