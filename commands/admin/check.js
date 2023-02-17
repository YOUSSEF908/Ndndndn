const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = {
    name: "check",
    description: "اظهار يلي موجودين ب الرتبه",
  aliases:[""],
   usage: `{prefix}check`,
  examples:`{prefix}check`,
   type: "admin",
    run: async (client, message) => {
      let roles = await db.get(`role_${message.guild.id}_role`);
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
    } else if (!message.member.permissions.has("MANAGE_ROLES")) return;
  
const args = message.content.split(" ").slice(1).join(' ');
if (!args) {
message.reply(`Add Role ID,@role`)
}
const role = message.mentions.roles.first() || message.guild.roles.cache.get(args) || message.guild.roles.cache.find(r=> r.name == args);
if(!role) return
var members = role.members.map(m => `<@!${m.user.id}> - **${m.user.tag}**`);
message.channel.send(`Member Number \`${members.length}\``)
await message.channel.send(members.length ? `${members.join("\n")}`: "> **No one has this role**", { split: true });
}
}