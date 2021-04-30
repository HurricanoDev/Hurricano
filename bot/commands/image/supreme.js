const { MessageEmbed } = require("discord.js");
const Command = require("@Command");
module.exports = new Command({
  name: "supreme",
  args: "Please provide something to supreme!",
  cooldown: 5,
  description: "Convert text to supreme text :D",
  slash: false,
  async run(message, args, quicksend) {
    let massage = args.join(" ")
    let hasil = `https://api.alexflipnote.dev/supreme?text=${massage}`;
    let Attach = new Discord.MessageAttachment(hasil, "supreme.png");
    message.reply(Attach);
  },
});
