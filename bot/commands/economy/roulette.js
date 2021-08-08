const Command = require("@Command");
const Discord = require("discord.js");

module.exports = new Command({
  name: "roulette",
  cooldown: 30,
  description: "Come play roulette!",
  aliases: ["roul"],
  async run(message, args) {
    let user = message.author;
    let userDB = await client.db.users.cache.get(message.author.id);

    function isOdd(num) {
      if (num % 2 == 0) return false;
      else if (num % 2 == 1) return true;
    }

    let colour = args[0];

    let money = parseInt(args[1]);

    let moneyDB = await client.db.users.cache.get(message.author.id).wallet;
    let random = Math.floor(Math.random() * 37);

    if (!colour)
      return message.sendErrorReply(
        "Invalid Colour!",
        "Please specify a valid color.\n**Available Colors:**\n`Red [1.5x]`\n`Black [2x]`\n`Green [15x]`",
      );
    colour = colour.toLowerCase();
    if (!money)
      return message.sendErrorReply(
        "Error!",
        `Incorrect Usage. Usage: \`${message._usedPrefix}roulette <color> <amount>\``,
      );
    if (money > moneyDB)
      return message.sendErrorReply(
        "Error!",
        `The amount you provided is more than how much money you have in your wallet. Current Balance = 🪙 **${parseInt(
          moneyDB,
        )}**`,
      );

    if (colour == "b" || colour.includes("black")) colour = 0;
    else if (colour == "r" || colour.includes("red")) colour = 1;
    else if (colour == "g" || colour.includes("green")) colour = 2;
    else return message.channel.send(colorbad);

    if (random == 0 && colour == 2) {
      // Green
      money *= 15;
      userDB.wallet = +userDB.wallet + +money;
      await userDB.save();
      let moneyEmbed1 = new Discord.MessageEmbed()
        .setAuthor("You won!", client.user.displayAvatarURL())
        .setColor("GREEN")
        .setDescription(
          `:red_square: You won ${money} coins\n\nMultiplier: \`15x\``,
        );
      message.channel.send({ embeds: [moneyEmbed1] });
    } else if (isOdd(random) && colour == 1) {
      // Red
      money = parseInt(money * 1.5);
      userDB.wallet = +userDB.wallet + +money;
      await userDB.save();
      let moneyEmbed2 = new Discord.MessageEmbed()
        .setAuthor("You won!", client.user.displayAvatarURL())
        .setColor("GREEN")
        .setDescription(
          `:red_square: You won ${money} coins\n\nMultiplier: \`1.5x\``,
        );
      message.channel.send({ embeds: [moneyEmbed2] });
    } else if (!isOdd(random) && colour == 0) {
      // Black
      money = parseInt(money * 2);
      userDB.wallet = +userDB.wallet + +money;
      await userDB.save();
      let moneyEmbed3 = new Discord.MessageEmbed()
        .setAuthor("You won!", client.user.displayAvatarURL())
        .setColor("GREEN")
        .setDescription(
          `:black_large_square: You won ${money} coins\n\nMultiplier: \`2x\``,
        );
      message.channel.send({ embeds: [moneyEmbed3] });
    } else {
      // Wrong
      let parsedMoney = parseInt(money);
      userDB.wallet = userDB.wallet - parsedMoney;
      await userDB.save();
      let loseEmbed = new Discord.MessageEmbed()
        .setAuthor("You lost!", client.user.displayAvatarURL())
        .setColor("RED")
        .setDescription(`You lost ${money} coins\n\nMultiplier: \`0x\``);
      message.channel.send({ embeds: [loseEmbed] });
    }
  },
});
