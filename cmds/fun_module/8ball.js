const Discord = require("discord.js");
const botSettings = require("../../botSettings.json");

module.exports.run = async(bot, message, args) => {
    if (message.channel.id == "638246370146516992") return message.channel.send("You cannot use that command here. Use commands channel").then(msg => msg.delete(8000));

    message.channel.send(`<@${message.author.id}> ` + doMagic8BallVoodoo())

    function doMagic8BallVoodoo() {
        var rand = ['My GPU is saying yep', 'My CPU is saying no', 'Why are you even trying?', 'What do you think? NO', 'Baby baby maybe ohhh', 'Never for you', 'What the hell bro hell yeah', "Stop speaking", "Sure, why not", "My sources are saying no"];

        return rand[Math.floor(Math.random() * rand.length)];
    }
}

module.exports.help = {
    name: "8ball"
}