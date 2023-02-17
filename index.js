const { Client, Collection } = require('discord.js');
const discord = require('discord.js');
const Discord = require('discord.js');
const client = new Discord.Client({
  intents: new Discord.Intents(32767),
  restTimeOffset: 0,
  allowedMentions: { parse: ["everyone", "roles", "users"], repliedUser: false }, partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"]
});

var { inviteTracker } = require("discord-inviter"), // npm i discord-inviter
  tracker = new inviteTracker(client);

require('events').EventEmitter.defaultMaxListeners = 100;
const ms = require("ms");
const fs = require("fs");
var colors = require('colors');
const wait = require('util').promisify(setTimeout);
const invites = {};
const moment = require("moment");
const pretty = require("pretty-ms");
const Canvas = require('canvas');
const { setInterval } = require('timers');
const config = require("./config.json");
const { prefix, token, mongodb, owner } = require("./config.json");


// Quick.db 
const { QuickDB } = require("quick.db");
const wadi3 = new QuickDB();
const dbq = new QuickDB();

// QuickMongo 
const { Database } = require("quickmongo");
const dbm = new Database(mongodb);
dbm.connect();
dbm.on("ready", () => {
  console.log("Connected to the database".magenta)
});

//mongoose
const mongoose = require("mongoose");
mongoose.connect(mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) throw err;
  console.log("Connect to mongoose".magenta);
})

//Event: ready
client.on("ready", async () => {
  console.log(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`.bgGreen)
  console.log(`${moment().format("hh:mm").cyan} | ${client.user.tag} is ready`.magenta)
  client.user.setPresence({ activities: [{ name: "مالو هاظ", type: "STREAMING", url: "https://www.twitch.tv/vice-stor" }] });
  client.user.setStatus("online")
  // subs
  const subc = require("./commands/schemas/sub");
  setInterval(async () => {
    let ss = await subc.find({});
    ss.map(async p => {
      var member = await client.users.fetch(p.userId);

      var timeend = 18000000;// 5h
      if (new Date().getTime() - p.endAt >= timeend) {
        member.send("خمس ساعات وينتهي اشتراكك افتح تكت لتجديد");

        let chat = client.channels.cache.get("")

        let waa = new Discord.MessageEmbed()
          .setTitle("end sub")
          .setAuthor({ name: `${member.username}`, iconURL: member.avatarURL({ dynamic: true }) })
          .setDescription("**خمس ساعات وينتهي اشتراكه**")
          .setColor(`#FDFDFD`)
        chat.send({ embeds: [waa] })

      }

      if (new Date().getTime() >= p.endAt) {

        let pr = ss.filter(f => f = !p.userId);


        let chan = client.channels.cache.get("1069706149479338056")


        let wa = new Discord.MessageEmbed()
          .setTitle("Sub")
          .setAuthor({ name: `${member.username}`, iconURL: member.avatarURL({ dynamic: true }) })
          //.setFooter({ text: `time end`, iconURL: client.guild.iconURL({ dynamic: true }) })
          .setColor(`#FDFDFD`)

        for (i = 0; i < ss.length; i++) {
          wa.setDescription(`*\`#\`* ${i + 1} | ${p.subs}\nانتهى الاشتراك\n`)
        }
        await chan.send({ embeds: [wa], files: ["https://cdn.discordapp.com/attachments/916019170829824030/1037802932344721509/PicsArt_11-03-09.56.07.png"] })
        member.send(`خلص الاشتراك افتح تكت عشان تجدد`);
        await subc.findOneAndDelete(pr);

      }
    });
  }, 1000 * 60);


});

//Event: Guild Add
client.on('guildCreate', async (guild) => {
  let id = await dbq.get(`add_${guild.id}_guilds`);
  console.log("guildCreate | ".red, id)
  if (guild.id == id) return
  else guild.leave();
});


//Event: Voice User
client.on("voiceStateUpdate", (oldState, newState) => {
  if (!oldState.channel && newState.channel) {
    dbq.set(`${newState.guild.id}_${newState.member.id}_lastSeen`, {
      time: Date.now(), channel: newState.channel.id
    });
  }
});


// client.on("messageCreate", async message => {
//   if (message.author.bot || !message.guild) return;
//   const channelid = [""]
//   if (message.channel.id == channelid) {
//     message.channel.send("https://cdn.discordapp.com/attachments/715207341007699988/1018231305504301176/standard.gif")
//     message.react("❤")
//   }
// });


client.on('messageCreate', msg => {
  const pmention = new RegExp(`^<@!?${client.user.id}>( || )$`);
  if (msg.content.match(pmention)) {
    return msg.channel.send({
      embeds: [new Discord.MessageEmbed()
        .setColor(`${msg.guild.me.displayHexColor}`)
        .setTitle(`PREFIX : \`${prefix}\``)]
    })
  }
})

// client.on('messageCreate', async message => {
//   if (message.author.bot) return;

//   if(message.content == "خط") message.reply({files: ["https://media.discordapp.net/attachments/970155149072924722/1015089765621702677/a35d1786476793aa.gif?width=455&height=17"]});
//  else if (message.content == "السلام عليكم") message.reply("عليكم السلام");
// });


client.commands = new Collection();
client.aliases = new Collection();
require("./handlers/eventHandler")(client);
require("./handlers/commandHandler")(client);


//------------------Link Server---------------------\\

client.on("messageCreate", async (message) => {
  if (!message.guild || message.author.bot) return;
  if (message.content.toLowerCase() === prefix + "link" ||
    message.content == `رابط`) {
    var invite = await message.channel.createInvite({
      maxAge: 604800,
      max: 5
    });
    message.channel.send("*check your dm ..*").then(() =>
      message.react("✅").catch(err => { })
    ).catch(err =>
      message.react("❌").catch(err => { }))
    message.author.send(`**User** : 5\n**Time** : 12h\n**Link** : ${invite.url}`);
  }
});


