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
            value: "remove"
          }
        ]
      },
      {
        name: "prefix",
        description: "What prefix you would like to add/remove.",
        required: true,
        type: 3,
      },
    ],
    isNormal: true,
    async run(interaction, args) {
      let guildSchema = client.db.guilds.cache.get(interaction.guild.id);
      if (
        !interaction.channel
          .permissionsFor(interaction.user.id)
          .has("ADMINISTRATOR")
      )
        return await interaction.reply(
          "You don't have `ADMINISTRATOR` permission to do this!",
          { ephemeral: true }
        );
      const toAdd = args[0].value;
      switch(toAdd) {
      case 'add': 
      if (guildSchema.prefixes.length > 10) return await interaction.reply("The max amount of prefixes you can set is 10!", { ephemeral: true });
        guildSchema.prefixes.push(args[1].value);
        let data = await guildSchema.save();
        client.db.guilds.cache.set(interaction.guild.id, data);
        embed.setDescription(
        `Successfully added the prefix \`${args[1].value}\`!`
      );
      await interaction.reply(embed);
      break;
      case "remove":
        if (!guildSchema.prefixes.includes(args[1].toLowerCase())) return interaction.reply("Please provide a valid prefix to remove!", { ephemeral: true });
        let array = guildSchema.prefixes;
        array = array.filter(x => x !== args[1].toLowerCase());
        guildSchema.prefixes = array;
        data = await guildSchema.save(); 
        client.db.guilds.cache.set(interaction.guild.id, data);
        embed.setDescription(`Successfully removed the prefix \`${args[1]}\`!`);
        interaction.reply(embed);
      break;
    }
  },
  },
  async run(message, args) {
    const types = ['add', 'remove'];
    if (!types.includes(args[0].toLowerCase())) return message.sendErrorReply("Invalid Arguments.", `Please provide whether you would like to add a prefix, or remove it!`, null, [{
      name: "Examples:",
      value: `\`${message._usedPrefix}prefix add !\`,
      \`${message._usedPrefix}prefix remove ?\``
    }])
    let guildSchema = client.db.guilds.cache.get(message.guild.id);
    switch (args[0].toLowerCase()) {
      case "add": 
      if (!args[1]) return message.channel.sendError(message, "Invalid Arguments.", "Please provide what prefix you would like to add.")
      guildSchema.prefixes.push(args[1]);
      let data = await guildSchema.save();
      client.db.guilds.cache.set(message.guild.id, data);
      return message.channel.sendSuccess(message, "Success!", `Successfully added the prefix \`${args[1]}\`!`)
      case "remove":
        if (!args[1]) return message.channel.sendError(message, "Invalid Arguments.", "Please provide what prefix you would like to remove!");
        if (!guildSchema.prefixes.includes(args[1].toLowerCase())) return message.channel.sendError(message, "Invalid Arguments.", "Please provide a valid prefix to remove!");
        let array = guildSchema.prefixes;
        array = array.filter(x => x !== args[1].toLowerCase());
        guildSchema.prefixes = array;
        let Uhdata = await guildSchema.save();
        client.db.guilds.cache.set(message.guild.id, Uhdata);
        return message.channel.sendSuccess(message, "Success!", `Successfully removed the prefix \`${args[1]}\`!`);
      }
  },
});
