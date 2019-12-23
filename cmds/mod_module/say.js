const Discord = require("discord.js");
const botSettings = require("../../botSettings.json");

module.exports.run = async(bot, message, args) => {

    message.delete();
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Invalid permissions.").then(msg => msg.delete(10000));
    let botMessage = args.join(" ");

    if (botMessage.length < 1) return message.channel.send("Please specify a message").then(msg => msg.delete(5000));
    message.channel.send(botMessage);

}

module.exports.help = {
    name: "say"
}