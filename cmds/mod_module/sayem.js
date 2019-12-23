const Discord = require("discord.js");
const botSettings = require("../../botSettings.json");

module.exports.run = async(bot, message, args) => {

    message.delete();
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Higher Permissions Need.").then(msg => msg.delete(10000));
    let botmessage = args.join(" ");
    let sayEmbed = new Discord.RichEmbed()
        .setAuthor(`Announcement from ${message.author.username}`, message.author.avatarURL)
        .setTitle('Information')
        .setThumbnail(bot.user.displayAvatarURL)
        .setColor(botSettings["bot_colors"].green)
        .setDescription(`${botmessage}.`)
        .setTimestamp()
        .setFooter(`${botSettings["bot_settings"].copyright} | ${botSettings["bot_settings"].creator}`);

    try {
        message.channel.send(sayEmbed);
    } catch (e) {
        console.log('\x1b[33m%s\x1b[0m', "Say Embed Error Occurred. Crash Prevented.");
        return
    }

}

module.exports.help = {
    name: "sayem"
}