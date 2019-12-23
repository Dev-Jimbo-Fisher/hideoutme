// Required Packages
const Discord = require("discord.js");
const fs = require("fs");

// Constant Variables
const tokenfile = require(__dirname + "/token.json");
const botSettings = require(__dirname + "/botSettings.json");
const prefix = botSettings["bot_settings"].prefix;

const bot = new Discord.Client({ disableEveryone: true });
bot.commands = new Discord.Collection();

fs.readdir(__dirname + "/cmds/", (err, files) => {
    if (err) console.error(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) {
        console.log("commands failed");
        return;
    }

    console.log(`Loading ${jsfiles.length} commands!`)

    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        if (botSettings["bot_settings"].debug_mode) {
            console.log(`${i + 1}: ${f} loaded`)
        }

        bot.commands.set(props.help.name, props);
        bot.commands.set(props.help.name2, props);
        bot.commands.set(props.help.name3, props);
    });


    if (botSettings["module_toggles"].ticket_system) {
        fs.readdir("./cmds/ticket_system/", (err, files) => {
            if (err) console.log(err);
            let jsfile = files.filter(f => f.split(".").pop() === "js")
            if (jsfile.length <= 0) {
                console.log('\x1b[31m%s\x1b[0m', "Could not find folder: ticket_system");
                return;
            }

            jsfile.forEach((f, i) => {
                let props = require(`./cmds/ticket_system/${f}`);
                if (botSettings["bot_settings"].debug_mode) {
                    console.log(`${f} loaded!`);
                }

                bot.commands.set(props.help.name, props);
                bot.commands.set(props.help.name2, props);
            });
            console.log('\x1b[35m%s\x1b[0m', "- Ticket Module Loaded!")
        });
    }

    if (botSettings["module_toggles"].fun_commands) {
        fs.readdir("./cmds/fun_module/", (err, files) => {
            if (err) console.log(err);
            let jsfile = files.filter(f => f.split(".").pop() === "js")
            if (jsfile.length <= 0) {
                console.log('\x1b[31m%s\x1b[0m', "Could not find folder: fun_module");
                return;
            }

            jsfile.forEach((f, i) => {
                let props = require(`./cmds/fun_module/${f}`);
                if (botSettings["bot_settings"].debug_mode) {
                    console.log(`${f} loaded!`);
                }

                bot.commands.set(props.help.name, props);
                bot.commands.set(props.help.name2, props);
            });
            console.log('\x1b[35m%s\x1b[0m', "- Fun Module Loaded!")
        });
    }

    if (botSettings["module_toggles"].mod_commands) {
        fs.readdir("./cmds/mod_module/", (err, files) => {
            if (err) console.log(err);
            let jsfile = files.filter(f => f.split(".").pop() === "js")
            if (jsfile.length <= 0) {
                console.log('\x1b[31m%s\x1b[0m', "Could not find folder: mod_module");
                return;
            }

            jsfile.forEach((f, i) => {
                let props = require(`./cmds/mod_module/${f}`);
                if (botSettings["bot_settings"].debug_mode) {
                    console.log(`${f} loaded!`);
                }

                bot.commands.set(props.help.name, props);
                bot.commands.set(props.help.name2, props);
            });
            console.log('\x1b[35m%s\x1b[0m', "- Mod Module Loaded!")
        });
    }

    if (botSettings["module_toggles"].util_commands) {
        fs.readdir("./cmds/util_cmds/", (err, files) => {
            if (err) console.log(err);
            let jsfile = files.filter(f => f.split(".").pop() === "js")
            if (jsfile.length <= 0) {
                console.log('\x1b[31m%s\x1b[0m', "Could not find folder: util_cmds");
                return;
            }

            jsfile.forEach((f, i) => {
                let props = require(`./cmds/util_cmds/${f}`);
                if (botSettings["bot_settings"].debug_mode) {
                    console.log(`${f} loaded!`);
                }

                bot.commands.set(props.help.name, props);
                bot.commands.set(props.help.name2, props);
                bot.commands.set(props.help.name3, props);
            });
            console.log('\x1b[35m%s\x1b[0m', "- Utility Module Loaded!")
        });
    }
    console.log('\x1b[34m%s\x1b[0m', "- Logging Module Loaded!")
    console.log('\x1b[34m%s\x1b[0m', "- Welcome Module Loaded!")
    console.log('\x1b[34m%s\x1b[0m', "- Role Module Loaded!")
    console.log('\x1b[34m%s\x1b[0m', "- Member Module Loaded!")
    console.log('\x1b[32m%s\x1b[0m', "- Blue = No Actually Module! \n ----------------------------")
    console.log('\x1b[32m%s\x1b[0m', "- Purple = Actual Module!")
});

