const { MessageEmbed } = require("discord.js");
const Command = require("@Command");
module.exports = new Command({
  name: "supreme",
  args: "Please mention what you would like to set as your prefix!",
  cooldown: 5,
  description: "Convert text to supreme text :D",
  slash: true,
  double: true,
  options: [
    {
      name: "Text",
      description: "Provide text to convert to supreme text.",
      type: 3,
      required: true,
    },
  ],
  async run(message, args, quicksend) {
    const massage = args.join(" ");
    if (!massage) return message.reply(embed1);
    let hasil = `https://api.alexflipnote.dev/supreme?text=${massage}`;
    let Attach = new Discord.MessageAttachment(hasil, "supreme.png");
    message.reply(Attach);
  },
});
