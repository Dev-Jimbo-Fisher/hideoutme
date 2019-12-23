const Discord = require("discord.js");
const botSettings = require("../../botSettings.json");

module.exports.run = async(bot, message, args) => {
    message.delete();
    let totalSeconds = (bot.uptime / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);

    let uptimeEmbed = new Discord.RichEmbed()
        .setDescription(`**Bot:** ${bot.user.username}`)
        .setThumbnail(bot.user.displayAvatarURL)
        .setColor(botSettings["bot_colors"].purple)
        .addField("Hours", hours)
        .addField("Minutes", minutes)
        .setTimestamp()
        .setFooter(`${botSettings["bot_settings"].copyright} | ${botSettings["bot_settings"].creator}`)

    message.channel.send(uptimeEmbed).then(msg => msg.delete(10000));
}

module.exports.help = {
    name: "uptime"
}