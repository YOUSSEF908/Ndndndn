const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js")
const mutes = require("../schemas/mutes.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const pretty = require("pretty-ms");
const ms = require("ms")
module.exports = {
    name: "m",
    description: "",
    aliases: [""],
    usage: `{prefix}`,
    examples: `{prefix}`,
    type: "admin",
    run: async (client, message, args) => {

        /**time
         * اول شي بدك متغير لووقت تحفظ فيه الوقت وانت بدك وقت متغير حسب الاداري شو بده 
         * بدك يحفظ الوقت الي انت سويته في start AT
         * بعدين تتأكد ان تايم يحفظ 
         * استخدم فاكشن new Data 
         * 
         */

        let roles = await db.get(`role_${message.guild.id}_warns`);
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


        if (message.reference) {
            return message.channel.send(`:rolling_eyes: **I can't find this member**`)
        }
        let [userID, time = 0, ...reason] = message.content.split(/ +/g).slice(1);
        if (!userID) return message.channel.send("Please provide a user mention or id");
        if (time !== 0 && !(/[0-9][m|d|h|s|days]+/.test(time))) {
            reason = `${time}${reason.length ? (" " + reason.join(" ")) : ""}`.split(" ");
            time = 0;
        }
        if (!message.channel.guild) return;
        let user = message.mentions.members.first() || message.guild.members.cache.get(userID);
        if (!user) return message.channel.send(`:rolling_eyes: **I can't find this member**`)
        if (user.id === message.author.id) {
            return message.channel.send(`**You can not do yourself**`)
        }
        else if (user.id === client.user.id) {
            return message.channel.send(`**You can't work for me mute.**`)
        }

        if (!user.manageable) return message.channel.send(`**I can't mute this user.**`)
        if (user.roles.highest.position >= message.member.roles.highest.position)
            return message.channel.send(`**You can't mute this user.**`)
        let muteRole = message.guild.roles.cache.find(m => m.name === "Muted");

        if (!muteRole) return message.guild.roles.create({ name: "Muted", color: "#000000" })
        message.guild.channels.cache.forEach(async channel => {
            await channel.permissionOverwrites.create(muteRole, { SEND_MESSAGES: false });
        });
        message.guild.members.cache.get(user)
        user.roles.add(muteRole, `by: ${message.author.tag} - reasone: اضافه رول الميوت`);

         let timeNew = new Date().getTime();
        var prime = new mutes({
            guildId: message.guild.id,
            userId: user.user.id,
            startAt: time + timeNew,
            endAt: time,
            reason: reason
        });
        await prime.save({}, async err => {
            if (err) return console.error(err);
        });

        console.log(prime)
       
        message.channel.send(`<a:tlShutUp:868888268412960768> ${user.user.tag} **muted from the text**!`)

        // user send mute
        const embed = new Discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setTitle(`<a:tlShutUp:868888268412960768> You were Muted`)
            .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, format: "png" }) })
            .setDescription(`**Muted by**\n${message.author.tag}\n\n**Reason**\n${reason.length ? reason.join(" ") : "No Reason Provided"}\n\n**Duration**\n${time === 0 ? "Permanently" : pretty(ms(time), { verbose: true })}\n\n**Ends at**\n${prime[0] ? pretty(prime[0] - Date.now(), { verbose: true }) : "No End Mute"}`)
        user.send({ embeds: [embed] }).catch(() => { });


    }
}