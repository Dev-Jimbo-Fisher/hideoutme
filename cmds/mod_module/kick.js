const Discord = require("discord.js");
const fs = require("fs");
const botSettings = require("../../botSettings.json");

module.exports.run = async(bot, message, args) => {
    message.delete();
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!kUser) return message.channel.send("Please provide a name.").then(msg => msg.delete(10000));
    let kReason = args.join(" ").slice(22);
    if (!kReason) return message.channel.send("Please provide a reason.").then(msg => msg.delete(10000));
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Higher Permissions Needed.").then(msg => msg.delete(10000));
    if (kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Higher Permissions Needed.").then(msg => msg.delete(10000));

    if (botSettings["module_toggles"].mod_logs) {
        let kickEmbed = new Discord.RichEmbed()
            .setDescription("User Kicked")
            .setColor(botSettings["bot_colors"].yellow)
            .addField("Kicked User", `${kUser} - Hash: ${kUser.user.tag} - ID: ${kUser.id}`)
            .addField("Kicked By", `<@${message.author.id}> - Hash: ${message.author.tag} - ID: ${message.author.id}`)
            .addField("Kicked In", message.channel)
            .addField("Time", message.createdAt)
            .addField("Reason", `${kReason}.`)
            .setTimestamp();

        let kickChannel = message.guild.channels.find(channel => channel.id === botSettings["log_channels"].kick_logs_channel);
        if (!kickChannel) return console.log("Channel not found ");
        kickChannel.send(kickEmbed);
    }
    if (botSettings["mod_module"].dm_kicked_user) {
        try {
            await kUser.send(`**Notification** \nThis is a notification to say that you have been kicked from ${message.guild.name} for the following reason(s): \n${kReason}`);
        } catch (e) {
            console.log('\x1b[33m%s\x1b[0m', "dm's are locked.");
        }
    }
    message.guild.member(kUser).kick(kReason);
    message.channel.send(`:white_check_mark: ${kUser} (${kUser.user.tag}) **has been kicked from the Discord for: ${kReason}**`)
}

module.exports.help = {
    name: "kick"
}