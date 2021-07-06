const Command = require("@Command");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "scout",
  aliases: ["find"],
  description: "Search places for money!",
  async run(message, args) {
    const places = [
      "Street",
      "Sewer",
      "Laundry",
      "Sink",
      "Home",
      "Book",
      "Laptop",
      "House",
      "Kettle",
      "Bag",
    ];
    const settings = {
      maxPayout: 450,
      minPayout: 50,
    };

    let Place = places[Math.floor(Math.random() * places.length)];

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let Amount = getRandomInt(settings.minPayout, settings.maxPayout);
    message.channel.send(
      `Good Job! You searched a \`${Place}\` and earnt **:coin: ${Amount}**`
    );

    const DB = client.db.users.cache.get(message.author.id);
    DB.wallet = +DB.wallet + +Amount;
    DB.save();
  },
});
