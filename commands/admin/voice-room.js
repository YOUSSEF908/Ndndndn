const fs = require("fs");
const moment = require("moment");
const ms = 'ms';
const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "voice-room",
  description: "اظهار الاعضاء يلي بروم الصوتي",
 aliases:["voice"],
 usage: `{prefix}adminroom \`[voice]\``,
examples:`{prefix}adminroom`,
 type: "admin",
run: async (client, message,args) => {
// var Rid = "838867376891363348";
var Rbot = await message.guild.members.cache.filter(c => c.user.bot && c.voice.channel);

var Ruser = await message.guild.members.cache.filter(c => !c.user.bot && c.voice.channel);

var Msg = "";
if (Ruser && Ruser.size > 0) {
  Msg += `\nUsers:\n${Ruser.map(a => a).join(",\n")}`
}

if(Rbot && Rbot.size > 0){
  Msg += `\nBots:\n${Rbot.map(a => a).join(",\n")}`
}
if(Msg.length > 0){
  const voice = new MessageEmbed()
  .setColor("AQUA")
  .setTimestamp()
.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
.setTitle("Members in voice:")
.setDescription(Msg)
message.channel.send({embeds: [voice]})


}else{
message.channel.send(`> **No member voice.**`);
}
}
}