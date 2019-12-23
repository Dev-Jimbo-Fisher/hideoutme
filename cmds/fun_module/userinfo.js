const Discord = require("discord.js");
const botSettings = require("../../botSettings.json");

module.exports.run = async(bot, message, args) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setDescription("User: " + `${message.author}`)
        .setThumbnail(message.author.displayAvatarURL)
        .setColor("#9B59B6")
        .addField("Full Username", `${message.author.username}#${message.author.discriminator}`)
        .addField("ID", message.author.id)
        .addField("Created On", message.author.createdAt)
        .setFooter(`${botSettings.copyright} | ${botSettings.creator}`)
        .setTimestamp();

    message.channel.send(embed).then(msg => msg.delete(20000));
}

module.exports.help = {
    name: "userinfo"
}