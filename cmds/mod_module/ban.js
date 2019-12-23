const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const botSettings = require("../../botSettings.json");

module.exports.run = async(bot, message, args) => {
    message.delete();
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!bUser) return message.channel.send("Please provide a name.").then(msg => msg.delete(10000));
    let bReason = args.join(" ").slice(22);
    if (!bReason) return message.channel.send("Please provide a reason.").then(msg => msg.delete(10000));
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Higher Permission Needed.").then(msg => msg.delete(10000));
    if (bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("Higher Permission Needed.").then(msg => msg.delete(10000));

    if (botSettings["module_toggles"].mod_logs) {
        let banEmbed = new Discord.RichEmbed()
            .setDescription("User Banned")
            .setColor(botSettings["bot_colors"].blue)
            .addField("Banned User", `${bUser} - Hash: ${bUser.user.tag} - ID: ${bUser.id}`)
            .addField("Banned By", `<@${message.author.id}> - Hash: ${message.author.tag} - ID: ${message.author.id}`)
            .addField("Banned In", message.channel)
            .addField("Time", message.createdAt)
            .addField("Reason", `${bReason}.`);

        let banChannel = message.guild.channels.find(channel => channel.id === botSettings["log_channels"].ban_logs_channel);
        if (!banChannel) return console.log("Channel not found");
        banChannel.send(banEmbed)
    }

    if (botSettings["mod_module"].dm_banned_user) {
        try {
            await bUser.send(`**Notification** \nThis is a notification to say that you have been banned from ${message.guild.name} for the following reason(s): \n${bReason}.*`);
        } catch (e) {
            console.log('\x1b[33m%s\x1b[0m', "dm's are locked");
        }
    }

    message.channel.send(`:white_check_mark: ${bUser} (${bUser.user.tag}) **has been banned from the Discord for: ${bReason}**`)
    message.guild.member(bUser).ban(bReason);
}

module.exports.help = {
    name: "ban"
}