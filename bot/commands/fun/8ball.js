const Discord = require("discord.js");
const Command = require("@Command");
const responses = [
  "It is certain.", "It is decidedly so.", "Without a doubt.", "Yes - definitely.", "You may rely on it.", "As I see it, yes.",
  "Most likely.", "Outlook good.", "Yes.", "Signs point to yes.", "Reply hazy, try again.", "Ask again later.", "Better not tell you now.",
  "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good.",
  "Very doubtful.",
];
module.exports = new Command({
  name: "8ball",
  userPermissions: ["SEND_MESSAGES"],
  cooldown: 20,
  description:
    "gives a random response to the question asked by the user.",
  async run(message, args) {
    var ques = args.splice(1).join('');
    if (!ques) return message.reply("This is 8ball. You need to ask a question.");

    const number = Math.floor(Math.random() * responses.length);
    message.channel.send(responses[number]);
  },
});
