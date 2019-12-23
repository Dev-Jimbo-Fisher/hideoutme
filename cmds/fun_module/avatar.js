const Discord = require("discord.js");
const botSettings = require("../../botSettings.json");

module.exports.run = async(bot, message, args) => {
    let msg = await message.channel.send("Generating avatar...");

    await message.channel.send({
        files: [{
            attachment: message.author.displayAvatarURL,
            name: "avatar.png"
        }]
    });

    message.delete(10);
}

module.exports.help = {
    name: "avatar"
}