// Anti User
const alt = require('./commands/schemas/antialt.js')
client.on(`guildMemberAdd`, async (client, member) => {

  let altDetector = await alt.findOne({ guildID: member?.guild.id })
  if (altDetector) {
    if (altDetector.altToggle === true) {
      let arr = altDetector.allowedAlts
      if (!arr.includes(member.id)) {

        let day = Number(altDetector.altDays)
        let x = Date.now() - member.user.createdAt;
        let created = Math.floor(x / 86400000);

        if (day >= created) {

          let action;
          if (altDetector.altAction && altDetector.altAction.toLowerCase() === "ban") {
            await member.ban({ reason: "alt detection" }).catch((err) => { console.log(err) })
            action = "Banned"
          }
          if (altDetector.altAction && altDetector.altAction.toLowerCase() === "kick") {
            await member.kick({ reason: "alt detection" }).catch((err) => { console.log(err) })
            action = "Kicked"
          }
        }
      }
    }
  }
});


// Auto role

client.on(`guildMemberAdd`, async (member) => {
  let auto = await dbq.get(`autorole ${member.guild.id}`)
  let ro = member.guild.roles.cache.get(auto)

  if (!ro) return
  member.roles.add(ro);

  // let cha = await dbq.get(`channel_${member.guild.id}_autorole`);
  var logChannel = member.guild.channels.cache.find(channel => channel.name === "join-left");
  if (!logChannel) return;

  let autolog = new Discord.MessageEmbed()
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setColor("AQUA")
    .setTitle("Auto Role")
    .setDescription(`Role: ${ro.name}\nUser: ${member.user.tag}`)
  logChannel.send({ embeds: [autolog] })
});


