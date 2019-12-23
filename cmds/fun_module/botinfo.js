const Discord = require("discord.js");
const botSettings = require("../../botSettings.json");



module.exports.run = async(bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
        .setAuthor("Requested by: " + message.author.username)
        .setDescription(`Information about ${bot.user.username}`)
        .setColor(botSettings["bot_colors"].red)
        .setThumbnail(bicon)
        .addField("``Bot Name: ``", bot.user.username)
        .addField("``Created On: ``", bot.user.createdAt)
        .addField("``ID: ``", bot.user.id)
        .setFooter(`${botSettings["bot_settings"].copyright} | ${botSettings["bot_settings"].creator}`, bot.user.displayAvatarURL)
        .setTimestamp();

    message.channel.send(botembed).then(msg => msg.delete(20000));
}

module.exports.help = {
    name: "botinfo"
}