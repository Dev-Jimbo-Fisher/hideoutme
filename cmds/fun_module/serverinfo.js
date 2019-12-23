const Discord = require("discord.js");
const botSettings = require("../../botSettings.json");

module.exports.run = async(bot, message, args) => {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
        .setAuthor("Requested by: " + message.author.username)
        .setDescription("Server Information")
        .setColor("#15f153")
        .setThumbnail(sicon)
        .addField("Server Name", message.guild.name)
        .addField("Created On", message.guild.createdAt)
        .addField("You Joined", message.member.joinedAt)
        .addField("Total Members", message.guild.memberCount)
        .setFooter(`${botSettings["bot_settings"].copyright} | ${botSettings["bot_settings"].creator}`, bot.user.displayAvatarURL)
        .setTimestamp();

    message.channel.send(serverembed).then(msg => msg.delete(20000));
}

module.exports.help = {
    name: "serverinfo"
}