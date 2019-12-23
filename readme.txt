bot.on("message", (message) => {
    if (message.content.startsWith(`${botSettings["bot_settings"].prefix}help`)) {
        let embed = new Discord.RichEmbed()
            .setAuthor("Requested by: " + message.author.username)
            .setThumbnail(message.author.displayAvatarURL)
            .setColor(`${botSettings["bot_colors"].blue}`)
            .setDescription(`${botSettings["bot_help"].message_1}`)
            .addField("**Commands**: 1 & 2", `Command #1: ${botSettings["bot_help"].cmd_1}\n Command #2: ${botSettings["bot_help"].cmd_2}`)
            .addField("**Commands**: 3, 4, 5 & 6", `Command #3: ${botSettings["bot_help"].cmd_3}\n Command #4: ${botSettings["bot_help"].cmd_4}\n Command #5: ${botSettings["bot_help"].cmd_5}\n Command #6: ${botSettings["bot_help"].cmd_6}`)
            .addField("**Commands**: 7, 8 & 9", `Command #7: ${botSettings["bot_help"].cmd_7}\n Command #8: ${botSettings["bot_help"].cmd_8}\n Command #9: ${botSettings["bot_help"].cmd_9}`)
            .addField("**Commands**: 10, 11, 12, 13 & 14", `Command #10: ${botSettings["bot_help"].cmd_10}\n Command #11: ${botSettings["bot_help"].cmd_11}\n Command #12: ${botSettings["bot_help"].cmd_12}\n Command #13: ${botSettings["bot_help"].cmd_13}\n Command #14: ${botSettings["bot_help"].cmd_14}`)
            .setTimestamp()
            .setFooter(`${botSettings["bot_settings"].copyright} | ${botSettings["bot_settings"].creator}`, bot.user.displayAvatarURL);

        message.channel.send(embed);
    }
});


// Support System
bot.on("message", (message) => {

    if (message.author.bot) return;
    if (message.content.toLowerCase() === `${botSettings["bot_settings"].prefix}new` && message.channel.id === '655675613658480661') {
        if (userTickets.has(message.author.id) || message.guild.channels.some(channel => channel.name.toLowerCase() === message.author.username + '-ticket')) {
            message.author.send("You already have a ticket");
        } else {
            let guild = message.guild;
            guild.createChannel(`${message.author.username}-ticket`, {
                type: 'text',
                permissionOverwrites: [{
                        allow: 'VIEW_CHANNEL',
                        id: message.author.id
                    },
                    {
                        deny: 'VIEW_CHANNEL',
                        id: guild.id
                    },
                    {
                        allow: 'VIEW_CHANNEL',
                        id: '653117005863321611'
                    }
                ]
            }).then(ch => {
                console.log("Created " + ch.name + " channel.");
                userTickets.set(message.author.id, ch.id);
                console.log(userTickets);
                message.channel.send(`:white_check_mark: You're ticket has been created. ${message.author.username}`).then(msg => msg.delete(5000));
            }).catch(err => console.log(err));

        }
    } else if (message.content.toLowerCase() === `${botSettings["bot_settings"].prefix}close`) {
        if (userTickets.has(message.author.id)) {
            if (message.channel.id === userTickets.get(message.author.id)) {
                message.channel.delete('closing ticket')
                    .then(channel => {
                        console.log("Deleted " + channel.name);
                        userTickets.delete(message.author.id);
                    })
                    .catch(err => console.log(err));
            }
        }
        if (message.guild.channels.some(channel => channel.name.toLowerCase() === message.author.username + '-ticket')) {

            message.guild.channels.forEach(channel => {
                if (channel.name.toLowerCase() === message.author.username + '-ticket') {
                    channel.delete().then(ch => console.log('Deleted Channel ' + ch.id))
                        .catch(err => console.log(err));
                }
            })

        }
    }

});