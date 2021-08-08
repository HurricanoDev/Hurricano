const Command = require("@Command");
const { Util, MessageEmbed } = require("discord.js");
const { parse } = require("twemoji-parser");
module.exports = new Command({
  name: "purge",
  description:
    "lets the user bulk delete old messages(upto 100) after last 14 days ",
  usage: "hr!purge <number_message>",
  userPermissions: ["MANAGE_MESSAGES"],
  async run(message, args) {
    if (!args[0])
      return message.channel.send(
        "You must state a number of messages to purge. `hr!purge <number_message>`",
      );
    const amountToDelete = Number(args[0], 10);

    if (isNaN(amountToDelete))
      return message.channel.send("Number stated is not a valid number.");
    if (!Number.isInteger(amountToDelete))
      return message.channel.send("Number stated must be a  whole number.");
    if (!amountToDelete || amountToDelete < 2 || amountToDelete > 100)
      return message.channel.send(
        "The number stated must be between 2 and 100.",
      );
    const fetched = await message.channel.messages.fetch({
      limit: amountToDelete,
    });
    try {
      await message.channel.bulkDelete(fetched).then((messages) =>
        message.channel
          .send(`Deleted ${messages.size} messages!`)
          .then((message) => {
            message.delete({ timeout: 5 });
          }),
      );
    } catch (err) {
      console.log(err);
      message.channel.send(
        `I was unable to delete the amount stated make sure they are within 14 days old.`,
      );
    }
  },
});
