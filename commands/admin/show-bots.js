const { prefix, owner } = require("../../config.json");
const { MessageEmbed } = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "show-bot",
    description: "اظهار بوتات السيرفر",
  aliases:["bots"],
   usage: `{prefix}bots`,
  examples:`{prefix}bots`,
   type: "admin",
    run: async (client, message) => {
      let check = await db.get(`add_${message.author.id}_users`);
      if(check == true || owner.includes(message.author.id)) {
  
     var list_all = [];
     message.guild.members.cache.forEach(bb => {
       if (!bb.user.bot) return;
       list_all.push(`<@${bb.user.id}>`);
     });

     message.reply({content: `${list_all.join(" , ")}`, allowedMentions: { repliedUser: false, parse: [] } });
   }
}
}