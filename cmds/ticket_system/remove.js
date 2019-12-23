const Discord = require("discord.js");
const botSettings = require("../../botSettings.json");

module.exports.run = async(bot, message, args) => {
    message.delete();
    if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`Your not in a ticket channel.`).then(msg => msg.delete(5000));
    let aUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (aUser.roles.find(r => r.id === botSettings["ticket_system"].support_role)) return message.channel.send(`Invalid permissions.`).then(msg => msg.delete(5000));
    message.channel.overwritePermissions(aUser, {
        SEND_MESSAGES: false,
        READ_MESSAGES: false,
        READ_MESSAGE_HISTORY: false
    });

    const embed = new Discord.RichEmbed()
        .setColor(botSettings["bot_colors"].orange)
        .setDescription(`Removed **${aUser} (${aUser.user.tag})** to the ticket.`)

    message.channel.send(embed)
}

module.exports.help = {
    name: "remove"
}