// Anti link
client.on(`messageCreate`, async message => {
  if (message.author.bot || !message.guild) return;
  if (message.member.permissions.has("MANAGE_MESSAGES")) return;
  if (!message.guild) return;
  if (message.author === message.guild.ownerId) return;
  var link = ["discord.gg/"];
  let antilinkregex = /((([(https)(http)]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

  let antilink = await dbq.get(`antilink_${message.guild.id}`);
  if (antilink == "off") return

  if (antilink == 'on') {

    if (link.some(l => message.content.toLowerCase().includes(l.toLowerCase())) || antilinkregex.test(message)) {

      await message.delete().catch((e) => { });

      const link = new Discord.MessageEmbed()
        .setTitle("You hava been warnend")
        .setColor("DARK_AQUA")
        .setDescription("**No Send link for Mute Server**")

      await message.author.send({ embeds: [link] }).catch((e) => { });
    }
  }

});


// Anti bot
client.on("guildMemberAdd", async wadi3 => {
  if (!wadi3.user.bot) return;
  let antilink = await dbq.get(`anti_${wadi3.guild.id}_bot`)
  if (antilink) {
    if (antilink == false) return;
    if (antilink == true) {
      const nuker = await wadi3.guild.fetchAuditLogs({ type: 'BOT_ADD' }).then(audit => audit.entries.first());
      const user = nuker.executor;
      const target = nuker.target;

      if (user.id === client.user.id) return;
      user.send("لا تعيدها")

      wadi3.guild.members.cache.get(user.id)?.kick({
        reason: 'Adding Bot'
      }).catch(e => {
        console.log(e)
      })

      wadi3.guild.members.ban(target.id, { reason: `By: ${user.tag},Reason: Add Bot` })

      //let cha = await dbq.get(`channel_${wadi3.guild.id}_antibot`);
      var logChannel = wadi3.guild.channels.cache.find(channel => channel?.name === "add-bot");
      if (!logChannel) return;

      let botlog = new Discord.MessageEmbed()
        .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
        .setTitle(`Anti Bot`)
        .setColor(`${wadi3.guild.me.displayHexColor}`)
        .setDescription(`**User: ${user.tag}\nBot: ${target.tag}\nReason: Add Bot**`)
        .setFooter({ text: target.tag, iconURL: target.avatarURL() })
      logChannel?.send({ embeds: [botlog] })
    }
  }
});





//------------------Commands---------------------\\

setInterval(async () => {
  const dbAllData = await dbm?.all();

  // mutes check
  dbAllData.filter(d => d.ID.endsWith("muteTime")).forEach(async d => {
    if ((d.data[0] !== 0) && (d.data[0] < Date.now())) {
      const guildID = d.ID.split("_")[0];
      const userID = d.ID.split("_")[1];
      if (isNaN(guildID) || isNaN(userID)) return dbm.delete(d.ID)
      client.guilds.cache.forEach(async guildid => {

        let guildserver = await dbq.get(`add_${guildid.id}_guilds`);
        const guild = await client.guilds.fetch(guildserver).catch(err => { })
        const muteRole = await guildid.roles?.cache.find((r) => r?.name === "Muted");
        const member = await guildid.members.cache.get(userID)
        if (!member) return;
        if (!muteRole) return;

        await member.roles.remove(muteRole)
        await dbm.delete(d.ID);
      })
    }
  });
  // bans check
  dbAllData.filter(d => d.ID.endsWith("banTime")).forEach(async d => {
    if (d.data !== 0 && d.data < Date.now()) {
      const [guildID, userID] = d.ID.split("_");
      const guild = await client.guilds.fetch(guildID);

      await dbm.delete(d.ID);
      guild.members.unban(userID);
    }
  });
}, 1000)


client.on('message', async message => {
  if (message.author.bot || !message.guild) return;
  const args = message.content.trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if (command == 'delete') {
    const data = await dbm.endsWith(`muteTime`)
    data.forEach(x => dbm.delete(x.ID))
    console.log(data)
    await message.channel.send(`done`)
  }
});

let voiceManager = new Collection();

client.on("voiceStateUpdate", async (oS, nS) => {
  const { member, guild } = oS;
  const newChannel = nS.channel;
  const oldChannel = oS.channel;
  //const JTC = "";

  /// Data voice set 
  let dataset = await dbq.get(`temp_${oS.guild.id}_voiceRoom`);

  if (dataset == null) return console.log('null');
  if (!dataset) return
  // if user join voice channel
  if (oldChannel !== newChannel && newChannel && newChannel.id === dataset) {
    const voiceChannel = await guild.channels.create(`${member.user.username}`,
      {
        type: "GUILD_VOICE",
        parent: newChannel.parent,
        permissionOverwrites: [{
          id: member.id,
          allow: ["CONNECT", "MANAGE_CHANNELS"],
        }, {
          id: guild.id,
          allow: ["CONNECT"],
        },
        ],
      });

    voiceManager.set(member.id, voiceChannel.id);
    // for spam protection
    await newChannel.permissionOverwrites.edit(member, { CONNECT: false });
    setTimeout(() => {
      newChannel.permissionOverwrites.delete(member);
    }, 30 * 1000);

    return setTimeout(() => {
      member.voice.setChannel(voiceChannel);
    }, 60);
  }

  // if user leave or switch
  const JTCCHANNEL = voiceManager.get(member.id);
  const members = oldChannel?.members.filter((m) => !m.user.bot).map((m) => m.id);
  if (JTCCHANNEL && oldChannel.id === JTCCHANNEL && (!newChannel || newChannel.id !== JTCCHANNEL)) {
    if (members.length > 0) {
      // code
      let randomID = members[Math.floor(Math.random() * members.length)];
      let randomMember = guild.members.cache.get(randomID);
      randomMember.voice.setChannel(oldChannel).then((v) => {
        randomMember.send(`> ** You are now Owner of __JTC__ ${oldChannel} Voice Channel **`);
        oldChannel.setName(randomMember.user.username).catch((e) => null);
        oldChannel.permissionOverwrites.edit(randomMember, {
          CONNECT: true,
          MANAGE_CHANNELS: true,
        });
      });
      voiceManager.set(member.id, null);
      voiceManager.set(randomMember.id, oldChannel.id);
    } else {
      voiceManager.set(member.id, null);
      oldChannel.delete().catch((e) => null);
    }
  }
});


//------------------Mute---------------------\\
client.on("guildMemberAdd", async (member) => {
  const guild = await dbq.get(`${member.guild.id}_${member.user.id}_muteTime`)
  if (!guild) return
  let muteRole = member.guild.roles.cache.find(m => m.name === "Muted");
  return member.roles.add(muteRole);
});
//--------------------------------------------\\

client.on('message', async message => {
  if (message.author.bot || !message.guild) return;
  const args = message.content.trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if (command == prefix + 'role' || command === 'رتبه' || command === 'رول') {

    let roles = await dbq.get(`role_${message.guild.id}_role`);
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
    } else if (!message.member.permissions.has("MANAGE_ROLES")) return;

    let args = message.content.split(' ')

    if (args[1] == "all") {
      let role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name.toLocaleLowerCase().includes(args[2])) || message.guild.roles.cache.get(args[2])

      if (!role) return message.reply({ content: `:rolling_eyes: - ** Please specify one role name **` })

      let users = message.guild.members.cache.filter(e => !e.roles.cache.map(e => e.id).includes(role.id))
      users.forEach(user => {
        user.roles.add(role.id)
      }).then(async () => {
        message.channel.send({
          embeds: [new Discord.MessageEmbed()
            .setDescription(`:white_check_mark: Has been added **${users.size}** +\`${role.name}\``)
            .setColor(`${message.guild.me.displayHexColor}`)]
        })
      })
      return
    }
    if (!args[0]) return;
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!user) return message.reply(`**Please provide a user mention/ID**`)

    var role = message.content.split(' ').slice(2).join(' ').toLowerCase();
    var role1 = message.guild.roles.cache.filter(r => r.name.toLowerCase().indexOf(role) > -1 || r.id.indexOf(role) > -1).first();

    if (!role) return message.reply(`> **Add it role.**`);
    if (!role1) return message.reply(`> **There is no role**`);

    if (user.id === message.author.id) {
      return message.reply(`**You can't give yourself a role .**`)
    }
    else if (user.id === client.user.id) {
      return message.reply(`**You can't give me a role!**`)
    }

    if (message.guild.members.cache.get(user.id)) {
      let member = message.guild.members.cache.get(user.id);

      if (!member.manageable) return message.reply(`**I can not give a role .**`)

      if (member.roles.highest.position > message.member.roles.highest.position)
        return message.reply(`🙄 **Review the permissions .**`);

      if (user.roles.cache.find(c => c.id === role1.id))
        return user.roles.remove(role1).then(async () => {
          message.channel.send({
            embeds: [new Discord.MessageEmbed()
              .setDescription(`:white_check_mark: Has been removed **${user.user.tag}** -\`${role1.name}\``)
              .setColor(`${message.guild.me.displayHexColor}`)]
          })


          //let cha = await dbq.get(`channel_${message.guild.id}_UpdateRole`);
          var logChannel = message.guild.channels.cache.find(channel => channel.name === "role-update");
          if (!logChannel) return

          let banedlog = new Discord.MessageEmbed()
            .setTitle('**Remove Role**')
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setColor(`${message.guild.me.displayHexColor}`)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .addField("Remove by", `<@!${message.author.id}>`)
            .addField("user", `${user.user}`)
            .addField("role", `${role1.name}`)
            .setTimestamp()
            .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() })
          logChannel.send({ embeds: [banedlog] })
        }).catch(err => message.channel.send(`${err.message}`));
      user.roles.add(role1).then(async () => {
        message.channel.send({
          embeds: [new Discord.MessageEmbed()
            .setDescription(`:white_check_mark: role has been added **${user.user.tag}** +\`${role1.name}\``)
            .setColor(`${message.guild.me.displayHexColor}`)]
        })

        //let cha = await dbq.get(`channel_${message.guild.id}_UpdateRole`);
        var logChannel = message.guild.channels.cache.find(channel => channel.name === "role-update");
        if (!logChannel) return

        let banedlog = new Discord.MessageEmbed()
          .setTitle('Add Role')
          .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
          .setColor(`${message.guild.me.displayHexColor}`)
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
          .addField("Add by", `<@!${message.author.id}>`)
          .addField("user", `${user.user}`)
          .addField("role", `${role1.name}`)
          .setTimestamp()
          .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() })
        logChannel.send({ embeds: [banedlog] })
      }).catch(err => message.channel.send(`${err.message}`));
    }


  }
  else if (command == prefix + 'ban' || command === 'طير') {

    let roles = await dbq.get(`role_${message.guild.id}_bnan`);
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
    } else if (!message.member.permissions.has("BAN_MEMBERS")) return;


    if (message.reference) {
      return message.channel.send(`🙄 **I can't find this member.**`)
    }

    let [userID, ...reason] = message.content.split(/ +/g).slice(1);
    if (!userID) return message.channel.send(`**Please provide a user mention/ID**`)

    let user = message.mentions.members.first() || await client.users.fetch(userID).catch(() => { });

    if (!user) {
      return message.channel.send(`**🙄 I can't find this member.**`)
    }

    if (user.id === message.author.id) {
      return message.channel.send(`**You can't give yourself a ban .**`)
    }
    else if (user.id === client.user.id) {
      return message.channel.send(`**You can't give me a ban!**`)
    }

    if (message.guild.members.cache.get(user.id)) {
      let member = message.guild.members.cache.get(user.id);

      if (!member.manageable) return message.channel.send(`**I can not give a ban .**`)

      if (member.roles.highest.position >= message.member.roles.highest.position)
        return message.channel.send(`🙄 **Review the permissions .**`)
    }
    const userban = new Discord.MessageEmbed()
      .setColor(`${message.guild.me.displayHexColor}`)
      .setTitle(`You were Banned`)
      .setFooter({ text: `${message.guild.name}`, iconURL: `${message.guild.iconURL({ dynamic: true, format: "png" })}` })
      .addField(`حظر من`, `${message.author.tag}`)
      .addField(`سبب`, `${reason.length ? reason : "لا يوجد سبب"}`)
    user.send({ embeds: { userban } }).catch(() => { })
    message.guild.members.ban(user, { reason: `By: ${message.author.tag}\nReason: ${reason.join(" ")}` }).then(u => {
      return message.channel.send(`**${user.user ? user.user.tag : user.tag}** Banned from server!`);
    }).catch(err => {
      console.log(err);
      message.channel.send("🙄 I can't ban this user .");
    });

    //let cha = await dbq.get(`channel_${message.guild.id}_GuildUser`);
    var logChannel = message.guild.channels.cache.find(channel => channel.name === "ban-unban");
    if (!logChannel) return

    const logbaan = new Discord.MessageEmbed()
      .setTitle('Ban')
      .setColor(`${message.guild.me.displayHexColor}`)
      .setThumbnail(user.avatarURL({ dynamic: true }))
      .setDescription(`تم حضر هذا العضو **${user.user ? user.user.tag : user.tag}** من السيرفر`)
      .addField(`By ban:`, `${message.author.tag}`)
      .addField(`User`, `${user.user ? user.user.tag : user.tag} - ${user.id}`)
      .addField(`Reason:`, `${reason.length ? reason.join(" ") : "لا يوجد سبب"}`)
      .setFooter({ text: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
      .setTimestamp()
    logChannel.send({ embeds: [logbaan] })
  }

  if (command == prefix + 'unban' || command === 'فك') {
    let roles = await dbq.get(`role_${message.guild.id}_bnan`);

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
    } else if (!message.member.permissions.has("BAN_MEMBERS")) return;

    let [userID, ...reason] = message.content.split(/ +/g).slice(1);
    if (!userID) return message.channel.send(`**Please provide a user mention/ID**`)

    let user = message.mentions.members.first() || await client.users.fetch(userID).catch(() => { });

    let args = message.content.split(" ")
    if (args[1] == "all") {
      message.guild.bans.fetch().then(bans => {
        if (!bans) return message.channel.send('No members banned!')

        bans.forEach(b => {
          message.guild.members.unban(b.user);
        });
        return message.channel.send(`<:true_1:885597001654370354> **unban everyone ${bans.size > 1 ? 'users' : 'user'}**.`);
      })
      return
    }
    if (!args[1]) return;
    if (!user) {
      return message.channel.send(`**🙄 I can't find this member.**`)
    }

    if (user.id === message.author.id) {
      return message.channel.send(`**You can't give yourself a ban .**`)
    }
    else if (user.id === client.user.id) {
      return message.channel.send(`**You can't give me a ban!**`)
    }


    message.guild.members.unban(user).then(m => {
      message.channel.send(`<:true_1:885597001654370354> **${user.tag}** This member has been unban`);
    }).catch(stry => {
      message.channel.send(`**🙄 مش موجود الشخص \`${args}\` في قائمه الباند**`);
    })

    //let cha = await dbq.get(`channel_${message.guild.id}_GuildUser`);
    var logChannel = message.guild.channels.cache.find(channel => channel.name === "ban-unban");
    if (!logChannel) return
    const logbaan = new Discord.MessageEmbed()
      .setTitle('UnBan')
      .setColor(`${message.guild.me.displayHexColor}`)
      .setThumbnail(user.avatarURL({ dynamic: true }))
      .setDescription(`تم حضر هذا العضو **${user.user ? user.user.tag : user.tag}** من السيرفر`)
      .addField(`By unban:`, `${message.author.tag}`)
      .addField(`User`, `${user.user ? user.user.tag : user.tag} - ${user.id}`)
      .addField(`Reason:`, `${reason.length ? reason.join(" ") : "لا يوجد سبب"}`)
      .setFooter({ text: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
      .setTimestamp()
    logChannel.send({ embeds: [logbaan] })
  }
  if (command == prefix + 'kick' || command === 'برا') {
    let roles = await dbq.get(`role_${message.guild.id}_bnan`);
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
    } else if (!message.member.permissions.has("KICK_MEMBERS")) return;

    let [userID, ...reason] = message.content.split(/ +/g).slice(1);
    if (!userID) return message.channel.send(`**Please provide a user mention/ID**`)

    if (message.reference) {
      return message.channel.send(`🙄 **I can't find this member.**`)
    }

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    if (user.id === message.author.id) {
      return message.channel.send(`**You Can't Kicked Yourself**`)
    }
    if (user.id === client.user.id) {
      return message.channel.send(`**You can't Kicked Me !!**`)
    }

    if (user.roles.highest.position > message.member.roles.highest.position)
      return message.channel.send(`🙄 **Review the permissions .**`)

    if (user) {
      if (!message.guild.members.cache.get(user.id).kickable)
        return message.channel.send(`**That user is not kickable.**`)
      user.kick()
      message.channel.send(`<:true_1:885597001654370354> **${user.user.tag} kicked from the server!**`)


      //let cha = await dbq.get(`channel_${message.guild.id}_GuildUser`);
      var logChannel = message.guild.channels.cache.find(channel => channel.name === "ban-unban");
      if (!logChannel) return
      let kicklog = new Discord.MessageEmbed()
        .setTitle('kick')
        .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setColor(`${message.guild.me.displayHexColor}`)
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .addField("kicked by", `<@!${message.author.id}> - ${message.author.tag}`)
        .addField("user", `${user.user.tag} - ${user.user.id}`)
        .setTimestamp()
        .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL() })
      logChannel.send({ embeds: [kicklog] })
    }
  }
  else if (command == prefix + 'mute' || command === 'انجب' || command === 'اسكت') {
    let roles = await dbq.get(`role_${message.guild.id}_mutes`);

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
    const data = await dbm.set(`${message.guild.id}_${user.id}_muteTime`, [time === 0 ? 0 : (ms(time) + Date.now()), reason]);
    //  await client.db.set(`${message.guild.id}_${user.id}_muteTime`, [time === 0 ? 0 : (ms(time) + Date.now()), reason]);
    message.channel.send(`<a:tlShutUp:868888268412960768> ${user.user.tag} **muted from the text**!`)
    const embed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle(`<a:tlShutUp:868888268412960768> You were Muted`)
      .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, format: "png" }) })
      .setDescription(`**Muted by**\n${message.author.tag}\n\n**Reason**\n${reason.length ? reason.join(" ") : "No Reason Provided"}\n\n**Duration**\n${time === 0 ? "Permanently" : prettyMS(ms(time), { verbose: true })}\n\n**Ends at**\n${data[0] ? prettyMS(data[0] - Date.now(), { verbose: true }) : "No End Mute"}`)
    user.send({ embeds: [embed] }).catch(() => { });

    //let cha = await dbq.get(`channel_${message.guild.id}_mutesMember`);
    var logChannel = message.guild.channels.cache.find(channel => channel.name === "mute-unmute");
    if (!logChannel) return

    const logmute = new Discord.MessageEmbed()
      .setTitle('Mute')
      .setColor(`${message.guild.me.displayHexColor}`)
      .setThumbnail(user.user.avatarURL({ dynamic: true }))
      .addField("**User**", `${user.user ? user.user.tag : user.tag} - ${user.id}`)
      .addField("**Muted by**", `${message.author.tag}`)
      .addField("**Reason**", `${reason.length ? reason.join(" ") : "No Reason Provided"}`)
      .addField("**Duration**", `${time === 0 ? "Permanently" : prettyMS(ms(time), { verbose: true })}`)
      .addField("**Time Mute**", `End Time: ${data[0] ? moment(data[0]).format("MM-DD-YYYY, HH<:mm:809365923068641300>ss A") : "No Ends Time"}`)
      .setFooter({ text: `${message.author.tag}`, iconURL: `${message.author.avatarURL({ dynamic: true })}` })
      .setTimestamp()
    logChannel.send({ embeds: [logmute] })
  }

  else if (command == prefix + 'unmute' || command === 'تكلم') {
    let roles = await dbq.get(`role_${message.guild.id}_mutes`);

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


    let [userID, ...reason] = message.content.split(/ +/g).slice(1);
    let user = message.mentions.members.first() || message.guild.members.cache.get(userID);
    if (!userID) return message.channel.send("Please provide a user mention or id");

    let role = message.guild.roles.cache.find(role => role.name === "Muted");
    if (!user) return message.channel.send(`:rolling_eyes: **I can't find this member**`)

    if (user.id === message.author.id) {
      return message.channel.send(`**You can not do yourself**`)
    }
    else if (user.id === client.user.id) {
      return message.channel.send(`**You can't work for me mute.**`)
    }

    if (user.roles.highest.position >= message.member.roles.highest.position)
      return message.channel.send(`**You can't unmute this user.**`)

    if (!role || !user.roles.cache.has(role.id)) return message.channel.send("**The user is not muted**")
    await user.roles.remove(role, `by: ${message.author.tag} - reasone: ازاله رول الميوت`)
    await dbm.delete(`${message.guild.id}_${user.id}_muteTime`);
    message.channel.send(`${user.user.tag} **unmuted from the text!**`);


    //let cha = await dbq.get(`channel_${message.guild.id}_mutesMember`);
    var logChannel = message.guild.channels.cache.find(channel => channel.name === "mute-unmute");
    if (!logChannel) return
    const logmute = new Discord.MessageEmbed()
      .setTitle('UnMute')
      .setColor(`${message.guild.me.displayHexColor}`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setDescription(`**User**\n${user.user.tag} - ${user.id}\n\n**UnMuted by**\n${message.author.tag}`)
      .setFooter({ text: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
      .setTimestamp()
    logChannel.send({ embeds: [logmute] })
  }

  else if (command == prefix + 'clear' || command === 'مسح') {
    let roles = await dbq.get(`role_${message.guild.id}_clear`);


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
    } else if (!message.member.permissions.has("MANAGE_SERVER")) return;



    if (!message.channel.guild) return
    await setTimeout(() => message.delete());
    let args = message.content.split(" ").slice(1);
    let messagecount = parseInt(args[0]);
    let type = "all";
    if (messagecount > 100)
      return message.channel.send(`clear message 100 Just.!`)
        .then(m => m.delete({ timeout: 5000 }));
    if (!messagecount) messagecount = 100;
    if (message.mentions.users.size) type = message.mentions.users.first();
    let msgs = await message.channel.messages
      .fetch({ limit: 100 });
    msgs = [...msgs.values()]

    if (msgs.length > messagecount) msgs = msgs.slice(0, messagecount);
    if (type !== "all") {
      msgs = msgs.filter(m => m.author.id === type.id);
      message.channel.bulkDelete(msgs, true);
    } else message.channel.bulkDelete(msgs, true);

    const mappedMessages = msgs.map(m => `- Time : ${Date(m.createdTimestamp).slice(0, 33)} \n- By :  ${m.author.tag} (${m.author.id}) \n- Message : ${m.embeds[0] ? "Embed" : m.content}`).join("\n\n========\n\n");
    const m = `
<#${message.channel.id}> - ${message.channel.name} (${message.channel.id})
Deleted By : ${message.author.tag} (${message.author.id})
Deleted At : ${Date(message.createdTimestamp)}`

    await fs.writeFile('./clear.txt', `${message.channel.name} (${m}\n\n${mappedMessages}`, function (err) {
      if (err) return console.log(err);
    });

    message.channel.send(`\`\`\`js\nClear Message Channel ${msgs.length}.\nFiltered: ${type === "all" ? "No" : `Yes, user: ${type.tag}`}\`\`\``).then(msg => msg.delete({ timeout: 1000 }))

    //let cha = await dbq.get(`channel_${message.guild.id}_messagefile`);
    var logChannel = message.guild.channels.cache.find(channel => channel.name === "message-delete-file");
    if (!logChannel) return
    await logChannel.send({
      content: `${m}`,
      files: [{
        attachment: "./clear.txt",
        name: "Deleted Messages"
      }]
    })
  }
  else if (message.content == prefix + 'lock' || message.content === 'قفل') {
    let roles = await dbq.get(`role_${message.guild.id}_lock`);

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
    } else if (!message.member.permissions.has("MANAGE_CHANNELS")) return;


    message.channel.permissionOverwrites.edit(message.guild.id, {
      SEND_MESSAGES: false
    }).then(p => {
      message.channel.send(`<#${message.channel.id}> **Chat is closed .** 🔒`);
    })
  }
  else if (message.content == prefix + 'unlock' || message.content === 'فتح') {
    let roles = await dbq.get(`role_${message.guild.id}_lock`);

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
    } else if (!message.member.permissions.has("MANAGE_CHANNELS")) return;


    message.channel.permissionOverwrites.edit(message.guild.id, {
      SEND_MESSAGES: true
    }).then(p => {
      message.channel.send(`<#${message.channel.id}> **Chat is open .** 🔓`);
    })
  }
  else if (command == prefix + 'nickname' || command === 'لقب' || command === 'اسم') {
    let roles = await dbq.get(`role_${message.guild.id}_nickname`);

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
    } else if (!message.member.permissions.has("MANAGE_NICKNAMES")) return;


    if (message.reference) {
      return message.channel.send(`🙄 **I can't find this member**`)
    }
    let args = message.content.split(' ').slice(2).join(' ');

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send("Please provide a user mention or id")

    if (user.roles.highest.position > message.member.roles.highest.position)
      return message.channel.send(`**You can't nickname this user.**`)


    if (!args) {
      return message.guild.members.cache.get(user.id).setNickname('').then(m => {
        message.channel.send(`<:true_1:885597001654370354> ${user.user.username} has been reseted nickname`);
      }).catch(error => { message.channel.send(`error`) });
    }
    return message.guild.members.cache.get(user.id).setNickname(args).then(m => {
      message.channel.send(`<:true_1:885597001654370354> been changed nick \`${user.user.username}\` to \`${args}\``);
    }).catch(error => { message.channel.send(`Missing Permissions`) })
  }

  else if (command == prefix + 'move' || command === 'سحب') {
    let roles = await dbq.get(`role_${message.guild.id}_move`);

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

    } else if (!message.member.permissions.has("MOVE_MEMBERS")) return;


    let [user, channel, ...args] = message.content.split(" ").slice(1);
    let channelToMove = message.member.voice.channel;
    const membersMentions = message.mentions.members;

    if (!message.channel.guild || message.author.bot) return;

    if (!message.member.voice.channel)
      return message.channel.send("**Your are not in voice channel!**");

    if (!user) return message.channel.send("Please provide a user to move");

    if (user === "all") {
      const membersInVoice = message.guild.members.cache.filter((m) => m.voice.channel);
      if (membersInVoice.size < 2) return message.channel.send("**You are the only user in a voice channel at the moment**");

      membersInVoice.forEach((m) => {
        m.voice.setChannel(channelToMove);
      });
      return message.channel.send(`<a:true:86888827468344939> Successfully moved ${membersInVoice.size - 1} member to **${channelToMove.name}**`);
    } else if (!isNaN(user)) {
      user = await message.guild.members.fetch(user);

      user.voice.setChannel(channelToMove);
      return message.channel.send(`<a:true:86888827468344939> Successfully moved ${user.user.username} member to **${channelToMove.name}**`);
    } else {
      user = membersMentions.first();
      if (!user.user.id) return message.channel.send("Please provide a user to move")
      if (!user.voice.channel) return message.channel.send(`> ${user.user.username} is not in a voice channel`);

      if (!channel) {
        user.voice.setChannel(channelToMove);
        return message.channel.send(`<a:true:86888827468344939> Successfully moved **${user.user.username}** to **${channelToMove.name}**`);
      } else {
        if (membersMentions.size > 1) {
          const secondUser = membersMentions.first(2)
          channelToMove = secondUser.voice.channel;

          user.voice.setChannel(channelToMove);
          return message.channel.send(`<a:true:868888274683449394> Successfully moved **${user.user.username}** to **${channelToMove.name}**`);
        } else {
          channel = message.guild.channels.cache.find((c) => c.type === "voice" && (c.name === channel || c.id === channel));
          if (!channel) return message.channel.send(`I couldn't find a channel with the name or id ${channel}`);
          user.voice.setChannel(channel);
          return message.channel.send(`<a:true:868888274683449394> Successfully moved ${user.user.username} to ${channel.name}`);
        }
      }
    }
  }
  else if (command == prefix + 'vkick') {
    let roles = await dbq.get(`role_${message.guild.id}_vkick`);

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
    } else if (!message.member.permissions.has("KICK_MEMBERS")) return;


    let args = message.content.split(' ');
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[1])
    if (!message.channel.guild || message.author.bot) return;

    if (!user) return; //message.channel.send(``)
    if (!message.guild.members.cache.get(user.id).voice)
      return message.channel.send(`**${user.user.username}** Not in voice`);
    await user.voice.setChannel(null)
    message.channel.send(`<:true_1:885597001654370354> **${user.user.username} He was kicked out of the voice channel**`);
  }
  else if (command == prefix + 'vmute') {
    let roles = await dbq.get(`role_${message.guild.id}_vmute`);
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

    let user = message.mentions.users.first() || message.guild.members.cache.get(message.content.split(" ")[1]);

    if (!user) return message.channel.send(`**Please provide a user mention/ID**`)
    if (!message.guild.members.cache.get(user.id).voice)
      return message.channel.send(`**${user.user.username}** Not in voice`);
    message.guild.members.cache.get(user.id).voice.setMute(true);
    return message.channel.send("<:true_1:885597001654370354> **" + user.username + "** User muted from voice"
    );
  }

  else if (command == prefix + 'vunmute') {
    let roles = await dbq.get(`role_${message.guild.id}_vmute`);
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


    let user = message.mentions.users.first() || message.guild.members.cache.get(message.content.split(" ")[1]);

    if (!user) return message.channel.send(`**Please provide a user mention/ID**`)
    if (!message.guild.members.cache.get(user.id).voice)
      return message.channel.send(`**${user.user.username}** Not in voice`);
    message.guild.members.cache.get(user.id).voice.setMute(false);
    return message.channel.send("<:true_1:885597001654370354> **" + user.username + "** User unmuted from voice");

  } else if (command == prefix + 'timeout') {
    let roles = await db.get(`role_${message.guild.id}_timeoute`);
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
    } else if (!message.member.permissions.has("TIMEOUT_MEMBERS")) return;



    if (message.reference) {
      return message.channel.send(`🙄 **I can't find this member**`)
    }

    let member = message.mentions.members.first()
    let args = message.content.split(" ").slice(2).join(" ")

    if (!member) return message.channel.send('**Please Mention The Member First!**')

    if (member.id === message.author.id) {
      return message.channel.send(`**You can not give yourself timeout chat** .`)
    }

    else if (member.id === client.user.id) {
      return message.channel.send(`**You can't give me timeout !**`)
    }

    if (!args) return message.channel.send('**Please Type The Time Or Put It As Off To Remove!!**')

    if (!member.manageable) return message.channel.send(`**🙄 You can't give \`${member.user.tag}\` timeout.**`)

    if (member.roles.highest.position >= message.member.roles.highest.position)
      return message.channel.send(`🙄 **Review the permissions .**`)

    if (args.toLowerCase() === 'off') {
      fetch(`https://discord.com/api/v9/guilds/${message.guild.id}/members/${member.id}`, {
        method: 'PATCH',
        headers: { "Authorization": "Bot " + client.token, "Content-Type": "application/json" },
        body: JSON.stringify({ 'communication_disabled_until': null }),
      }).then(m => {
        return message.channel.send(`**Done! I Have Removed Timeout For ${member.user.tag}!!**`)
      })
    }
    let ggg = ['d', "m", "h", "s"];
    if (ggg.some(c => args.endsWith(c))) {
      const timee = ms(args)
      if (timee <= 9999) return message.channel.send('**You Can\'t Timeout With Less Than 10 Seconds!**')
      if (timee > 2332800000) return message.channel.send('**This Time Is Above 27 Days!**')
      let time = new Date().getTime()
      let newdate = new Date(time + timee).toISOString()

      fetch(`https://discord.com/api/v9/guilds/${message.guild.id}/members/${member.id}`, {
        method: 'PATCH',
        headers: { "Authorization": "Bot " + client.token, "Content-Type": "application/json" },
        body: JSON.stringify({ 'communication_disabled_until': `${newdate}` }),
      }).then(m => {
        message.channel.send(`**Done! I Have Timed Out ${member.user.tag} For ${ms(timee)} !**`)
      })
    }

  } else if (command == prefix + 'hid' || command == 'اخفاء') {
    let roles = await dbq.get(`role_${message.guild.id}_lock`);

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
    } else if (!message.member.permissions.has("MANAGE_CHANNELS")) return;

    let everyone = message.guild.roles.cache.find(hyper => hyper.name === '@everyone');
    if (!everyone) {
      message.channel.createOverwrite(everyone, {
        VIEW_CHANNEL: false
      }).then(() => {
        message.channel.send(`**Done Show This Room ${message.channel}**`)
      })
    } else {

      let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

      message.channel.createOverwrite(user, {
        VIEW_CHANNEL: false
      }).then(() => {
        message.channel.send(`**Done Show This Room in the user ${user.tag}**`)
      })
    }
    let dogeguild = args[1];
    if (!dogeguild) return;

    if (dogeguild == "all") {
      let everyone = message.guild.roles.cache.find(hid => hid.name === '@everyone');
      message.guild.channels.cache.forEach((channel) => {
        channel.permissionOverwrites.create(everyone, { VIEW_CHANNEL: false }).then(() => {
        });
      })
      message.reply("Done Show All Rooms")
    }
  } else if (command == prefix + 'show' || command == 'اظهار') {
    let roles = await dbq.get(`role_${message.guild.id}_lock`);

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
    } else if (!message.member.permissions.has("MANAGE_CHANNELS")) return;

    let everyone = message.guild.roles.cache.find(hyper => hyper.name === '@everyone');
    if (!everyone) {
      message.channel.createOverwrite(everyone, {
        VIEW_CHANNEL: true
      }).then(() => {
        message.channel.send(`**Done Show This Room ${message.channel}**`)
      })
    } else {

      let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

      message.channel.createOverwrite(user, {
        VIEW_CHANNEL: true
      }).then(() => {
        message.channel.send(`**Done Show This Room in the user ${user.tag}**`)
      })
    }
    let dogeguild = args[1];
    if (!dogeguild) return;

    if (dogeguild == "all") {
      let everyone = message.guild.roles.cache.find(hid => hid.name === '@everyone');
      message.guild.channels.cache.forEach((channel) => {
        channel.permissionOverwrites.create(everyone, { VIEW_CHANNEL: true }).then(() => {
        });
      })
      message.reply("Done Show All Rooms")
    }
  }
});


