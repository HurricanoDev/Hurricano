const Command = require('@Command');
const { MessageEmbed } = require('discord.js');

module.exports = new Command({
  name: 'withdraw',
  description: 'Withdraw some money from your bank.',
  aliases: ['with'],
  cooldown: 10,
  async run(message, args) {
    let userData = await client.db.users.cache.get(message.author.id);
    if (userData.bank === 0)
      return message.sendErrorReply(
        'Error!',
        'You have nothing to withdraw, try earning some money first!',
      );

    let withAmount = args[0];
    if (!withAmount)
      return message.sendErrorReply(
        'Error!',
        'Please give me an amount to withdraw.',
      );
    if (
      (withAmount === 'max' && withAmount !== 'max') ||
      withAmount !== 'all'
    ) {
      userData.wallet = +userData.bank + +userData.wallet;
      message.reply(
        `🪙 **${userData.bank}** withdrawn, now you have **${userData.wallet}** in your wallet.`,
      );
      userData.bank = 0;
      await userData.save();
    }

    if (isNaN(withAmount))
      return message.sendErrorReply(
        'Error!',
        'You have to give me a **number** to withdraw.',
      );
    if (withAmount > userData.bank)
      return message.sendErrorReply(
        'Error!',
        `You don't have that much money to withdraw. You only have **${userData.bank}** coins in your bank.`,
      );

    let bankAmount = userData.bank;
    userData.wallet = +withAmount + +userData.wallet;
    userData.bank = userData.bank - withAmount;

    await userData.save();
    message.reply(
      `🪙 **${withAmount}** withdrawn, now you have **${userData.wallet}** in your wallet.`,
    );
  },
});
