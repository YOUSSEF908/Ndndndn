const { MessageEmbed, GuildMember } = require("discord.js");
const { prefix, owner , guild} = require("../../config.json");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = async (client, oldMember, newMember) => {

           //-----------------------------------------LOGS-----------------------------------------------//

          // let nickch = await db.get(`channel_${newMember.guild.id}_nickname`);
            var logChannel1 = client.channels.cache.find(channel => channel?.name === "nickname-edit");
            if(!logChannel1) return

            //-------------------------------------------------------------------------------------------//

           //let cha = await db.get(`channel_${newMember.guild.id}_UpdateRole`);
            var updatelog = client.channels.cache.find(channel => channel?.name === "role-update");
            if(!updatelog) return

            //----------------------------------------END---------------------------------------------//


    const logs = await oldMember.guild.fetchAuditLogs({
        limit: 1,
      })
      const log = logs.entries.first(); // Fetches the logs and takes the last entry
  
      if (log.action == "MEMBER_ROLE_UPDATE") { // If the last entry fetched is of the type "MEMBER_ROLE_UPDATE" execute code
        if (oldMember.roles.cache.size == newMember.roles.cache.size) return // If number of roles member has didnt change return
        const memberRoleUpdateEmbed = new MessageEmbed()
          .setAuthor({name: oldMember.user.tag, iconURL: oldMember.user.displayAvatarURL()})
          .setDescription(`Following roles have been added/removed to ${oldMember} by \`${log.executor.tag}\``)
          .setTimestamp()
          .setFooter({text: "Member Role Update"})
  
        if (oldMember.roles.cache.size > newMember.roles.cache.size) { // If newMember has more roles it means roles were added
          const p = log.changes.find(x => x.key == "$remove").new.map(e => `<@&${e.id}>`).join(" ") // maps roles by their id to mention them
         console.log(p)
          memberRoleUpdateEmbed.addField("Removed role(s) 📛", p).setColor("RED")
        };
        if (oldMember.roles.cache.size < newMember.roles.cache.size) { // If oldMember has more roles it means roles were removed
          const p = log.changes.find(x => x.key == "$add").new.map(e => `<@&${e.id}>`).join(" ") // maps roles by their id to mention them
          memberRoleUpdateEmbed.addField("Added role(s) ✅", p).setColor("GREEN")
        }
        await updatelog.send({embeds: [memberRoleUpdateEmbed]}) // executes the function bellow with as parameter the embed name
  
      } else if (log.action == "MEMBER_UPDATE") { // If the last entry fetched is of the type "MEMBER_UPDATE" execute code

        const memberUpdateEmbed = new MessageEmbed()
        .setAuthor({name: log.executor.tag , iconURL: log.executor.displayAvatarURL()})
        .setColor(`${oldMember.guild.me.displayHexColor}`)
        .setThumbnail(oldMember.user.displayAvatarURL())
        .setTimestamp()
        .setFooter({text: "UPDATE MEMBER NICKNAME"})
        if (oldMember.nickname !== newMember.nickname) { // If nickname changed execute code
          memberUpdateEmbed.setDescription(`${oldMember}'s nickname has been updated by \`${log.executor.tag}\``)
          .addField(`Old nickname`,`${oldMember.nickname ? `\`${oldMember.nickname}\`` : `${oldMember.user.tag}`}`)  
          .addField(`New nickname`,`${newMember.nickname ? `\`${newMember.nickname}\`` : `${newMember.user.tag}`}`)
        }
        if (!oldMember.premiumSince && newMember.premiumSince) { // If oldMember has premiumSince and newMember does it means they started to boost
          memberUpdateEmbed.setDescription(`> ${oldMember} started boosting this server`)
        }
  
        return await logChannel1?.send({embeds: [memberUpdateEmbed]})  // executes the function bellow with as parameter the embed name
      } 
    }