// Bot basic status. Controls mutes and Link gen
bot.on("ready", async() => {

    console.log('\x1b[35m%s\x1b[0m', ` ---------------------------- \n ${bot.user.username} is online and set up! I'm on ${bot.guilds.size} servers.`);
    console.log('\x1b[33m%s\x1b[0m', " ----------------------------\n Date: 12/12/19 \n Raw Code: 1400+ Lines \n Creator: Jimbo Fisher \n Community: Los Angeles DPS \n ----------------------------")
    bot.user.setActivity(botSettings["bot_status"].bot_game, { type: botSettings["bot_status"].bot_game_type });
    bot.user.setStatus(botSettings["bot_status"].bot_statuss)

    var autoChannel = bot.channels.find(channel => channel.id === "655402314374578176");

    setInterval(() => {

        let aEmbed = new Discord.RichEmbed()
            .setAuthor(`${bot.user.username}`, bot.user.displayAvatarURL)
            .setThumbnail(bot.user.displayAvatarURL)
            .setDescription('Hi everyone! \n \n If you are interested in being apart of a department, please head over to the #links channel for an application! We are hiring in all departments! Hope to see people apply! \n \n If you have not already signed up for our cad system, please go head over to the #cad channel and click the link and register! \n \n If you have any questions feel free to message anyone on the **Leadership Team**! Goodbye!')
            .setColor(`${botSettings["bot_colors"].orange}`)
            .setTimestamp()
            .setFooter(`${botSettings["bot_settings"].copyright} | ${botSettings["bot_settings"].creator}`);
        autoChannel.send(aEmbed);
    }, 3600000);

    try {
        let link = await bot.generateInvite(["ADMINISTRATOR"]);
        console.log('\x1b[35m%s\x1b[0m', `${link}`);
    } catch (e) {
        console.log(e.stack);
    }

});

bot.on("guildMemberAdd", member => {

    if (botSettings["module_toggles"].role_join) {
        var role = member.guild.roles.find(role => role.id === botSettings["join_roles"].role);
        if (!role) return console.log("role not found");
        member.addRole(role);
    }

    const channel = member.guild.channels.find(channel => channel.id === "655373596834660362");

    let welcomeEmbed = new Discord.RichEmbed()
        .setAuthor(`${bot.user.username}`, bot.user.displayAvatarURL)
        .setThumbnail(member.user.displayAvatarURL)
        .setDescription(`**Welcome to the Los Angeles DPS Discord!**`)
        .addField("Requirements", `Hello ${member}. We ask you to head over to the #rules channel and read over them. It holds discord and server rules.`)
        .addField("Role Information", `${member} Please head over to the #notify-roles channel. You can get access to our Economy and Menu channels. It will also give you access to the cad system!`)
        .addField("Extra Information", `${member} If you have any questions feel free to message anyone on **Leadership Team** for help. \n We also have a custom discord bot! .help for commands!`)
        .setColor(`${botSettings["bot_colors"].light_blue}`)
        .setTimestamp()
        .setFooter(`${botSettings["bot_settings"].copyright} | ${botSettings["bot_settings"].creator}`);
    channel.send(welcomeEmbed)

    if (member.guild.id !== botSettings["bot_stats"].guildID) return;

    bot.channels.get(botSettings["bot_stats"].memberCountID).setName(`Discord Members: ${member.guild.members.filter(m => !m.user.bot).size}`); // Discord Members
    bot.channels.get(botSettings["bot_stats"].botCountID).setName(`Discord Bots: ${member.guild.members.filter(m => m.user.bot).size}`); // Discord Bots

});

