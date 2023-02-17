const { prefix, owner } = require("../../config.json");
const { QuickDB } = require("quick.db");
const { MessageEmbed } = require("discord.js")
const db = new QuickDB();
module.exports = {
    name: "temp",
    description: "تحديد شات الروم الؤقت",
    aliases: ["temp"],
    usage: `{prefix}temp voice" \`[#chat, ID]\``,
    examples: `{prefix}temp voice + id`,
   
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
        if (db.get(`temp_${message.guild.id}_voiceRoom`) == room.id) return 
       const v = await db.set(`temp_${message.guild.id}_voiceRoom`, room.id);
       console.log(v) 
       message.react("✅")
     return message.channel.send(`Temp add Room Done <#${room.id}>`)

  } else if(dogeguild == "delete") {
    const voice = await db.delete(`temp_${message.guild.id}_voiceRoom`)
       console.log(voice) 

    return message.react("✅")
}else {
     return message.channel.send(`> **${prefix}set \`voice - delete - name\`**`);
}
}


}
}