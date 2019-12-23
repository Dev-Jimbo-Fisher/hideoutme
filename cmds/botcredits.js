const Discord = require("discord.js");
const botSettings = require("../botSettings.json");

module.exports.run = async(bot, message, args) => {
    message.delete();
    let botembed = new Discord.RichEmbed()
        .setDescription("Hideout Information")
        .setColor(botSettings["bot_colors"].red)
        .setThumbnail(bot.user.displayAvatarURL)
        .addField("Bot Name", `${bot.user.username}`)
        .addField("Servers", bot.guilds.size)
        .addField("Credits", `${botSettings["bot_settings"].creator}`)
        .addField("Information", `We designed this bot to focus around helping / supporting people. \n\n If anyone is looking to use this bot they must get permission from the Owner: ${botSettings["bot_settings"].creator}`)
        .setTimestamp()
        .setFooter(`${botSettings["bot_settings"].copyright} | ${botSettings['bot_settings'].creator}`);

    message.channel.send(botembed).then(msg => msg.delete(60000));
}

module.exports.help = {
    name: "botcredits"
}