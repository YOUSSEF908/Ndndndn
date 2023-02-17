const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = {
  name: "banlist",
  description: "اظهار قائمه الباند",
  aliases:["bans"],
  usage: `{prefix}banlist \`[id]\``,
  examples:`{prefix}banlist`,
  type: "admin",
run: async (client, message,args) => {
  let roles = await db.get(`role_${message.guild.id}_bnan`);
  if (roles?.length || roles) {
    let allowed = false;
    if (Array.isArray(roles) && roles?.length) {
        for (let i = 0; i < roles.length; i++) {
            if (message.member.roles.cache.get(roles[i])) allowed = true
        }
    } else {
        if (message.member.roles.cache.get(roles)) allowed = true
    }

    if (!allowed) return;
} else if (!message.member.permissions.has("BAN_MEMBERS")) return;
  
    let [userID, ...reason] = message.content.split(/ +/g).slice(1);
let user = message.mentions.users.first() || await client.users.fetch(userID).catch(() => {});
  message.guild.bans.fetch().then(bans=>{
let userBnas = bans.map(user => `**-- ${user.user.tag} , \`${user.user.id}**\nReason: ${user.reason || "No reason"}`).join(",\n\n")
if(!userBnas) return message.channel.send("No bans in this server")

  message.channel.send(`All Ban **${bans.size}**`)
 message.channel.send({content: `${userBnas}`});
   })
}
}