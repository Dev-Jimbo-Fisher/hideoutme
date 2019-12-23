const Discord = require("discord.js")
const botSettings = require("../../botSettings.json");

module.exports.run = async(bot, message, args) => {
    message.delete();

    if (!message.guild.roles.find(role => role.id === botSettings["ticket_system"].support_role)) return message.channel.send(`No role to create ticket. Please contact the server owner.`).then(msg => msg.delete(15000));

    message.guild.createChannel(`ticket-${message.author.username}`, "text").then(c => {
        moveTicket(c)
        let roleSupportRole = message.guild.roles.find(role => role.id === botSettings["ticket_system"].support_role);
        let roleEveryone = message.guild.roles.find(role => role.name === "@everyone");
        c.overwritePermissions(roleSupportRole, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(roleEveryone, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.setTopic(`Ticket ID: ${message.author.id} | Creator: ${message.author.username}`)
        message.channel.send(`:white_check_mark: ***<@${message.author.id}> Your ticket has been created, <#${c.id}>.***`).then(msg => msg.delete(15000));
        const embed = new Discord.RichEmbed()
            .setColor(botSettings["bot_colors"].orange)
            .setDescription(`**Hi <@${message.author.id}>!**\n\nThank you for reaching out the **Support Team** \n\n Please explain why you have opened this ticket in the channel.\n\n **Support Staff** will be here shortly, Please be patient.\n To close this ticket use \`.close\`.`)
            .setTimestamp()
            .setFooter(`${botSettings["bot_settings"].copyright} | ${botSettings["bot_settings"].creator}`)
        c.send(embed)

        if (botconfig["ticket_system"].auto_reply) {
            if (!message.guild.channels.find(channel => channel.name === c.id)) return
            const filter = m => m.author.id === message.author.id;
            c.awaitMessages(filter, { max: 1, time: ms('1d') }).then(idfk => {
                c.send(botSettings["ticket_system"].auto_reply_message)
            })
        }
    }).catch(console.error);
    async function moveTicket(c) {
        await c.setParent(botSettings["ticket_system"].ticket_category);
    };
}

module.exports.help = {
    name: "new"
}