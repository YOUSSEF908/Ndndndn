const ms = require("ms")
const moment = require("moment");
const prettyMS = require("pretty-ms");
const { MessageEmbed } = require("discord.js")

const { mongodb } = require("../../config.json");
const mongoose = require("mongoose");
const { Database } = require("quickmongo");
const db = new Database(mongodb);


module.exports = {
    name: "mute-userall",
    description: "اظهار جميع الاعضاء يلي عليهم ميوت",
  aliases:[""],
   usage: `{prefix}mute-user`,
  examples:`{prefix}mute-user`,
   type: "admin",
    run: async (client, message , args) => {
      if (roles?.length || roles) {
        let allowed = false;
        if (Array.isArray(roles) && roles?.length) {
          let roles = await db.get(`role_${message.guild.id}_mutes`);
            for (let i = 0; i < roles.length; i++) {
                if (message.member.roles.cache.get(roles[i])) allowed = true
            }
        } else {
            if (message.member.roles.cache.get(roles)) allowed = true
        }
    
        if (!allowed) return;
    } else if (!message.member.permissions.has("MUTE_MEMBERS")) return;

      const data = (await db.all()).filter((d) => d.ID.endsWith("_muteTime"));
      if (!data.length) return message.channel.send("There's no user muted currently");
      let r = [];
      // for (let d of data) {
      //   const userData = await client.users.fetch(d.ID.split("_")[1]).catch(() => {});
      //   if (userData) r.push(`${userData.tag} (${userData.id}) | ${prettyMS(d.data[0] - Date.now())} left\nReason: ${d.data[1].join(" ")}`);
      //   else r.push(`Unknown User#0000 | ${prettyMS(d.data[0])} left\nReason: ${d.data[1].join(" ")}`)
      // }
      const embed = new MessageEmbed()
      .setColor("DARKBLUE")
      //.setAuthor(message.author.tag, message.author.displayAvatarURL({ format: "png" }))
      .setTitle("Mute List")
      .setTimestamp();
      
      if (!args[0]) {
        await createData(data, r, client);
        embed.setDescription(r.join("\n\n  "));
        message.channel.send({embeds: [embed]});
      } else if (!isNaN(args[0])) {
        let pages = [];
        await createPages(pages, data);
        if ((args[0] > pages.length) || (args[0] < 1)) return message.channel.send("Please provide a valid page number");
        await createData(pages[args[0] - 1], r, client);
        embed.setDescription(r.join("\n\n"))
        .setFooter({text: `Page ${args[0]}/${pages.length}`});
        message.channel.send({embeds: [embed]})

      }
      
    }
  };
  
  async function createPages(array1, array2) {
    for (let i = 0; i < array2.length; i += 7) {
      array1.push(array2.slice(i, i + 7));
    }
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 500)
    })
          
  }
  
  async function createData(data, arr, client) {
        for (let d of data) {
        const userData = await client.users.fetch(d.ID.split("_")[1]).catch(() => {});
        if (userData) arr.push(`${userData.tag} (${userData.id}) | ${(d.data[0] === 0) ? "Permanently" : (prettyMS(d.data[0] - Date.now()) + " left")}\nReason: ${d.data[1].length ? d.data[1].join(" ") : "No Reason Provided"}`);
        else arr.push(`Unknown User#0000 | ${(d.data[0] === 0) ? "Permanently" : (prettyMS(d.data[0] - Date.now()) + " left")} left\nReason: ${d.data[1].length ? d.data[1].join(" ") : "No Reason Provided"}`)
      }
  }