const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require("@config");
const leven = require("../../utilities/leven.js");

module.exports = {
  name: "message",
  run: async (message, client) => {
    if (message.author.bot || message.channel.type == "dm") return;
    if (
      !message.guild.me.permissions.has([
        "SEND_MESSAGES",
        "READ_MESSAGES",
        "EMBED_LINKS",
      ])
    )
      return message.author.sendError(
        message,
        "Invalid Permissions!",
        "I don't have enough permissions in this guild! Please ask an admin to give me the following permissions: \n `READ_MESSAGES`, `SEND_MESSAGES`, `EMBED_LINKS`"
      );
    //------------------------------------------------------------------
    const prefix = await client.db.guild.getPrefix(message.guild.id);
    const emojis = client._emojis;
    const { author } = message;
    const prefixRegex = new RegExp(
      `^(<@!?${client.user.id}>|${prefix.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      )})\\s*`
    );
    let userSchema = await client.schemas.user.findOne({
      id: message.author.id,
    });
    if (!userSchema) {
      userSchema = await new client.schemas.user({
        name: message.author.username,
        id: message.author.id,
      }).save();
    }

    const embed = new MessageEmbed()
      .setAuthor(
        "Hello!",
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Wave.png"
      )
      .setDescription(
        `Hello! I'm **Hurricano™**. My prefix is \`${prefix}\`. I have a variety of commands you can use which you can view by doing \`${prefix}help\`! If you want to view information about me please do \`${prefix}botinfo\`. That's it for now, bye and have a great time!`
      )
      .setColor("#034ea2")
      .setImage(
        "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/other/Wave.jpg"
      )
      .setFooter(`© Hurricano™ v1.0.0`);
    if (prefixRegex.test(message.content)) {
      if (
        message.content === `<@${client.user.id}>` ||
        message.content === `<@!${client.user.id}>`
      ) {
        return message.reply(embed);
      }
      const [, match] = message.content.toLowerCase().match(prefixRegex);
      if (!message.content.toLowerCase().startsWith(match)) return;
      let args = message.content.slice(match.length).trim().split(/ +/g);
      const cmd = args.shift().toLowerCase();

      if (cmd.length == 0) return;
      const command =
        client.commands.get(cmd) ||
        client.commands.get(client.aliases.get(cmd));
      if (userSchema.blacklisted)
        return message.channel.sendError(
          message,
          "You have been blacklisted!",
          "Damn it! You have been blacklisted by a bot moderator! This means you will be unable to use any of the bot commands."
        );
      if (!command) {
        const best = [
          ...client.commands.map((cmd) => cmd.name),
          ...client.aliases.keys(),
        ].filter(
          (c) => leven(cmd.toLowerCase(), c.toLowerCase()) < c.length * 0.4
        );
        const dym =
          best.length == 0
            ? ""
            : best.length == 1
            ? `+ ${best[0]}`
            : `${best
                .slice(0, 3)
                .map((value) => `+ ${value}`)
                .join("\n")}`;

        return dym
          ? message.channel.sendError(
              message,
              "Invalid Command!",
              `Sorry! I don't have that command! Did you happen to mean: \n\`\`\`diff\n${dym}\`\`\``
            )
          : null;
      }
      let checkAdmin = config.ownerIds.includes(author.id);
      if (command.conf.ownerOnly === true && !checkAdmin)
        return message.channel.sendError(
          message,
          "Permission Error.",
          `You are not the owner of Hurricano™, ${author}.`
        );
      if (!message.member)
        message.member = await message.guild.members.fetch(message);

      let guildSchema = await client.schemas.guild.findOne({
        id: message.guild.id,
      });
      let disabledModules = guildSchema.disabledModules;
      if (
        disabledModules &&
        disabledModules.includes(command.category) &&
        !client.config.ownerIds.includes(message.author.id)
      )
        return;

      if (command.conf.userPermissions) {
        const authorPerms = message.channel.permissionsFor(author);
        if (
          !authorPerms ||
          (!authorPerms.has(command.userPermissions) &&
            !client.config.ownerIds.includes(message.author.id))
        ) {
          return message.reply(
            new MessageEmbed()
              .setTitle("Permission Error.")
              .setDescription(
                `Stop disturbing me bro, you require the \`${command.userPermissions.join(
                  ", "
                )}\` permission(s) to use that command...`
              )
              .setFooter(
                "Smh, imagine trying to use a command without having the perms-"
              )
          );
        }
      }
      if (command.conf.args && !args.length) {
        let argsMsg = await message.channel.sendError(
          message,
          "Arguments Error.",
          `${command.conf.args} \n Please send the required arguments, or type \`cancel\` to cancel the command.`
        );
        let argsConf = await message.channel
          .awaitMessages((m) => m.author.id === message.author.id, {
            max: 1,
            time: 30000,
            errors: ["time"],
          })
          .catch(() => {
            return argsMsg.edit(
              new MessageEmbed()
                .setAuthor("Cancelled Command.", client.links.errorImage)
                .setDescription(
                  `You took more than 20 seconds. This command has been cancelled.`
                )
                .setFooter(
                  message.member.displayName,
                  message.author.displayAvatarURL()
                )
            );
          });
          argsConf = argsConf.first();
          if (argsConf.content.toLowerCase() === 'cancel') return message.channel.sendSuccess(message, 'Command Cancelled!', 'You cancelled this command.');
          args = argsConf.content.trim().split(/ +/g);
      }

      if (disabledModules && !disabledModules.includes("levelling")) {
        const userLevel = await client.levels.fetch(
          message.author.id,
          message.guild.id
        );

        if (!userLevel)
          await client.levels.createUser(message.author.id, message.guild.id);
        const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
        const hasLeveledUp = await client.levels.appendXp(
          message.author.id,
          message.guild.id,
          randomAmountOfXp
        );
        if (hasLeveledUp) {
          const user = await client.levels.fetch(
            message.author.id,
            message.guild.id
          );
          message.sendSuccessReply(
            `Level Up!`,
            `${message.author}, congratulations! You have leveled up to **${user.level}**! :tada:`
          );
        }
      }
      if (!client.cooldowns.has(command.name)) {
        client.cooldowns.set(command.name, new Discord.Collection());
      }

      const now = Date.now();
      const timestamps = client.cooldowns.get(command.name);
      const cooldownAmount = (command.conf.cooldown ?? 3) * 1000;

      if (timestamps.has(author.id)) {
        const expirationTime = timestamps.get(author.id) + cooldownAmount;
        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          return message.reply({
            embed: {
              title: "Chillza.",
              description: `You need to wait ${timeLeft.toFixed(
                1
              )} more second(s) before reusing the \`${
                command.name
              }\` command.`,
              footer: { text: `"Patience is the key my child."` },
            },
          });
        }
      }
      if (!config.ownerIds.includes(author.id)) timestamps.set(author.id, now);
      setTimeout(() => timestamps.delete(author.id), cooldownAmount);
      command.run(message, args);
    }
  },
};
