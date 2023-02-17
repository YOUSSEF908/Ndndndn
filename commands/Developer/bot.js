const { prefix, owner } = require("../../config.json");
const { MessageEmbed } = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const duration = require("moment-duration-format")
const moment = require("moment")
let os = require('os')
class GuildDetails {

    constructor(guild) {
        if (!guild) throw new Error('Invalid Guild');
        this.invite = async () => {
            let invite = await guild.channels.cache.filter(channel => channel.type == 'GUILD_TEXT').first().createInvite();
            return invite.url
        };
    }
}

module.exports = {
    name: "b",
    description: "show bot info",
    aliases: [""],
    usage: `{prefix}b \`guild - stats\``,
    examples: `{prefix}b guild\n{prefix}b stats`,
    DeveloperUser: true , // Developer User
    serverOwner: true, // Server Owner check
    addUser: true , // add user
    run: async (client, message,args) => {
  
        let check = await db.get(`add_${message.author.id}_users`);
    if(owner.includes(message.author.id) || check == true) {

        let dogeguild = args[0];
      if(!dogeguild) return message.channel.send({ embeds: [new MessageEmbed()
        .setDescription(`❌ **Please Provide Me guild Or stats Statement**`)
        .setColor('RED')
      ]});
      if(dogeguild == "guild") {
      let data = new Promise((resolve) => {
        let guilds = []
        client.guilds.cache.forEach(async (guild) => {

            let details = new GuildDetails(guild);
            let inviteURL = await details.invite();
            guilds.push({ name: guild.name, inviteURL });
            if (guilds.length == client.guilds.cache.size) resolve(guilds);
        });
    });

    let guilds_string = (await data).map(guild => `[${guild.name}](${guild.inviteURL})`).join('\n');

    let embed = new MessageEmbed()
    .setDescription(guilds_string)
    message.reply({ embeds: [embed] });
}
else if(dogeguild == "stats") {
    const duration = moment.duration(message.client.uptime).format(" D[d], H[h], m[m] , S[s]");
    let start = Date.now(); 
    
    let cstatus = client.user.presence.status;
    if(cstatus === 'dnd') cstatus = '<:DND:915276565598851103> | dnd'
    if(cstatus === 'idle') cstatus = '<:idel_1:911362493870407730> | idle'
    if(cstatus === 'offline') cstatus = '<:offline:915277370527711322> | offline'
    if(cstatus === 'online') cstatus = '<:online:915277128034025492> | online'
       
        message.reply({ embeds: [
          new MessageEmbed()
          .setTitle( "Loading...")
           .setColor("DARK_BUT_NOT_BLACK") ]}).then((m) => {
    
            let embed = new MessageEmbed()
    .setColor(message.guild.me.displayHexColor)
    .addField(`Status`, `${cstatus}`)
    .addField(`Mem Usage`,`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`)
    .addField(`Joined At`,`**\`${client.user.createdAt.getFullYear()}/${client.user.createdAt.getMonth()}/${client.user.createdAt.getDate()}\`**`)
    .addField(`Bot servers`, `\*${client.guilds.cache.size} *Servers*\n\*${client.users.cache.size} *Users*`)
    .addField(`Memory`,`\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}mb\``)
    .addField(`Ping`, `Time Taken: ${Date.now() - start} ms 📶 | 🟡 Not Bad\nWebsocket: ${client.ws.ping.toFixed(0)} ms 📶 | 🟢 Excellent`,true)
    .setFooter({text:`🕐 Uptime Bot : ${duration}`})
            m.edit({embeds : [embed]}).catch((e) => message.reply(e));
          });
}
    }
}
}