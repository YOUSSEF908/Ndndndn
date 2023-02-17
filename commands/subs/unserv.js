const subcModel = require("../schemas/sub.js");
const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js")
const ms = require("ms")
module.exports = {
    name: "unserv",
    description: "",
    aliases: [""],
    usage: `{prefix}vip`,
    examples: `{prefix}vip`,
    type: "subs",
    run: async (client, message, args) => {
 
        var user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        if (!user) return message.channel.send("**Send userID **");
        if(!args[1] || isNaN(+args[1])) {
            await subcModel.findOneAndDelete({ userId: user.id })
                  return message.channel.send(`Done removed All subs!`);
            }

           subcModel.findOne({ userId: user.id  }, async(err,data) => {
                if(err) throw err;
                if(data) {
                    data.splice(Number(args[1]) -1, 1)
                    message.channel.send('Done removed sub ')
                    data.save()
                } else {
                    message.channel.send('This user does not have any sub in this server!')
                }
            })
    

    }
}