const { MessageEmbed } = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { prefix, owner } = require("../../config.json");
module.exports = {
    name: "message",
    description: "تحديد رساله الترحيب",
    aliases: [""],
    usage: `{prefix}message \`[message welcome]\``,
    examples: `{prefix}message wlc [user], invite: [inviter]`,
    DeveloperUser: true , // Developer User
    serverOwner: true, // Server Owner check
    type: "welcome",
    run: async (client, message) => {
        if (!owner.includes(message.author.id)) return

        let msg = message.content.split(' ').slice(1).join(' ');
        const mssg = new MessageEmbed()
        .setTitle(`**Type the welcome message**`)
        .setColor("DARK_NAVY")
        .setDescription('[user] : \`Mentions The User\`\n[username] : \`No Mentions The User\`\n[inviter] : \`Mentions The Inviter\`\n[invitername] : \`No Mentions The invite\`\n[sowner] : \`Mentions The Ownership\`\n[server] : \`Type The Server Name\`\n[count] : \`Shows the number of members\`')
        .addField('Example',`${prefix}massage wlc [user], invite: [inviter]`)
        if (!msg) return  message.channel.send({embeds: [mssg]});

const c = new MessageEmbed()
.setColor(message.guild.me.displayHexColor)
.setDescription(`<:true_1:885597001654370354> Welcome message selected :\n${msg}`)
 await message.channel.send({embeds: [c]})
 await db.set(`messagew_${message.guild.id}`, msg);
    }
}