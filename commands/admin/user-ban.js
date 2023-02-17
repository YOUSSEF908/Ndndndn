const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  name: "user-ban",
  description: "اظهار باند العضو",
  aliases:[""],
  usage: `{prefix}user-ban \`[id]\``,
  examples:`{prefix}user-ban`,
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
    if(!userID) return message.channel.send("add user command")
let user = message.mentions.users.first() || await client.users.fetch(userID).catch(() => {}); 
message.guild.bans.fetch(user.id).then(ban =>{
  let banslist = new MessageEmbed()
.setColor(`${message.guild.me.displayHexColor}`)
  .setDescription(`User: ${user.username}\nReason: ${ban.reason || "No Reason"}`)
 message.channel.send({embeds: [banslist]})
}) .catch(err => message.channel.send("Nothing ban user"))
}  
}