const Command = require("@Command");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
  name: "wordblacklist",
  description: "Blacklist/Display/Remove word(s) in your server.",
  aliases: ["wbl"],
  userPermissions: ["ADMINISTRATOR"],
  async run(message, args) {
    const optionsEmbed = await client.functions.createOptionsEmbed(
      "Blacklist",
      "wordblacklist",
      "wbl",
      "ADMINISTRATOR",
      "`display` Display all the blacklisted words.\n`add` Blacklist a word\n`remove` Remove a blacklisted word",
      message._usedPrefix
    );

    const wordBLRow = new MessageButton()
      .setCustomID("wblHelpDelete")
      .setLabel("Delete?")
      .setEmoji("<:trashcan:854306995280150558>")
      .setStyle("PRIMARY");

    if (!args.length) {
      const sendMsg = await message.channel.send({
        embeds: [optionsEmbed],
        components: [[wordBLRow]],
      });
      let conf = await sendMsg
        .awaitMessageComponentInteraction(
          (x) =>
            (x.user.id === message.author.id) & (x.customID == "wblHelpDelete"),
          45000
        )
        .catch(() => {
          sendMsg.edit({ components: [] });
        });
      if (conf?.customID) {
        conf.reply({ content: "Successfully deleted!", ephemeral: true });
        sendMsg.delete();
      }
      return;
    }
  },
});
