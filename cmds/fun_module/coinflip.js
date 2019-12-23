const Discord = require("discord.js");
const botSettings = require("../../botSettings.json");

module.exports.run = async(bot, message, args) => {

    var chance = Math.floor(Math.random() * 2);
    if (chance == 0) {
        message.reply("Your coin landed on Heads!", { files: [__dirname + "/pictures/heads.jpeg"] });
    } else {
        message.reply("Your coin landed on Tails!", { files: [__dirname + "/pictures/tails.jpeg"] });
    }

}

module.exports.help = {
    name: "coinflip"
}