//------------------command welcome---------------------\\
client.on('message', async message => {
  if (message.author.bot || !message.guild) return;

  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if (command == 't') {
    if (!owner.includes(message.author.id)) return
    client.emit("guildMemberAdd", message.member);
  }
});

tracker.on("guildMemberAdd", async (member, inviter, invite, error) => {
  if (error) return console.error(error);

  //let cha = await dbq.get(`channel_${member.guild.id}_JoinLeft`);
  var logChannel = member.guild.channels.cache.find(channel => channel?.name === "join-left");
  if (!logChannel) {
    const user = member.user;
    let createdDate = Math.floor(new Date(user.createdTimestamp).getTime() / 1000.0)
    let joineddate = Math.floor(new Date(member.guild.members.cache.get(member.id).joinedTimestamp).getTime() / 1000.0)
    let memberjoin = new Discord.MessageEmbed()
      .setTitle('User Join')
      .setColor(`${member.guild.me.displayHexColor}`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(` • Username: <@!${member.user.id}> - \`${member.user.tag}\` Has joined ${member.guild.name} \n • Created: <t:${createdDate}:F> (<t:${createdDate}:R>) \n • Joined: <t:${joineddate}:F> (<t:${joineddate}:R>) \n • Invite : ${inviter}\n • Link : ${invite.url}\n • Code: ${invite.code}`)
      .setTimestamp()
      .setFooter({ text: `${member.guild.name}`, iconURL: `${member.guild.iconURL({ dynamic: true })}` })
    logChannel.send({ embeds: [memberjoin] });
  }
  let on = await dbq.get(`togg_${member.guild.id}`);
  if (on == true) {
    const leftright = 220; // يمن ويسار الصوره
    const upkdown = 168; //فوق تحت الصوره 
    const ksize = 213; // حجم الصوره
    const namleftright04 = 380; // يمين ويسار الأسم
    const namupdown14 = 190; // فوق وتحت الأسم
    let textsize = 33; //  حجم الخط
    const { registerFont } = require('canvas');
    registerFont('./commands/fonts/arial.ttf', { family: `Roboto` });
    const canvas = Canvas.createCanvas(714, 401);
    const ctx = canvas.getContext('2d');


    // const wlc = await dbq.get(`img_${member.guild.id}_wlc`);
  
    // if (wlc == null) {
      const WelcomeImage = await Canvas.loadImage("https://media.discordapp.net/attachments/715207341007699988/1059513383201808444/a53d04d02a3d44d1.png");

    // } else {
    //   var WelcomeImage = await loadImage(`${wlc}`);

    // }
    // const WelcomeImage = await Canvas.loadImage(wlc || "https://cdn.discordapp.com/attachments/916019170829824030/1034159386769231983/welcom_s_copy.png");
    ctx.drawImage(WelcomeImage, 0, 0, canvas.width, canvas.height);
    ctx.font = `${textsize}px Arial`;
    ctx.shadowColor = 'rgba(22, 22, 22, 1)'; //لون الضل
    ctx.shadowOffsetY = 2; // انحاء الضل
    ctx.shadowBlur = 5; // الكثافه
    ctx.fillStyle = '#8b8d8c';
    ctx.fillText(member.user.username, namleftright04, namupdown14);
    ctx.beginPath();
    ctx.arc(leftright, upkdown, ksize / 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatarUser = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
    ctx.drawImage(
      avatarUser,
      leftright - 108,
      upkdown - 108,
      ksize ,
      ksize )

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome.png');
    let cha = await dbq.get(`channel_${member.guild.id}_wlc`);
    if (cha === null) return;
    const channel = member.guild.channels.cache.find(ch => ch.id === cha);
    if (!channel) return;
    let words = await dbq.get(`messagew_${member.guild.id}`);
    if (words === null) words = `Welcome [user], Friend: [inviter]`;
    let sowner = words.replace('[sowner]', member.guild.owner);
    let s = sowner.replace('[server]', member.guild.name);
    let u = s.replace('[user]', member);
    let n = u.replace('[username]', member.user.username);
    let h = n.replace('[inviter]', inviter);
    let m = h.replace('[invitername]', inviter.username);
    let all = m.replace('[count]', member.guild.memberCount);
    await channel.send({ files: [attachment] });
    channel.send({ content: `${all}` })
    wadi3.set(`invv_${member.guild.id}_${member.id}`, inviter.id)
  }
});


client.on("guildMemberRemove", async member => {

  //let cha = await dbq.get(`channel_${member.guild.id}_JoinLeft`);
  var logChannel = member.guild.channels.cache.find(channel => channel?.name === "join-left");
  if (!logChannel) return
  const user = member.user;

  let createdDate = Math.floor(new Date(user.createdTimestamp).getTime() / 1000.0)
  let joineddate = parseInt(member.joinedTimestamp / 1000)
  let memberleft = new Discord.MessageEmbed()
    .setTitle('User left')
    .setColor(`${member.guild.me.displayHexColor}`)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setDescription(` • Username: <@!${member.user.id}> - \`${member.user.tag}\` Has left  \n • Created: <t:${createdDate}:F> (<t:${createdDate}:R>) \n • Joined: <t:${joineddate}:F> (<t:${joineddate}:R>)`)
    .setTimestamp()
    .setFooter({ text: `${member.guild.name}`, iconURL: `${member.guild.iconURL({ dynamic: true })}` })
  logChannel.send({ embeds: [memberleft] });

})

// Crash Bot 
client.on('error', error => console.log(error));
client.on('warn', info => console.log(info));
process.on('unhandledRejection', (reason, p) => {
  console.log(reason.stack ? reason.stack : reason)
});
process.on("uncaughtException", (err, origin) => {
  console.log(err.stack ? err.stack : err)
})
process.on('uncaughtExceptionMonitor', (err, origin) => {
  console.log(err.stack ? err.stack : err)
});



client.login(token)