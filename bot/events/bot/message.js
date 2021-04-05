const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require("../../../config.json");

module.exports = {
  name: "message",
  run: async (message, client) => {
    if (message.author.bot || message.channel.type == "dm") return;
    const prefix = await client.db.guild.getPrefix(message.guild.id);
    const emojis = client._emojis;
    const { author } = message;
    const prefixRegex = new RegExp(
      `^(<@!?${client.user.id}>|${prefix.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      )})\\s*`
    );
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
      const [, match] = message.content.match(prefixRegex);
      if (!message.content.startsWith(match)) return;
      const args = message.content.slice(match.length).trim().split(/ +/g);
      const cmd = args.shift().toLowerCase();

      if (cmd.length == 0) return;
      const command =
        client.commands.get(cmd) ||
        client.commands.get(client.aliases.get(cmd));
      if (!command) return;
      let checkAdmin = config.ownerIds.includes(author.id);
      if (command.conf.ownerOnly === true && !checkAdmin)
        return message.channel.sendError(
          message,
          "Permission Error.",
          `You are not the owner of Hurricano™, ${author}.`
        );

      if (!message.member)
        message.member = await message.guild.members.fetch(message);
      if (command.conf.userPermissions) {
        const authorPerms = message.channel.permissionsFor(author);
        if (!authorPerms || !authorPerms.has(command.userPermissions)) {
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
        message.channel.sendError(
          message,
          "Arguments Error.",
          `${command.conf.args}`
        );
        return;
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
      if (command && !command.slash && !command.double) {
        command.run(message, args);
      }
      if (command.slash && command.double) {
        command.run(message, args);
      }
    }
  },
};
