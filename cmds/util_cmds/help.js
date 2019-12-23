const Discord = require("discord.js");
const botSettings = require("../../botSettings.json");
const helpSettings = require("../../helpSettings.json");



module.exports.run = async(bot, message, args) => {

    let embed = new Discord.RichEmbed()
        .setAuthor("Requested by: " + message.author.username)
        .setThumbnail(message.author.displayAvatarURL)
        .setColor(`${botSettings["bot_colors"].blue}`)
        .setDescription(`${helpSettings.message_1}`)
        .addField("Fun Commands", `Command #1: ${helpSettings.cmd_1} \n Command #2: ${helpSettings.cmd_2} \n Command #3: ${helpSettings.cmd_3} \n Command #4: ${helpSettings.cmd_4} \n Command #5: ${helpSettings.cmd_5} \n Command #6: ${helpSettings.cmd_6} \n Command #7: ${helpSettings.cmd_7} \n Command #8: ${helpSettings.cmd_8}`)
        .addField("Staff Commands", `Command #9: ${helpSettings.cmd_9} \n Command #10: ${helpSettings.cmd_10} \n Command #11: ${helpSettings.cmd_11} \n Command #12: ${helpSettings.cmd_12} \n Command #13: ${helpSettings.cmd_13} \n Command #14: ${helpSettings.cmd_14} \n Command #15: ${helpSettings.cmd_15} \n Command #16: ${helpSettings.cmd_16} \n Command #17: ${helpSettings.cmd_17} \n Command #18: ${helpSettings.cmd_18} \n Command #19: ${helpSettings.cmd_19}`)
        .addField("Support Ticket Commands", `Command #20: ${helpSettings.cmd_20} \n Command #21: ${helpSettings.cmd_21} \n Command #22: ${helpSettings.cmd_22} \n Command #23: ${helpSettings.cmd_24}`)
        .addField("Helpful Commands", `Command #25: ${helpSettings.cmd_25} \n Command #26: ${helpSettings.cmd_26} \n Command #27: ${helpSettings.cmd_27} \n Command #28: ${helpSettings.cmd_28} \n Command #29: ${helpSettings.cmd_29}`)
        .addField("Extra Information", `If you need any help, Just send anyone on **Support Staff / Leadership Team ** or Just do **.new** to open a ticket.`)
        .setTimestamp()
        .setFooter(`${botSettings["bot_settings"].copyright} | ${botSettings["bot_settings"].creator}`, bot.user.displayAvatarURL);

    message.channel.send(embed).then(msg => msg.delete(30000));

}

module.exports.help = {
    name: "help"
}