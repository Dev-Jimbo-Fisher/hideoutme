const Discord = require("discord.js");
const ms = require("ms");
const botSettings = require("../../botSettings.json");

module.exports.run = async(bot, message, args) => {
    message.delete();
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Higher Permission Needed!").then(msg => msg.delete(10000));
    const mod = message.author;

    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!user) return message.channel.send("Couldn't find user.").then(msg => msg.delete(10000));
    if (user.hasPermission("MANAGE_MESSAGES")) return message.reply("Nice try!").then(msg => msg.delete(5000));

    let time = message.content.split(" ").slice(2).join(" ");
    if (!time) {
        time = "2m";
    }

    if (botSettings["module_toggles"].mod_logs) {
        const muteEmbed = new Discord.RichEmbed()
            .setColor(botSettings["bot_colors"].blue)
            .setDescription('User Muted')
            .addField('User', `${user} - Hash: ${user.user.tag} - ID: ${user.id}`)
            .addField("Muted By", `${mod} - Hash: ${mod.tag} - ID: ${mod.id}`)
            .addField('Time', `${time}`)

        let muteChannel = message.guild.channels.find(channel => channel.id === botSettings["log_channels"].mute_logs_channel);
        if (!muteChannel) return console.log("Channel not found");
        muteChannel.send(muteEmbed);
    }


    let muteRole = message.guild.roles.find(role => role.name === botSettings["mod_module"].mute_role);
    if (!muteRole) return console.log("Role not found");

    await (user.addRole(muteRole.id));
    message.channel.send(`<@${user.id}> has been temporarily muted for ${time}`).then(msg => msg.delete(60000));

    setTimeout(function() {
        user.removeRole(muteRole.id)
        message.reply(`<@${user.id}> has been unmuted.`).then(msg => msg.delete(60000));
    }, ms(time))

    await (user.addRole(muteRole.id));

    if (botSettings["mod_module"].dm_muted_user) {
        try {
            await user.send(`**Notification** \nThis is a notification to say that you have been muted in '${message.guild.name}' \nTime: ${time}`);
        } catch (e) {
            // console.log(e.stack);
            console.log('\x1b[33m%s\x1b[0m', "dm's are locked.");
        }
    }
}

module.exports.help = {
    name: "mute"
}