bot.on("guildMemberRemove", member => {

    if (member.guild.id !== botSettings["bot_stats"].guildID) return;

    bot.channels.get(botSettings["bot_stats"].memberCountID).setName(`Discord Members: ${member.guild.members.filter(m => !m.user.bot).size}`); // Discord Members
    bot.channels.get(botSettings["bot_stats"].botCountID).setName(`Discord Bots: ${member.guild.members.filter(m => m.user.bot).size}`); // Discord Bots

});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefixes = JSON.parse(fs.readFileSync("./botSettings.json", "utf8"));
    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: botSettings["bot_settings"].prefix
        };
    }

    let prefix = prefixes[message.guild.id].prefixes;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if (!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length))
    if (cmd) cmd.run(bot, message, args);

    if (botSettings["module_toggles"].mod_logs) {
        const cmdChannel = message.guild.channels.find(channel => channel.id === botSettings["log_channels"].command_logs_channel);
        if (!cmdChannel) return console.log("Channel not found (Config: 'commands_logs_channel')");
        const logEmbed = new Discord.RichEmbed()
            .setAuthor("Command Logs")
            .setColor(botSettings["bot_colors"].pink)
            .setDescription(`**${message.author} (${message.author.tag})** used command: \n\`\`\`css\n${command} ${args}\`\`\``.split(',').join(' '))
            .setTimestamp()
        cmdChannel.send(logEmbed)
    }

});

// START OF ALL LOGS

bot.on("messageDelete", message => {
    if (botSettings["module_toggles"].logs) {
        if (message.channel.type === 'dm') return;
        if (message.content.startsWith("!")) return undefined;
        if (message.content.startsWith(".")) return undefined;
        if (message.content.startsWith("?")) return undefined;
        if (message.content.startsWith("-")) return undefined;
        if (message.author.bot) return undefined;
        if (message.content.length > 1020) return undefined;

        let logEmbed = new Discord.RichEmbed()
        logEmbed.setAuthor("Action Logs", bot.user.avatar_url)
        logEmbed.setColor(botSettings['bot_colors'].pink)
        logEmbed.setTimestamp()
        logEmbed.setFooter(`${botSettings["bot_settings"].copyright} | ${botSettings["bot_settings"].creator}`)

        logEmbed.setDescription("**Action:** Message Delete")
        logEmbed.addField("Message Author:", `${message.author.toString()} - Hash: ${message.author.tag} - ID: ${message.author.id}`)
        logEmbed.addField("Channel:", message.channel)
        logEmbed.addField("Message Content:", `${message.content}.`)

        let logChannel = message.guild.channels.find(channel => channel.id === botSettings["log_channels"].general_logs_channel);
        if (!logChannel) return console.log("leave channel not found");
        logChannel.send(logEmbed);
    }
});

bot.on("messageUpdate", (oldMessage, newMessage) => {
    if (botSettings["module_toggles"].logs) {
        if (oldMessage.author.bot) return undefined;
        if (oldMessage.content.length > 1020) return undefined;
        if (newMessage.content.length > 1020) return undefined;
        if (!oldMessage.guild) return undefined;

        let logEmbed = new Discord.RichEmbed()
        logEmbed.setAuthor("Action Logs", bot.user.avatar_url)
        logEmbed.setColor(botSettings["bot_colors"].pink)
        logEmbed.setTimestamp()
        logEmbed.setFooter(`${botSettings["bot_settings"].copyright} | ${botSettings["bot_settings"].creator}`)

        logEmbed.setDescription("**Action:** Message Edited")
        logEmbed.addField("Old Content", `${oldMessage.content}.`)
        logEmbed.addField("New Content", `${newMessage.content}.`)
        logEmbed.addField("Message Author:", `${newMessage.author.toString()} - Hash: ${newMessage.author.tag} - ID: ${newMessage.author.id}`)
        logEmbed.addField("Channel", oldMessage.channel)

        let logChannel = newMessage.guild.channels.find(channel => channel.id === botSettings["log_channels"].general_logs_channel);
        if (!logChannel) return console.log("leave channel not found (Config: 'general_logs_channel')");
        logChannel.send(logEmbed);
    }
});

