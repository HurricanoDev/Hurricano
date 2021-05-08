const Command = require("@Command");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "setautorole",
  aliases: ["autorole"],
  userPermissions: ["ADMINISTRATOR"],
  cooldown: 15,
  description:
    "Set an autorole to give to new members upon joining your server.",
  async run(client, message, args) {
    const Schema = client.schemas.guild;
    const prefix = await client.db.guild.getPrefix(message.guild.id);

    if (!message.guild.me.permissions.has("MANAGE_ROLES"))
      return message.channel.sendErrorReply(
        message,
        "Error",
        "I am missing the `MANAGE_ROLES` permission to execute this command."
      );
    if (!args.length) {
      const data = await Schema.findOne({ id: message.guild.id });
      if (data.autoRole) {
        message.channel.sendSuccessReply(
          message,
          "AutoRole Updated!",
          `${data.autoRole} ➔ \`None\``
        );
        data.findOneAndUpdate(
          { id: message.guild.id },
          { autoRole: "null" },
          { upsert: true }
        );
      } else if (!data.autoRole) {
        message.channel.sendErrorReply(
          message,
          "Error",
          `There is no current autorole set! Use ${prefix}setautorole to set an autorole.`
        );
      }
    } else {
      const data = await Schema.findOne({ id: message.guild.id });
      const role =
        message.mentions.roles.first() ||
        message.guild.roles.cache.get(args[0]);
      if (!role)
        return message.channel.sendErrorReply(
          message,
          "Error",
          "That is not a valid role!"
        );
      if (data.autoRole) {
        await Schema.findOneAndUpdate(
          { id: message.guild.id },
          { autoRole: args[0] },
          { upsert: true }
        );
        message.channel.sendSuccessReply(
          message,
          "Autorole Updated!",
          `${data.autoRole} ➔ \`${role}\``
        );
      }
      await Schema.findOneAndUpdate(
        { id: message.guild.id },
        { autoRole: role.id },
        { upsert: true }
      );
      message.channel.sendSuccessReply(
        message,
        "Autorole Updated!",
        `\`None\` ➔ ${role}`
      );
    }
  },
});
