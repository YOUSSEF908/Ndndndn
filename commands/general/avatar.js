const { MessageEmbed, Discord } = require('discord.js');
const { QuickDB } = require("quick.db");
const db = new QuickDB();;
module.exports = {
    name: "avatar",
    description: "اظهار الافتار + السيرفر",
    aliases: ["افتار"],
    usage: `{prefix}avatar \`[user,id]\``,
    examples: `{prefix}avatar\n{prefix}avatar {member}\n{prefix}avatar server`,
    type: "general",
    run: async (client, message,args) => {
      let cha = await db.get(`channel_${message.guild.id}`);
        if (cha && !cha.includes(message.channel.toString())) return
        
      const embed = new MessageEmbed()
.setColor(message.member.displayHexColor)
.setTitle("Avatar Link")  
.setFooter({text: `Requested By ${message.author.username}`, iconURL: `${message.author.avatarURL({ dynamic: true , size:1024 })}`});

if (args[0]) {
  if(args[0] === "server") {
    embed.setURL(message.guild.iconURL({ dynamic: true , size: 1024, default: "png" }));
    embed.setImage(message.guild.iconURL({ dynamic: true , size: 1024, default: "png" }));
  } else {
    const user = message.mentions.users.first() || await client.users.fetch(args[0]).catch(() => {});
    if (!user) return message.channel.send("Please mention a user or provide a valid ID");
  
    embed.setTitle(`Avatar Link ${user.tag}`)
    embed.setURL(user.avatarURL({ dynamic: true , size: 1024, default: "png" }));
    embed.setImage(user.avatarURL({ dynamic: true , size: 1024, default: "png" }));
  }
} else {
  embed.setURL(message.author.avatarURL({ dynamic: true , size: 1024, default: "png" }));
  embed.setImage(message.author.avatarURL({ dynamic: true , size: 1024, default: "png" }));
}

message.reply({embeds: [embed]});
}
}

