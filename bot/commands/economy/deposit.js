const Command = require("@Command");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "deposit",
  description: "Deposit some money into your bank.",
  aliases: ["dep"],
  cooldown: 10,
  async run(message, args) {
    let userData = await client.db.users.cache.get(message.author.id);
    if (userData.wallet === 0)
      return message.sendErrorReply(
        "Error!",
        "You have nothing to deposit, try earning some money first!"
      );

    let depAmount = args[0];
    if (!depAmount)
      return message.sendErrorReply(
        "Error!",
        "Please give me an amount to deposit."
      );
    if (depAmount === "max") {
      userData.bank = +userData.bank + +userData.wallet;
      userData.wallet = 0;
      message.reply(
        `🪙 **${userData.wallet}** deposited, now you have **${
          userData.bank
        }** in your bank.`
      );
      await userData.save();
    }

    if (isNaN(depAmount))
      return message.sendErrorReply(
        "Error!",
        "You have to give me a **number** to deposit."
      );
    if (depAmount > userData.wallet)
      return message.sendErrorReply(
        "Error!",
        `You don't have that much money to deposit. You only have **${userData.wallet}** coins in your wallet.`
      );

    let bankAmount = userData.bank;
    userData.bank = +depAmount + +bankAmount;
    userData.wallet = userData.wallet - depAmount;

    await userData.save();
    message.reply(
      `**${depAmount}** deposited, now you have **${userData.bank}** in your bank.`
    );
  },
});
