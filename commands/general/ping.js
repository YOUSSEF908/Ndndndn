const { MessageEmbed } = require("discord.js")
const discord = require("discord.js")
const { prefix } = require('../../config.json'); 
const { QuickDB } = require("quick.db");
const db = new QuickDB();;
module.exports = {
  name: "ping",
  description: "بنق البوت وسرعه الاستجابه",
 aliases:[""],
 usage: `{prefix}ping`,
examples:`{prefix}ping`,
type: "general",
  run: async (client, message) => {
  
var ping = `${Date.now() - message.createdTimestamp}`
var api = `${Math.round(client.ws.ping)}`

message.reply({ embeds: [
  new MessageEmbed()
  .setTitle( "Loading...")
   .setColor("DARK_BUT_NOT_BLACK") ]}).then((m) => {

        let embed = new discord.MessageEmbed()
.setDescription(`\`Speed message: ${Date.now() - message.createdTimestamp}ms\`\n\`Discord Api: ${api}ms\`\n\`ping Bot: ${ping}ms\``)
      .setColor(message.guild.me.displayHexColor);
        m.edit({embeds: [embed]}).catch((e) => message.reply(e));
      });
  }
};