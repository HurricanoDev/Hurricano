const Command = require("@Command");
const moment = require("moment");
module.exports = new Command({
  name: "blacklist",
  description: "Blacklist a user from the bot.",
  ownerOnly: true,
  async run(message, args) {
    let guild;
    let user;
    let useAwaitMessages = null;
    let toBlUser = true;
    const types = ["guild", "user", "server"];
    const prefix = message._usedPrefix;
    if (!args.length) {
      message.sendSuccessReply(
        "Cool!",
        `Cool, you would like to blacklist a user/guild!
       Please provide whether you would like to blacklist a user or guild within the next 30 seconds.
       Examples: \`${prefix}blacklist guild 719099649805385748\`,
       \`${prefix}blacklist user @Dɾαɠσɳιȥҽԃριȥȥα\``
      );
      let conf = await message.channel
        .awaitMessages((x) => x.author.id == message.author.id, {
          max: 1,
          time: 30000,
          errors: ["time"],
        })
        .catch(() => {
          return message.channel.sendError(
            message,
            "Time Limit Reached.",
            "You took too long. Please try again."
          );
        });
      conf = conf.first().content.toLowerCase();
      if (conf === "guild" || conf === "server") {
        toBlUser = false;
        useAwaitMessages = true;
      } else if (!types.includes(conf))
        return message.channel.sendError(
          message,
          "Invalid Response Provided.",
          "You did not provide a valid response. Please try this command again."
        );
    } else {
      if (!types.includes(args[0].toLowerCase()))
        return message.channel.sendError(
          message,
          "Invalid Type Provided.",
          "Please provide whether you would like to blacklist a guild or user!"
        );
      if (args[0] == "guild") toBlUser = false;
    }
    if (!args[1]) {
      message.channel.sendSuccess(
        message,
        "Cool!",
        `Now, please provide the ID of the ${toBlUser ? "user." : "guild."}`
      );
      let conf = await message.channel
        .awaitMessages((x) => x.author.id === message.author.id, {
          max: 1,
          time: 20000,
          errors: ["time"],
        })
        .catch(() => {
          return message.channel.sendError(
            message,
            "Time Limit Reached.",
            "You took too long to respond."
          );
        });
      conf = conf.first();
      if (toBlUser)
        user =
          conf.mentions.users.first() ??
          (await client.users.fetch(conf.content).catch(() => {}));
      else
        guild = client.guilds.cache.get(conf.content);
    } else {
      if (toBlUser)
        user =
          message.mentions.users.first() ??
          (await client.users.fetch(args[1]).catch(() => {}));
      else guild = client.guilds.cache.get(args[1]);
    }
    if (toBlUser && !user)
      return message.channel.sendError(
        message,
        "Invalid User Provided.",
        "You provided an invalid user to blacklist. Please try this command again with a valid user!"
      );
    else if (!toBlUser && !guild)
      return message.channel.sendError(
        message,
        "Invalid Guild Provided.",
        "You provided an invalid guild to blacklist. Please try this command again with a valid guild!"
      );
    if (toBlUser) {
      message.channel.sendSuccess(
        message,
        "Confirmation.",
        `Are you sure you want to blacklist ${user.tag}?`,
        "Type yes if you want to, and no if you want to cancel.",
        null,
        [
          {
            name: "User Data:",
            value: `Name: ${user.username},
          Created At: ${moment(user.createdAt).format("YYYY DD MM")},
          ID: ${user.id},
          Mention: ${user}.`,
          },
        ]
      );
      let confir = await message.channel
        .awaitMessages((x) => x.author.id === message.author.id, {
          max: 1,
          time: 30000,
          errors: ["time"],
        })
        .catch(() => {
          return message.channel.sendError(
            message,
            "Time Limit Reached.",
            "You took too long for this command. Please try again."
          );
        });
      confir = confir.first().content.toLowerCase();
      if (confir === "yes") {
        var data = client.db.users.cache.get(user.id);
        data = await client.functions.createUserDB(user);
        data.blacklisted = true;
        await data.save();
        return message.channel.sendSuccess(
          message,
          "Blacklisted!",
          `Successfully blacklisted ${user}!`
        );
      } else
        return message.channel.sendSuccess(
          message,
          "Cancelling Blacklist.",
          `I am not blacklisting ${user}.`
        );
    } else {
      const guildOwner = await client.users.fetch(guild.ownerID).catch(() => {});
      message.channel.sendSuccess(
        message,
        "Confirmation.",
        `Are you sure you would like to blacklist ${guild}?`,
        null,
        [
          {
            name: "Guild Data:",
            value: `Name: ${guild},
          Member Count: ${guild.memberCount},
          ID: ${guild.id},
          Owner: ${guildOwner.tag},
          Owner Mention: ${guildOwner},`,
          },
        ]
      );
      let confir = await message.channel
        .awaitMessages((x) => x.author.id === message.author.id, {
          max: 1,
          time: 30000,
          errors: ["time"],
        })
        .catch(() => {
          return message.channel.sendError(
            message,
            "Time Limit Reached.",
            "You took too long for this command. Please try again."
          );
        });
      confir = confir.first().content.toLowerCase();
      if (confir === "yes") {
        await client.schemas.guild.findOneAndUpdate({ 
          id: guild.id,
        }, {
          blacklisted: true
        })
        return message.channel.sendSuccess(
          message,
          "Success!",
          `Successfully blacklisted ${guild}!`
        );
      } else
        return message.channel.sendSuccess(
          message,
          "Cancelling Blacklist.",
          `I am not blacklisting ${guild}.`
        );
    }
  },
});
