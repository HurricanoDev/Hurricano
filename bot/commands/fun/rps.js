const { MessageEmbed } = require("discord.js");
const rps = ["scissors", "rock", "paper"];
const res = ["Scissors :scissors:", "Rock :rock:", "Paper :roll_of_paper:"];
const Command = require("@Command");

module.exports = new Command({
  name: "rps",
  aliases: ["rockpaperscissors"],
  description: "Rock, paper, scissors with Hurricano!",
  args: "Please choose whether you'd like to choose rock paper or scissors!",
  async run(message, args) {
    let userChoice;
    if (args.length) userChoice = args[0].toLowerCase();
    userChoice = rps.indexOf(userChoice);
    const botChoice = Math.floor(Math.random() * 3);
    let result;
    if (userChoice === botChoice) result = "It's a draw!";
    else if (botChoice > userChoice || (botChoice === 0 && userChoice === 2))
      result = "**I** win! Haha!";
    else result = `**${message.member.displayName}** wins!`;
    const embed = new MessageEmbed()
      .setTitle(`${message.member.displayName} vs. Me!`)
      .addField("Your Choice:", res[userChoice])
      .addField("My Choice:", res[botChoice])
      .addField("Result", result)
      .setFooter(
        message.member.displayName,
        message.author.displayAvatarURL({ dynamic: true }),
      )
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.reply({ embeds: [embed] });
  },
});
