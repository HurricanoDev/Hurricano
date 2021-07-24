const {
    MessageEmbed
} = require("discord.js");
const Command = require("@Command");
module.exports = new Command({
    name: "cringerate",
    aliases: ["cringer8"],
    description: "How gay are you? Find out now.",
    clientPermissions: ["SEND_MESSAGES"],
    async run(message, args) {
        let rate = (Math.floor(Math.random() * Math.floor(100)));
        let user = message.mentions.users.first() || message.author;
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("CRINGE MACHINE")
            .setDescription(`You are ${rate}% cringe <:lol:868485067440287755>`)
            .setTimestamp()

        message.channel.send({
            embeds: [embed]
        });
    },
});
