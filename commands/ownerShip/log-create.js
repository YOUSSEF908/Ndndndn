const { QuickDB } = require("quick.db");
const db = new QuickDB();
const Discord = require("discord.js");

module.exports = {
    name: 'log',
    description: "log create channel all",
    aliases: [""],
    usage: `{prefix}log [create - delete]`,
    examples: `{prefix}log create`,
    // DeveloperUser: true, // Developer User
    serverOwner: false, // Server Owner check
    run: async (client, message, args) => {

        if (message.author.bot) return;
        let dogeguild = args[0];
        if (!dogeguild) return message.reply({
            embeds: [new Discord.MessageEmbed()
                .setDescription(`log create: \`انشاء اللوقات تلقائي\`\n log delete : \` حذف اللوقات\``)
                .setColor('RED')
            ]
        })


        if (dogeguild == "create") {

            var channels = [
                "ban-unban",
                "mute-unmute",
                "message-delete-edit",
                "guild-edit",
                "join-left",
                "voice-log",
                "message-delete-file",
                "channel-edit-all",
                "role-edit-all",
                "role-update",
                "nickname-edit",
                "edit-emojis",
                "edit-sticker",
                "add-bot",
                "invite-log"
            ];

            const parent = "Logs"

            let parentChannel = message.guild.channels.cache.filter(c => c.type == "GUILD_CATEGORY").find(c => c.name == parent)

            if (!parentChannel) {
                await message.guild.channels.create(parent, {
                    type: "GUILD_CATEGORY"
                });
                parentChannel = message.guild.channels.cache.filter(c => c.type == "GUILD_CATEGORY").find(c => c.name == parent)
            }


            for (let i = 0; i < channels.length; i++) {
                var channel = message.guild.channels.cache.find(c => c.name == channels[i]);
                if (!channel) {

                    channel = message.guild.channels.create(channels[i], {
                        parent: parentChannel,
                        type: "text",
                        permissionOverwrites: [
                            {
                                id: message.guild.roles.everyone,
                                deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                            }
                        ]
                    });
                }
            }
            message.reply("Done Create Channel")

        } else if (dogeguild == "delete") {
            var channelss = [
                "ban-unban",
                "mute-unmute",
                "message-delete-edit",
                "guild-edit",
                "join-left",
                "voice-log",
                "message-delete-file",
                "channel-edit-all",
                "role-edit-all",
                "role-update",
                "nickname-edit",
                "edit-emojis",
                "edit-sticker",
                "add-bot",
                "invite-log"
            ];

            channelss.forEach(ch => {
                message.guild.channels.cache.find(c => c.name == ch)?.delete().catch(() => { });
               });
               await message.reply("Done Delete Channel")
        }


    }

}

