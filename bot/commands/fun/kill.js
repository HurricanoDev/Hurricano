const Discord = require("discord.js");
const Command = require("@Command");
module.exports = new Command({
    name: "kill",
    userPermissions: ["SEND_MESSAGES"],
    cooldown: 20,
    description: "sends a kill message of the user mentioned",
    async run(message, args) {
        if (!args[0]) return message.channel.send(`Wow, that was great..But who do I kill?`)
        let userr = await client.functions.getMember(false, message, args[0])
        if (!userr) return message.channel.send(`Wow, that was great..But who do I kill?`)
        let user = userr.user.username;
        const answers = [
            `${message.author.username} sat on ${user}, as the other sadly *suffocated*`,
            `${user} dies from dancing too hard`,
            `${user} died from a heart attack`,
            `${user} died from not eating much ass`,
            `..Noo, ${message.author.username} killed him right away, ${user} seems really nice.. why him`,
            `${user} went to fight ${message.author.username}, but got **knocked** out on first round  `,
            `${user} tripped and sadly died`,
            `${user} was begging for forgiveness, but ${message.author.username} killed him right away`,
            `${user} died from aids`,
            `${message.author.username} couldn't handle ${user}'s stupidity, so he shot him`,
            `${user} died while climbing the wall of China`,
            `${user} died while *robbing* a bank`,
            `${user} died while studying history`,
            `${message.author.username} sat on ${user} killing him`,
            `${message.author.username} slapped ${user}.. rip`,
            `${user} is just too weak to handle this`,
            `Novus sat on ${user}, the other sadly *suffocated*`,
            `Novus slapped  ${user}.. rip }`,
            `${message.author.username} crushes ${user} with a microwave`,
            `${user} starved to death`,
            `Sorry ${message.author.username}, ${user} seems really innocent`,
            `${user} seems too nice, I can't `,
            `${user} got hit by a car `,
        ]
        if (userr.id === message.author.id) return message.channel.send(`Bruh, you seem depressed.. How can I help?`)
        message.channel.send(`${answers[Math.floor(Math.random() * answers.length)]}`)
    },
});
