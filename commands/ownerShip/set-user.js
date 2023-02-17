const { Discord, MessageEmbed } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "set-user",
    description: "اضافه عضو ل اوامر اونر",
    aliases: [""],
    usage: `{prefix}`,
    examples: `{prefix}`,
    DeveloperUser: true , // Developer User
    serverOwner: true, // Server Owner check
    type: "ownerShip",
    run: async (client, message, args) => {


        if (!args[0]) return message.channel.send({
            embeds: [new MessageEmbed()
                .setDescription(`❌ **Please Provide Me add Or delete**`)
                .setColor("NOT_QUITE_BLACK")
            ]
        })

        else if (args[0] == "add") {

            let user = [...message.mentions.members.values()]
            if (user.length == 0) return message.channel.send(`Please Mention the user first`)

            message.mentions.members.forEach(async user => {
                let data = await db.get(`whitelist`);
                if (!data || data == null || !data[0]) {
                    await db.set(`whitelist`, []);
                    data = await db.get(`whitelist`);
                }
                await db.set(`whitelist`, [...data, user.id]);
                return message.channel.send("Done Add User")

            });
        }

        else if (args[0] == "delete") {
            await db.set(`whitelist`, []);
            return message.channel.send("Done Delete User All")
        }
    }
}