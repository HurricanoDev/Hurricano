const Command = require("@Command");
const { MessageEmbed } = require("discord.js");
const { exec } = require("child_process");

module.exports = new Command({
  name: "pull",
  description: "Pull a change from GitHub.",
  ownerOnly: true,
  async run(message, args) {
    try {
      message.channel.startTyping();
      exec("git reset --hard");
      exec("git pull" || "date", function (err, stdout, stderr) {
        if (err) {
          const emErr = new MessageEmbed()
            .setAuthor(
              `GitHub Pull Successful!`,
              "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png"
            )
            .setDescription(
              `\`\`\`xl\n${
                err.toString().substr(0, 1000).length > 2038
                  ? "Pull summary is larger than 2038 characters."
                  : err.toString().substr(0, 1000)
              }\n\`\`\``
            )
            .setTimestamp()
            .setFooter(`Requested by: ${message.author.tag}`);
          message.channel.stopTyping(true);
          return message.channe.send({ embeds: [emErr] });
        }
        const emSuccess = new MessageEmbed()
          .setAuthor(
            `GitHub Pull Successful!`,
            "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png"
          )
          .setDescription(
            `\`\`\`xl\n${
              stdout.length > 2038
                ? "Pull summary is larger than 2038 characters."
                : stdout
            }\n\`\`\``
          )
          .setTimestamp()
          .setColor(123456)
          .setFooter(`Requested by: ${message.author.tag}`);
        message.channel.stopTyping(true);
        return message.channel.send({ embeds: [emSuccess] }).catch((err) => {
          const emSuccess = new MessageEmbed()
            .setAuthor(
              `GitHub Pull Successful!`,
              "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png"
            )
            .setDescription(
              `\`\`\`xl\n${
                stdout.length > 2038
                  ? "Pull summary is larger than 2038 characters."
                  : stdout
              }\n\`\`\``
            )
            .setTimestamp()
            .setColor(123456)
            .setFooter(`Requested by: ${message.author.tag}`);
          message.channel.send({ embeds: [emSuccess] });
          return message.channel.stopTyping(true);
        });
      });
    } catch (err) {
      const embed = new MessageEmbed()
        .setAuthor(
          `GitHub Pull Successful!`,
          "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png"
        )
        .setDescription(
          `\`\`\`xl\n${
            stdout.length > 2038
              ? "Pull summary is larger than 2038 characters."
              : stdout
          }\n\`\`\``
        )
        .setTimestamp()
        .setColor(123456)
        .setFooter(`Requested by: ${message.author.tag}`);
      message.channel.send({ embeds: [embed] });
      return message.channel.stopTyping(true);
    }
    let response;
    const permissionEmbed = new MessageEmbed()
      .setTitle("Would you like to reboot the bot now?")
      .setDescription(
        "If you would like to reboot the bot now, please respond with `yes`, and if not, please respond with `no`. You have 20 seconds."
      )
      .setFooter(`For ${message.author.tag}`);
    message.channel.send({ embeds: [permissionsEmbed] });
    await message.channel
      .awaitMessages({
        filter: (m) => m.author.id === message.author.id,
        max: 1,
        time: 20000,
        errors: ["time"],
      })
      .then((collected) => {
        response = collected.first().content.toLowerCase();
      });
    if (
      (!response.includes("yes") && !response.includes("no")) ||
      (!response.includes("no") && !response.includes("yes"))
    ) {
      message.sendErrorReply(
        "Invalid Response Provided",
        "You did not provide a valid response (`yes` or `no`). I will not reboot the bot right now."
      );
    }
    if (response.includes("yes")) {
      await message.channel.sendSuccess(
        message,
        "Rebooting...",
        "Rebooting the bot now."
      );
      setTimeout(() => {
        process.exit();
      }, 1000);
    }
    if (response.includes("no")) {
      await message.channel.sendSuccess(
        message,
        "Reboot Cancelled.",
        "Will not reboot the bot now."
      );
    }
  },
});
