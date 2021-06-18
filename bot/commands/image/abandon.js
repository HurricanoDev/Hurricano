const Discord = require("discord.js"),
  { MessageAttachment } = require("discord.js");
const Command = require("@Command");
const {
  MessageEmbed,
  MessageAttachment
} = require("discord.js");
const Meme = require("memer-api");
const memer = new Meme(config.meme);
module.exports = new Command({
  name: "abandon",
  cooldown: 5,
  description: "A image command.",
  async run(message, args) {
    var tempmsg = await message.channel.send(new MessageEmbed()
      .setColor('#403B3A')
      .setAuthor("Getting Image Data..", "https://images-ext-1.discordapp.net/external/ANU162U1fDdmQhim_BcbQ3lf4dLaIQl7p0HcqzD5wJA/https/cdn.discordapp.com/emojis/756773010123522058.gif")
    );
    //get the additional text
    var text = args.join(" ");
    //If no text added, return error
    if (!text) return tempmsg.edit(tempmsg.embeds[0]
      .setTitle(":x: You did not enter a Valid Text!")
      .setColor("RED")
      .setDescription(`Useage: \`n.abandon <TEXT>\``)
    ).catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray))

    //get the memer image
    memer.abandon(text).then(image => {
      //make an attachment
      var attachment = new MessageAttachment(image, "abandon.png");
      //delete old message
      tempmsg.delete();
      //send new Message
      message.channel.send(tempmsg.embeds[0]
        .setAuthor(`Meme for: ${message.author.tag}`, message.author.displayAvatarURL())
        .setImage("attachment://abandon.png")
        .attachFiles(attachment)
      ).catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray))
    })
    });
  },
});