// Member Update Logger
bot.on("guildMemberUpdate", async(oldMember, newMember) => {
    setTimeout(async() => {
        var Change = {
            rolesGiven: {
                update: false,
                updateArray: ""
            },
            rolesRemoved: {
                update: false,
                updateArray: ""
            },
            nickname: {
                update: false,
                updateArray: []
            }
        };

        const entry = await newMember.guild.fetchAuditLogs({ type: 'MEMBER_UPDATE' }).then(audit => audit.entries.first())

        oldMember.roles.forEach(function(rInfo) {
            if (newMember.roles.find(roles => roles.id == rInfo.id) == null) {
                Change.rolesRemoved.updateArray = rInfo.id;
                Change.rolesRemoved.update = true;
            }
        });

        newMember.roles.forEach(function(rInfo) {
            if (oldMember.roles.find(roles => roles.id == rInfo.id) == null) {
                Change.rolesGiven.updateArray = rInfo.id;
                Change.rolesGiven.update = true;
            }
        });

        // Check If Member Has Been Given A New Nickname
        if (oldMember.nickname !== newMember.nickname) {
            Change.nickname.updateArray.push({ newNickname: newMember.nickname != null ? newMember.nickname : newMember.guild.members.get(newMember.id).user.username, oldNickname: oldMember.nickname != null ? oldMember.nickname : oldMember.guild.members.get(oldMember.id).user.username });
            Change.nickname.update = true;
        }

        if (Change.nickname.update) {
            let cName = Change.nickname.updateArray[0];
            let oldName = cName.oldNickname;
            let newName = cName.newNickname;
            let member = newMember.guild.members.get(entry.target.id);

            let logEmbed = new Discord.RichEmbed()
                .setAuthor("Action Logs", bot.user.avatarURL)
                .setColor(botSettings["bot_colors"].pink)
                .setTimestamp()
                .setFooter(`${botSettings["bot_settings"].copyright} | ${botSettings["bot_settings"].creator}`)

            logEmbed.setDescription("**Action:** Nickname Changed")
            if (entry.executor.id == newMember.id) {
                logEmbed.addField(`Changed By`, `${entry.executor} ( By Himself/Herself )`, true);
            } else {
                logEmbed.addField(`Changed By`, `${entry.executor}`, true);
            }
            logEmbed.addField("Target User", `${member} - ${member.user.tag}`, true)
            logEmbed.addField("Old Nickname", oldName)
            logEmbed.addField("New Nickname", newName)

            let logChannel = oldMember.guild.channels.find(channel => channel.id === botSettings["log_channels"].general_logs_channel);
            if (!logChannel) return console.log("Channel not found ");
            logChannel.send(logEmbed);
        }

        if (Change.rolesGiven.update) {
            let addedRole = Change.rolesGiven.updateArray;

            let logEmbed = new Discord.RichEmbed()
                .setAuthor("Action Logs", bot.user.avatarURL)
                .setColor(botSettings["bot_colors"].pink)
                .setTimestamp()
                .setFooter(`${botSettings["bot_settings"].copyright} | ${botSettings["bot_settings"].creator}`)

            logEmbed.setDescription("**Action:** Roles Added")
            logEmbed.addField("Target User", `${newMember} - ${newMember.user.tag}`, true)
            logEmbed.addField("Role Added", `<@&${addedRole}>`)

            let logChannel = oldMember.guild.channels.find(channel => channel.id === botSettings["log_channels"].general_logs_channel);
            if (!logChannel) return console.log("Channel not found");
            logChannel.send(logEmbed);
        }

        if (Change.rolesRemoved.update) {
            let removedRole = Change.rolesRemoved.updateArray

            let logEmbed = new Discord.RichEmbed()
                .setAuthor("Action Logs", bot.user.avatarURL)
                .setColor(botSettings["bot_colors"].pink)
                .setTimestamp()
                .setFooter(`${botSettings["bot_settings"].copyright} | ${botSettings["bot_settings"].creator}`)

            logEmbed.setDescription("**Action:** Roles Removed")
            logEmbed.addField("Target User", `${newMember} - ${newMember.user.tag}`, true)
            logEmbed.addField("Role Removed", `<@&${removedRole}>`)

            let logChannel = oldMember.guild.channels.find(channel => channel.id === botSettings["log_channels"].general_logs_channel);
            if (!logChannel) return console.log("Channel not found");
            logChannel.send(logEmbed);
        }
    }, 200);
});

bot.login(tokenfile.token);