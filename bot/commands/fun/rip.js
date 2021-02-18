module.exports = {
  name: "rip",
  cooldown: 5,
  args: true,
  ownerOnly: false,
  description: "Comment on someone who died!",
  run: async(message, args) => {
  
    const canvacord = require('canvacord')
    let person = message.mentions.users.first() || message.author;
    let avatar = person.displayAvatarURL({ dynamic: false, format: 'png' });
    let img = await canvacord.Canvas.rip(avatar)
    let attachment = new Discord.MessageAttachment(img, "rip.png");
    
  },
};
