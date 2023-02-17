const { Discord, MessageEmbed } = require("discord.js");
const { prefix } = require("../../config.json");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "setting",
    description: "جميع الاعدادات",
    aliases: [""],
    usage: `{prefix}setting`,
    examples: `{prefix}setting`,
   
    addUser: false , // add user
    type: "ownerShip",
    run: async (client, message, args) => {
        // DeveloperUser: true , // Developer User
        // serverOwner: true, // Server Owner check
if (!args[0]) return message.channel.send({ embeds: [
new MessageEmbed()
.setTitle("settings List")
.setDescription(`> ${prefix}setting all: \`show settings from user and auto role and channel\`\n> ${prefix}setting wlc: \`show settings welcome\`\n> ${prefix}setting prot: \`show settings protection\``)
.setColor("BLURPLE")
]});

        if (args[0] == "all") {
            let whitelist = await db.get(`whitelist`)
            let chat = await db.get(`channel_${message.guild.id}`);
            let autorole = await db.get(`autorole ${message.guild.id}`)
            var photo = await db.get(`img_${message.guild.id}_colors`)

            let data = await db.get(`voiceRoom ${message.guild.id} online`);

            //console.log(`user add ${whitelist}\n chat cmd ${chat}\n auto role ${autorole}\n image color ${photo}\n voice room ${data}`)

          const room = message.guild.channels.cache.get(`${data}`);
            const settings = new MessageEmbed()
                .setTitle("Settings")
                .setColor(`${message.guild.me.displayHexColor}`)
                .setThumbnail(message.guild.iconURL({ dynamic: true, format: "png" }))
                .setDescription(`user : ${whitelist?.map(x => `<@!${x || "Nothing user"}>`) || "None"}\nChannel: ${chat?.map(x => `<@!${x || "Nothing channel"}>`) || "None"}\nAuto role: <@&${autorole || " None"}>\nVoice Online: ${room}\nBackground Colors: ${photo || "None"}`)
                .setImage(photo)
                .setTimestamp()
      await message.reply({ embeds: [settings] })
        } 
        else if (args[0] == "wlc") {
            let on = await db.get(`togg_${message.guild.id}`);
            if (on === null) on = false;
            if (on == true) on = 'On';
            if (on == false) on = 'Off';
    let msg = (await db.get(`messagew_${message.guild.id}`)) ||'Welcome [username], invite: [inviter]';
    let ch = (await db.get(`channel_${message.guild.id}_wlc`)) || 'None';
    const settings = new MessageEmbed()
      .setTitle("Settings welcome")
    .setColor(message.guild.me.displayHexColor) 
    .setThumbnail(message.guild.iconURL({ dynamic: true, format: "png" }))
    .addField('Welcome Mode', `\`${on}\``)
    .addField('Welcome Channel', `${ch} | <#${ch}>`)
    .addField('Welcome Message', msg)
    .setTimestamp()
    await message.reply({ embeds: [settings] })
    
        }
        else if (args[0] == "prot") {
            let antilink = await db.get(`antilink_${message.guild.id}`) 
            if (antilink === null) antilink = false;
            if (antilink == true) antilink = 'On';
            if (antilink == false) antilink = 'Off';

            let antibot = await db.get(`anti_${message.guild.id}_bot`) 
            if (antibot === null) antibot = false;
            if (antibot == true) antibot = 'On';
            if (antibot == false) antibot = 'Off';
        const settings = new MessageEmbed()
        .setTitle("Settings")
        .setColor(message.guild.me.displayHexColor) 
        .setThumbnail(message.guild.iconURL({ dynamic: true, format: "png" }))
        .addField(`Anti Link`,`${antilink}`)
        .addField("Anti Bot",`${antibot}`)
        .setTimestamp()
    await message.reply({ embeds: [settings] })
        }
            }
        }