
const Discord = require('discord.js');

module.exports = {
    name: "burn",
    cooldown: 5,
    description: "Buen you!"
    run: async (client, message, args) => {
        
        const canvacord = require('canvacord')
    let person = message.mentions.users.first() || message.author;
    let avatar = person.displayAvatarURL({ dynamic: false, format: 'png' });
    let img = await canvacord.Canvas.burn(avatar, 4)
    let attachment = new Discord.MessageAttachment(img, "burn.png");
    message.channel.send(attachment)
    }
