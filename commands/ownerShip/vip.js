const { MessageEmbed , Discord} = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { prefix, owner } = require("../../config.json");

module.exports = {
  name: "vip",
  description: "Edit \`[restart / name / avatar / stats]\`",
  aliases: [""],
  usage: `{prefix}vip`,
  examples: `{prefix}vip`,
  type: "subs",
  run: async (client, message, args) => {
    let dogeguild = args[0];
    if (!dogeguild) return message.channel.send({
      embeds: [new MessageEmbed()
        .setTitle(`${prefix}vip \`[restart / name / avatar / stats]\``)
        .setColor('RED')
      ]
    });

    if (dogeguild == "restart") {

      try {

        message.channel.send("**جاري اعاده التشغيل**...").then(msg => {
          setTimeout(function () {
            msg.edit("**تم اعاده التشغيل**");
          }, 10000);
        })
          .then(client.destroy())
          .then(client.login(token))
      } catch (e) {
        message.channel.send(`ERROR: ${e.message}`)

      }

    } else if (dogeguild == "avatar") {
     

        let Attachment = message.attachments.size > 2 ? message.attachments.array()[2].proxyURL : null
        const i = message.content.split(" ").slice(2).join(" ");
        if (!Attachment && !i.startsWith("https://") && !i.startsWith("http://")) return message.channel.send(`> 🚫 **${prefix}avatar <url - image>**`)
        if (i.startsWith("https://") || i.startsWith("http://")) {
          client.user.setAvatar(i).then(i => {
            message.channel.send("Done | This is New Avatar bot")
          }).catch(error => {
            if (error.code == Discord.Constants.APIErrors.INVALID_FORM_BODY) {
              message.channel.send("You are changing your avatar too fast. Try again later.")
            } else if (error.code !== Discord.Constants.APIErrors.INVALID_FORM_BODY) {
              message.channel.send("Something has gone wrong")
            }
          })
          return;
        } else if (Attachment) {
          client.user.setAvatar({ files: message.attachments.first().url }).then(i => {
            message.channel.send("Done | This is New Avatar bot")
          }).catch(error => {
            if (error.code == Discord.Constants.APIErrors.INVALID_FORM_BODY) {
              message.channel.send("You are changing your avatar too fast. Try again later.")
            } else if (error.code !== Discord.Constants.APIErrors.INVALID_FORM_BODY) {
              message.channel.send("Something has gone wrong")
            }
          })
          return;
        }

    } else if (dogeguild == "name") {
      let check = await db.get(`add_${message.author.id}_users`);
      if (check == true || owner.includes(message.author.id)) {

        if (!args) return
       const name = client.user.setUsername(args[1].join(" "))
        message.channel.send(`> **${client.user.username}** name has been channged to **${name}**`)
      }

    } else if (dogeguild == "stats") {
      let play = new Discord.MessageButton()
        .setCustomId("playing")
        .setLabel("playing")
        .setStyle("SECONDARY")

      let strem = new Discord.MessageButton()
        .setCustomId("strem")
        .setLabel("streming")
        .setStyle("SECONDARY")

      let listeing = new Discord.MessageButton()
        .setCustomId("lisin")
        .setLabel("listing")
        .setStyle("SECONDARY")

      let watch = new Discord.MessageButton()
        .setCustomId("watc")
        .setLabel("watching")
        .setStyle("SECONDARY")

      const row = new Discord.MessageActionRow()
        .addComponents(play, strem, listeing, watch)

      const sts = new MessageEmbed()
        .setColor("DARK_BLUE")
        .setDescription("Change to new stats")
      message.reply({ embeds: [sts], components: [row] });

    }

  }
}