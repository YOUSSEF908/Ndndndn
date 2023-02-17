const moment = require("moment")
var m = require("ms")
const pretty = require("pretty-ms");
const { MessageEmbed, Discord } = require('discord.js');
const { prefix } = require('../../config.json');
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const wadi3 = new QuickDB();

var { inviteTracker } = require("discord-inviter") // npm i discord-inviter
 // tracker = new inviteTracker(client);

const emoji = {
    'PARTNERED_SERVER_OWNER': ' <:EmojisFromDrop:868888266189987910>',
    'HYPESQUAD_EVENTS': '<:Hypesquad_Events:868888272993128488> ',
    'HOUSE_BRILLIANCE': '<:HypeSquad_Brilliance:868888270187159552>',
    'HOUSE_BRAVERY': '<:HypeSquad_Bravery:868888273798463598> ',
    'HOUSE_BALANCE': '<:HypeSquad_Balance:868888268995985408>',
    'BUGHUNTER_LEVEL_2': '<:BugHunter_gold:868888270744993853>',
    'BUGHUNTER_LEVEL_1': '<:hunter:868888267691532348>',
    'EARLY_SUPPORTER': '<:Early_Supporter:868888269629292545> ',
    'EARLY_VERIFIED_DEVELOPER': '<:verifiedbotdev:868888266835894293> ',
    'DISCORD_EMPLOYEE': '<:DiscordStaff:868888265627955270>'
};

module.exports = {
    name: "user",
    description: "اظهار معلومات اليوزر",
    aliases: ["يوزر"],
    usage: `{prefix}user \`[user,id]\``,
    examples: `{prefix}user\n{prefix}user {member}`,
    type: "general",
    run: async (client, message) => {
        let cha = await db.get(`channel_${message.guild.id}`);
        if (cha && !cha.includes(message.channel.toString())) return
        
        let [userID, ...args] = message.content.split(/ +/g).slice(1);
        let member = message.mentions.members.first() || message.guild.members.cache.get(userID ? userID : message.author.id);
        if (member) {
            var lastSeen = await db.get(`${message.guild.id}_${member.user.id}_lastSeen`);

            var online = message.member.voice.channel
            let flags = member.user.flags.toArray().filter(f => emoji[f]).map(b => emoji[b]);
            if (!message.guild) return;

          //  const roles = member.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).slice(0, -1);
         const invite = await wadi3.get(`invv_${member.guild.id}_${member.id}`)
         var invites = await inviteTracker.getMemberInvites(member);
const statuses = {
    "online": "<:online:915277128034025492>",
    "idle": "<:idel_1:911362493870407730>",
    "dnd": "<:DND:915276565598851103>",
    "offline": "<:offline:915277370527711322>",
};
const status = `${statuses[member.presence?.status]} ${member.presence?.status}`
const activity = member.presence?.activities[0]
var userstatus = "No Custom";
if (activity) {
    if (member.presence?.activities[0].type === "CUSTOM") {
        let emoji = `${activity.emoji ? activity.emoji.id ? `<${activity.emoji.animated ? "a" : ""}:${activity.emoji.name}:${activity.emoji.id}>` : activity.emoji.name : ""}`
        userstatus = `${emoji} ${activity.state || 'No Custom'}`
    }
    else {
 userstatus = `${activity.type.toLowerCase().charAt(0).toUpperCase() + activity.type.toLowerCase().slice(1)} ${activity.name}`
    }
};

const embed = new MessageEmbed()
.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
.setColor(member.displayHexColor)
.setAuthor({name: `${member.user.tag}`, iconURL: member.user.displayAvatarURL({ dynamic: true, size: 512 })})
.setDescription(`Username: ${member.user.username}${member.user.discriminator}\nID: ${member.id}\nJoin Discord: ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).format('LT')} (\`${moment(member.user.createdTimestamp).fromNow()}\`)\nJoin Server: ${moment(member.joinedAt).format('LL LT')} (\`${moment(member.joinedAt).fromNow()}\`)`)
.addField("Invite",`invite By: ${invite ? `<@${invite}>` : "\`No invite\`"}\ninvites: ${invites.count} invite(s)`)
.addField("Othor :", `Flags: ${flags.join(", ") || "No Badges"}\nStatus: ${status}\nCustom Status: ${userstatus}`, true)
.addField(`${online ? `Online.` : `Last seen in voice.`}:`, lastSeen ? `<#${lastSeen.channel}> ${moment(lastSeen.time).fromNow()}` : `Not join a voice channel`)
.setFooter({text: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true })})

message.reply({embeds: [embed]})
        } else {
            member = await client.users.fetch(userID)
            const embed2 = new MessageEmbed()
                .setThumbnail(member.displayAvatarURL({ dynamic: true, size: 512 }))
                .setColor(message.member.displayHexColor)
                .setAuthor({name: `${member.tag}`, iconURL: member.displayAvatarURL({ dynamic: true, size: 512 })})
                .setDescription(`Username: ${member.username}${member.discriminator}\nID: ${member.id}\nJoin Discord: ${moment(member.createdTimestamp).format('LL')} ${moment(member.createdTimestamp).format('LT')} (\`${moment(member.createdTimestamp).fromNow()}\`)`)
                .addField(`Badges:`, member.flags.toArray().filter(f => emoji[f]).map(b => emoji[b]).join(", ") || `No Badges`)
                .setFooter({text: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true })})

            message.reply({embeds: [embed2]})
        }
    }
}