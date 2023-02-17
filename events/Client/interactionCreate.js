const Discord = require("discord.js")
// Event: interactionCreate = help
module.exports = async (client, interaction) => {


  if (interaction.customId == "ADMIN") {
    var types = ["admin"];

    let embeds = [];
    for (let i = 0; i < types.length; i++) {

      var cmd = client.commands.filter(c => c.type && c.type == types[i])
      if (cmd.size != 0) {
        let add = new Discord.MessageEmbed()
          .setColor("LIGHT_GREY")
          .setFields([
            {
              name: `${types[i].toUpperCase()}:`,
              value: `${cmd.map(c => `\`${c.name}:\` ${c.description}`).join(",\n")}`,
              inline: true
            }
          ])

        embeds.push(add);
      }
    }
    interaction.reply({ embeds: [...embeds], ephemeral: true });
  }// end

  if (interaction.customId == "GENERAL") {
    var types = ["general"];

    let embeds = [];
    for (let i = 0; i < types.length; i++) {

      var cmd = client.commands.filter(c => c.type && c.type == types[i])
      if (cmd.size != 0) {
        let add = new Discord.MessageEmbed()
          .setColor("LIGHT_GREY")
          .setFields([
            {
              name: `${types[i].toUpperCase()}:`,
              value: `${cmd.map(c => `\`${c.name}:\` ${c.description}`).join(",\n")}`,
              inline: true
            }
          ])

        embeds.push(add);
      }
    }
    interaction.reply({ embeds: [...embeds], ephemeral: true });
  }// end

  if (interaction.customId == "OWNERSHIP") {
    var types = ["ownerShip"];

    let embeds = [];
    for (let i = 0; i < types.length; i++) {

      var cmd = client.commands.filter(c => c.type && c.type == types[i])
      if (cmd.size != 0) {
        let add = new Discord.MessageEmbed()
          .setColor("LIGHT_GREY")
          .setFields([
            {
              name: `${types[i].toUpperCase()}:`,
              value: `${cmd.map(c => `\`${c.name}:\` ${c.description}`).join(",\n")}`,
              inline: true
            }
          ])

        embeds.push(add);
      }
    }
    interaction.reply({ embeds: [...embeds], ephemeral: true });
  }// end

  if (interaction.customId == "PROTECTION") {
    var types = ["protection"];

    let embeds = [];
    for (let i = 0; i < types.length; i++) {

      var cmd = client.commands.filter(c => c.type && c.type == types[i])
      if (cmd.size != 0) {
        let add = new Discord.MessageEmbed()
          .setColor("LIGHT_GREY")
          .setFields([
            {
              name: `${types[i].toUpperCase()}:`,
              value: `${cmd.map(c => `\`${c.name}:\` ${c.description}`).join(",\n")}`,
              inline: true
            }
          ])

        embeds.push(add);
      }
    }
    interaction.reply({ embeds: [...embeds], ephemeral: true });
  }// end

  if (interaction.customId == "WELCOME") {
    var types = ["welcome"];

    let embeds = [];
    for (let i = 0; i < types.length; i++) {

      var cmd = client.commands.filter(c => c.type && c.type == types[i])
      if (cmd.size != 0) {
        let add = new Discord.MessageEmbed()
          .setColor("LIGHT_GREY")
          .setFields([
            {
              name: `${types[i].toUpperCase()}:`,
              value: `${cmd.map(c => `\`${c.name}:\` ${c.description}`).join(",\n")}`,
              inline: true
            }
          ])

        embeds.push(add);
      }
    }
    interaction.reply({ embeds: [...embeds], ephemeral: true });
  }// end


  //stats bot
  const activity = client.presence?.activities[0];
  if (interaction.customId === "playing") {

    client.user.setPresence({ activities: [{ name: activity.name, type: "PLAYING" }] });
    interaction.reply({
      content: "Updated the bot status",
      ephemeral: true
    });
  }

  if (interaction.customId === "strem") {
    client.user.setPresence({ activities: [{ name: activity.name, type: "STREAMING", url: "https://www.twitch.tv/vice-stor" }] })
    interaction.reply({
      content: "Updated the bot status",
      ephemeral: true
    });
  }

  if (interaction.customId === "lisin") {
    client.user.setPresence({ activities: [{ name: activity.name, type: "LISTENING" }] })
    interaction.reply({
      content: "Updated the bot status",
      ephemeral: true
    });
  }

  if (interaction.customId === "watc") {
    client.user.setPresence({ activities: [{ name: activity.name, type: "WATCHING" }] })
    interaction.reply({
      content: "> **Updated the bot status**",
      ephemeral: true
    });

  }
}