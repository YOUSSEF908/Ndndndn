const { prefix, owner } = require("../../config.json");
const { QuickDB } = require("quick.db");
const { MessageEmbed } = require("discord.js")
const db = new QuickDB();
module.exports = {
    name: "set-channel",
    description: "تحديد شات الفويس اونلاين",
    aliases: ["set"],
    memberPermissions: ['ADMINISTRATION'], // Member Permission Check
    usage: `{prefix}set voice" \`[#chat, ID]\``,
    examples: `{prefix}set voice + id`,
    serverOwner: true, // Server Owner check
    type: "ownerShip",
    run: async (client, message,args) => {
     let check = await db.get(`add_${message.author.id}_users`);
     if(owner.includes(message.author.id) || check == true) {

          let dogeguild = args[0];
      if(!dogeguild) return message.channel.send({ embeds: [new MessageEmbed()
        .setTitle(`> ${prefix}set voice \`[ID / #voice]\``)
        .setColor('RED')
      ]});
   
   if(dogeguild == "voice") {
    const room = message.mentions?.channels?.first() || client.channels.cache.get(args[1]);
     if (!room) return
        if (room?.type !== "GUILD_VOICE") return;  
        if (db.get(`voiceRoom ${message.guild.id}  online`) == room.id) return 
       const v = await db.set(`voiceRoom ${message.guild.id} online`, room.id);

     return message.channel.send(`set Room Done <#${room.id}>`)

  } else if(dogeguild == "delete") {
    const voice = await db.delete(`voiceRoom ${message.guild.id} online`)
       console.log(voice) 

    return message.react("✅")
} 

else if(dogeguild == "name") {
const room = message.mentions?.channels?.first() || client.channels.cache.get(args[1]);
     if (!room) return;
     let dis = message.content.split(" ")[3]
   if(!dis) return message.reply(`Add edit room voice name`);
     if (room?.type !== "GUILD_VOICE") return;  
        if (db.get(`voiceRoom_${message.guild.id}_nameEdit`) == dis) return 
       const v = await db.set(`voiceRoom_${message.guild.id}_nameEdit`, dis);
   room.setName(`${dis} [00]`)
   await message.reply(`Done Edit Name Voice <#${room.id}> \`${dis}\``)
}else {
     return message.channel.send(`> **${prefix}set \`voice - delete - name\`**`);
}
}

}
}