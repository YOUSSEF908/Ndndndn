const moment = require("moment");
const prettyMS = require("pretty-ms");
const { MessageEmbed } = require("discord.js")
const { mongodb } = require("../../config.json");
const { Database } = require("quickmongo");
const db = new Database(mongodb);

const { QuickDB } = require("quick.db");
const dbq = new QuickDB();
module.exports = {
    name: "mute-user",
    description: "اظهار ميوت العضو",
  aliases:[""],
   usage: `{prefix}mute-user\n{prefix}mute-user [@user/id]`,
  examples:`{prefix}mute-user`,
   type: "admin",
    run: async (client, message , args) => {
        let roles = await dbq.get(`role_${message.guild.id}_mutes`);
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
      } else if (!message.member.permissions.has("MUTE_MEMBERS")) return;

      
        let [userID, time = 0, ...reason] = message.content.split(/ +/g).slice(1);
        let user = message.mentions.members.first() || message.guild.members.cache.get(userID);
        if(!userID) return message.channel.send(`🙄 **Please provide a user mention/ID**`)
    if(!user) return message.channel.send("مش ملاقيه")
    const data = await db.get(`${message.guild.id}_${user.id}_muteTime`)
    if(!data) return message.reply(`There is no mute this user \`${user.user.tag}\``)
  
    const embed = new MessageEmbed()
    .setColor('BLUE')
    .setTitle(`Mute Info \`${user.user.tag}\``)
    .setFooter({text: `${message.guild.name}`, iconURL: `${message.guild.iconURL({ dynamic: true, format: "png" })}`})
    .addFields(
    { name: "By Mute", value: message.author.tag, inline: false },
    { name: "Reason", value: data[1][0] ? data[1].join(" ") : "No Reason", inline: false })
    .addField("Time", `Use Command Mute: \`${moment(Date.now()).format("MM-DD-YYYY, HH:mm:ss A")}\` \nTime End Mute: \`${data[0] ? moment(data[0]).format("MM-DD-YYYY, HH<:mm:809365923068641300>ss A") :"No End Time"}\`\nEnds After: \`${data[0] ? prettyMS(data[0] - Date.now(), { verbose: true }) : "No End Mute"}\`\n`)  
    
    await message.reply({embeds: [embed]}).catch(() => {});

    }
}