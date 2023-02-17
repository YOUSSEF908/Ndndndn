const { Client, Message, MessageEmbed, MessageAttachment } = require("discord.js")
const axios = require("axios")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = {
  name: "avatar-banner",
  description: "اظهار البنر",
  aliases: ["بنر"],
  usage: `{prefix}avatar-banner \`[user,id]\``,
  examples: ``,
  type: "general",
  run: async (client, message, args) => {
    let cha = await db.get(`channel_${message.guild.id}`);
    if (cha && !cha.includes(message.channel.toString())) return

    const user = message.mentions.users.first() || await client.users.fetch(args[0]).catch(() => {}) || message.author;
     if (!user) return message.channel.send(`🙄 **Please provide a user mention/ID**`)

    axios.get(`https://discord.com/api/users/${user.id}`, {
      headers: {
        Authorization: `Bot ${client.token}`,

      },
    })


      .then(async (res) => {
        const { banner, accent_color } = res.data;

        if (banner) {
          const extension = banner.startsWith("a_") ? ".gif" : ".png"
          const url = `https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}?size=1024`
          const embed = new MessageEmbed()
            .setColor(message.member.displayHexColor)
            .setDescription(`${user.tag}'s avatar`)
            .setImage(url)
          message.reply({ embeds: [embed] })
        } else {

              function createBanner(color = user.user?.hexAccentColor) {
                var Canvas = require("canvas");
                var canvas = Canvas.createCanvas(1024, 512);
                var ctx = canvas.getContext("2d");
                ctx.fillStyle = color;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                return canvas.toBuffer();
            }
                
            await user.fetch()
            var banners = createBanner(user.user?.hexAccentColor)
            const attachment = new MessageAttachment(banners, 'color.png');
            const embed = new MessageEmbed()
                    .setColor(message.member.displayHexColor)
                    .setDescription(`${user.tag}'s avatar`)
                    .setImage(`attachment://color.png`)
                  message.reply({ embeds: [embed], files: [attachment] });
          
          
        
        }
      })
   
  },
};