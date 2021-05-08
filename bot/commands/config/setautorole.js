const Command = require("@Command");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "setautorole",
  aliases: ["autorole"],
  userPermissions: ["ADMINISTRATOR"],
  cooldown: 15,
  description:
    "Set an autorole to give to new members upon joining your server.",
  async run(message, args) {
    const prefix = await client.db.guild.getPrefix(message.guild.id);

    if (!message.guild.me.permissions.has("MANAGE_ROLES"))
      return message.channel.sendError(
        message,
        "Error",
        "I am missing the `MANAGE_ROLES` permission to execute this command."
      );
    if (!args.length) {
      const data = await client.schemas.guild.findOne({ id: message.guild.id });
      if (data.autoRole) {
        message.sendSuccessReply(
          "AutoRole Updated!",
          `${data.autoRole} ➔ \`None\``
        );
        data.findOneAndUpdate(
          { id: message.guild.id },
          { autoRole: "null" },
          { upsert: true }
        );
      } else if (!data.autoRole) {
        message.channel.sendError(
          message,
          "Error",
          `There is no current autorole set! Use ${prefix}setautorole to set an autorole.`
        );
      }
    } else {
      const data = await client.schemas.guild.findOne({ id: message.guild.id });
      const role =
        message.mentions.roles.first() ||
        message.guild.roles.cache.get(args[0]);
      if (!role)
        return message.channel.sendError(
          message,
          "Error",
          "That is not a valid role!"
        );
      if (data.autoRole) {
        await client.schemas.guild.findOneAndUpdate(
          { id: message.guild.id },
          { autoRole: args[0] },
          { upsert: true }
        );
        message.sendSuccessReply(
          "Autorole Updated!",
          `${data.autoRole} ➔ \`${role}\``
        );
      }
      await client.schemas.guild.findOneAndUpdate(
        { id: message.guild.id },
        { autoRole: role.id },
        { upsert: true }
      );
      message.sendSuccessReply(
        "Autorole Updated!",
        `\`None\` ➔ ${role}`
      );
    }
  },
});
