const { MessageEmbed, Discord, Util } = require('discord.js');
const { parse } = require("twemoji-parser");
module.exports = {
  name: "add-emoji",
  description: "اضافه الاموجي",
  aliases: ["add"],
  usage: `{prefix}add-emoji [emoji]`,
  examples: `{prefix}add-emoji`,
  type: "admin",
  run: async (client, message, args) => {

    //       const emoji = args[0];
    //       if (!emoji) return message.channel.send("Please give me a Vild Emoji!")
    //       var Msg = "" 
    //       emoji.forEach(a=>{

    //       let customemoji = Util.parseEmoji(a);

    //       if (customemoji.id) {
    //         const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
    //           customemoji.animated ? "gif" : "png"
    //         }`;
    //         const name = args.slice(1).join(" ");
    //         const m = message.guild.emojis.create(
    //           `${Link}`,
    //           `${name || `${customemoji.name}`}`);
    // console.log(m)
    //         Msg += `**Emoji Has Been Added! <${customemoji.animated ? "a" : ""}:${customemoji.name}:${customemoji.id}>**\n`
    //         return message.channel.send(`${Msg}`);

    //       } else {
    //         let CheckEmoji = parse(a, { assetType: "png" });
    //         if (!CheckEmoji[0])
    //          return message.channel.send("Please give me a Vild Emoji!")
    //         message.channel.send("You Can Use Normal Emoji Without Adding In Server!")
    //       }
    //     })

    const emoji = args.match(/<?(a)?:?(\w{2,32}) : (\d{17 ,19})>?/gi);
    if (!emoji.length) return message.channel.send("Please give me a Vild Emoji!")

    emoji.forEach(emoj => {
      let customemoji = Discord.Util.parseEmoji(emoj);

      if (customemoji.id) {
        const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${customemoji.animated ? "gif" : "png"}`;

        message.guild.emojis.create(
          `${Link}`,
          `${customemoji.name}`).then(emoji => {

            message.channel.send(`done add ${emoji.name}`)
          }).catch(() => message.channel.send("error"))
      
        }
      })
    }
}
