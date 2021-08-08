const Command = require("@Command");

module.exports = new Command({
  name: "birthdayset",
  aliases: ["setbirthday", "setbday"],
  cooldown: 30,
  description: "Set your birthdate for others to see!",
  async run(message, args) {
    const months = {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December",
    };

    const joined = args.join(" ");
    const split = joined.trim().split("/");

    let [day, month] = split;

    if (!day || !month)
      return message.sendErrorReply(
        "Invalid Syntax",
        `Correct Usage: \`${message._usedPrefix}birthdayset <day/month>\``,
      );

    if (isNaN(day) || isNaN(month))
      return message.sendErrorReply(
        "Error",
        `The date you provided wasn't a number, try figuring out what a number is first :/`,
      );

    day = parseInt(day);
    month = parseInt(month);

    if (day > 31 || day <= 0)
      return message.sendErrorReply(
        "Error!",
        "Wrong day format provided, number should be less than 31 days.",
      );
    if (month > 12 || month <= 0)
      return message.sendErrorReply(
        "Error!",
        "Wrong month format provided, there is only 12 months in a year!",
      );

    const convertedDay = client.functions.getOrdinalSuffix(day);
    const convertedMonth = months[month];

    const birthdayString = `${convertedDay} of ${convertedMonth}`;
    const userSchema = client.db.guilds.cache.get(message.guild.id);
    userSchema.birthday = birthdayString;
    const updateSchema = await userSchema.save();
    client.db.users.cache.set(message.author.id, updateSchema);
    message.channel.sendSuccess(
      message,
      "Done!",
      `Your birthday was set to **${birthdayString}**`,
    );
  },
});
