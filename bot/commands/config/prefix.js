const { MessageEmbed } = require("discord.js");
const Command = require("@Command");
const embed = new MessageEmbed().setAuthor(
  "Server Settings Change.",
  "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png"
);

module.exports = new Command({
  name: "prefix",
  aliases: ["sp", "setp"],
  userPermissions: ["ADMINISTRATOR"],
  args: "Please provide whether you would like to set a prefix or remove it!",
  cooldown: 20,
  description: "Set your server's custom prefix!",
  slash: {
    name: "prefix",
    isSlash: true,
    options: [
      {
        name: "action",
        description: "Choose whether you would like to add or remove a prefix.",
        required: true,
        type: 3,
        choices: [
          {
            name: "Add a prefix.",
            value: "add",
          },
          {
            name: "Remove a prefix.",
            value: "remove",
          },
          {
            name: "List all the current prefixes.",
            value: "list",
          },
        ],
      },
      {
        name: "prefix",
        description: "What prefix you would like to add/remove.",
        type: 3,
      },
    ],
    isNormal: true,
    async run(interaction, args) {
      let guildSchema = client.db.guilds.cache.get(interaction.guild.id);
      if (
        !interaction.channel
          .permissionsFor(interaction.user.id)
          .has("ADMINISTRATOR") &&
        args[1].value !== "list"
      )
        return await interaction.reply(
          "You don't have `ADMINISTRATOR` permission to do this!",
          { ephemeral: true }
        );
      const toAdd = args[0].value;
      switch (toAdd) {
        case "add":
          if (guildSchema.prefixes.length > 10)
            return await interaction.reply(
              "The max amount of prefixes you can set is 10!",
              { ephemeral: true }
            );
          if (!args[1].value)
            return await interaction.reply(
              "Please try this command again, with the prefix you would like to add.",
              { ephemeral: true }
            );
          if (!args[1].value.length > 10)
            return await interaction.reply(
              "Please try to make your prefix lesser than 10 characters!",
              { ephemeral: true }
            );
          if (!args[1].value === `<@!${client.user.id}>`)
            return await interaction.reply("I already have a mention prefix!", {
              ephemeral: true,
            });
          guildSchema.prefixes.push(args[1].value);
          var data = await guildSchema.save();
          client.db.guilds.cache.set(interaction.guild.id, data);
          embed.setDescription(
            `Successfully added the prefix \`${args[1].value}\`!`
          );
          return await interaction.reply(embed);
          break;
        case "list":
          const embed = new MessageEmbed().setTitle("Current Prefixes:")
            .setDescription(`The current prefixes are:
        \`\`\`${guildSchema.prefixes.join("\n")}\`\`\``);
          return await interaction.reply(embed);
        case "remove":
          if (!args[1].value)
            return await interaction.reply(
              "Please try this command again, with the prefix you would like to remove.",
              { ephemeral: true }
            );
          if (!guildSchema.prefixes.includes(args[1].value.toLowerCase()))
            return interaction.reply(
              "Please provide a prefix that the bot currently uses!",
              { ephemeral: true }
            );

          let array = guildSchema.prefixes;
          array = array.filter((x) => x !== args[1].value.toLowerCase());
          guildSchema.prefixes = array;
          var data = await guildSchema.save();
          client.db.guilds.cache.set(interaction.guild.id, data);
          embed.setDescription(
            `Successfully removed the prefix \`${args[1].value}\`!`
          );
          interaction.reply(embed);
          break;
      }
    },
  },
  async run(message, args) {
    const types = ["add", "remove", "list"];
    if (!types.includes(args[0].toLowerCase()))
      return message.sendErrorReply(
        "Invalid Arguments.",
        `Please provide whether you would like to add a prefix, list them, or remove one of them!`,
        null,
        [
          {
            name: "Examples:",
            value: `\`${message._usedPrefix}prefix add !\`,
      \`${message._usedPrefix}prefix remove ?\``,
          },
        ]
      );
    let guildSchema = client.db.guilds.cache.get(message.guild.id);
    switch (args[0].toLowerCase()) {
      case "add":
        var prefix = args.map((x) => x);
        prefix.shift();
        prefix.join(" ");
        if (!args[1])
          return message.channel.sendError(
            message,
            "Invalid Arguments.",
            "Please provide what prefix you would like to add."
          );
        if (!args[1].length > 10)
          return message.channel.sendError(
            message,
            "Length Error.",
            "Please try to make your prefix less than 10 characters!"
          );
        if (!args[1] === `<@!${client.user.id}>`)
          return message.channel.sendError(
            message,
            "Error",
            "I already have a mention prefix!"
          );
        guildSchema.prefixes.push(args[1]);
        var data = await guildSchema.save();
        client.db.guilds.cache.set(message.guild.id, data);
        return message.channel.sendSuccess(
          message,
          "Success!",
          `Successfully added the prefix \`${args[1]}\`!`
        );
      case "list":
        const embed = new MessageEmbed().setTitle("Current Prefixes:")
          .setDescription(`The current prefixes are:
        \`\`\`${guildSchema.prefixes.join("\n")}\`\`\``);
        return message.reply(embed);
      case "remove":
        if (!args[1])
          return message.channel.sendError(
            message,
            "Invalid Arguments.",
            "Please provide what prefix you would like to remove!"
          );
        var prefix = args.map((x) => x);
        prefix.shift();
        prefix = prefix.join(" ");
        prefix = prefix.toLowerCase();
        if (!guildSchema.prefixes.includes(prefix))
          return message.channel.sendError(
            message,
            "Invalid Arguments.",
            "Please provide a prefix that the bot currently uses!"
          );
        let array = guildSchema.prefixes;
        array = array.filter((x) => x !== prefix);
        guildSchema.prefixes = array;
        var data = await guildSchema.save();
        client.db.guilds.cache.set(message.guild.id, data);
        return message.channel.sendSuccess(
          message,
          "Success!",
          `Successfully removed the prefix \`${prefix}\`!`
        );
    }
  },
});
