const { MessageEmbed } = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = {
  name: "role-info",
  description: "معلومات الرتبه",
  aliases:[""],
  usage: `{prefix}role-info \`[mention , id]\``,
  examples:`{prefix}role-info`,
  type: "admin",
run: async (client, message ,args) => {
  
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


 const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])

 if(!role) return message.reply('**This role is not available**');
  let perm = role.permissions.toArray()
  perm = perm.map(c => `\`${c}\``).join(", ");


    let ottawa = new MessageEmbed()
     .setTitle(message.guild.name)
      .setColor(role.hexColor)
    .setThumbnail(message.guild.iconURL({dynamic: true}))
    .addField('Name Role',role.name,true)
    .addField('ID Role',role.id,true)
    .addField('Created Role',role.createdAt.toLocaleString(),true)
    .addField('Color Role',role.hexColor,true)
   .addField('Number memberbRole',`${role.members.size}`,true)
  .addField('permissions',`${perm}` || `Nothing permissions`,true)
    .setFooter({text: message.author.tag, iconURL: message.author.avatarURL()});
    message.channel.send({embeds: [ottawa]});
  }
}