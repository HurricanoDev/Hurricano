const Discord = require("discord.js");
const Command = require("@Command");

module.exports = new Command({
  name: "emojify",
  aliases: ["emjfy"],
  description: "Emojify some text!",
  clientPermissions: ["SEND_MESSAGES"],
  async run(message, args) {
    if (!args[0])
      return message.channel.sendError(
        message,
        "Error!",
        `Correct Usage: \`${message._usedPrefix}emojify <text>\``
      );

    let msg = message.content.slice(
      message.content.indexOf(args[0]),
      message.content.length
    );

    msg = msg
      .split("")
      .map((c) => {
        if (c === " ") return c;
        else if (/[0-9]/.test(c)) return numberMap[c];
        else
          return /[a-zA-Z]/.test(c)
            ? ":regional_indicator_" + c.toLowerCase() + ":"
            : "";
      })
      .join("");

    if (msg.length > 2048) {
      msg = msg.slice(0, msg.length - (msg.length - 2033));
      msg = msg.slice(0, msg.lastIndexOf(":")) + "**...**";
    }

    const embed = new Discord.MessageEmbed()
      .setTitle("Emojify")
      .setColor("BLUE")
      .setDescription(msg)
      .setFooter(
        message.member.displayName,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp();
    message.channel.send({ embeds: [embed] });
  },
});
