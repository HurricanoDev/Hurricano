const ms = require("../../utilities/ms.js");
const Command = require("@Command");
module.exports = new Command({
  name: "gend",
  aliases: [, "giveawayend", "g-end", "g-end", "gfinish"],
  description: "Ends a giveaway.",
  async run(message, args) {
    if (
      !message.member.hasPermission("MANAGE_GUILD") &&
      !message.member.roles.cache.includes(
        (r) => r.name.toLowerCase() === "Giveaway Manager"
      )
    ) {
      return message.reply({
        embeds: [
          {
            title: "An Error Occured.",
            description:
              "Smh, you need the `MANAGE_GUILD` permission or the role `Giveaway Manager` to manage giveaways.",
            color: "#034ea2",
          },
        ],
      });
    }
    let id = args[0];
    if (!id)
      return message.reply({
        embeds: [
          {
            title: "An Error Occured.",
            description: "Please provide a giveaway/message ID.",
            color: "#034ea2",
            footer: {
              text: "Pfft, why don't you try to end a giveaway without a message ID?",
            },
          },
        ],
      });
    let hasGiveaway = message.client.giveawaysManager.giveaways.find(
      (g) => g.messageID === id
    );
    if (!hasGiveaway)
      return message.reply({
        embeds: [
          {
            title: "An Error Occured.",
            description: `The giveaway ID you gave me (${id}), is an invalid giveaway ID.`,
            fields: [
              {
                name: "Common Causes",
                value:
                  "1. The message ID may not actually be a message. \n 2. The message ID isn't a giveaway. \n 3. The message ID is a giveaway, but not hosted by this bot.",
              },
            ],
            color: "#034ea2",
            footer: {
              text: "Join the support server if you have any more errors!",
            },
          },
        ],
      });

    message.client.giveawaysManager
      .end(hasGiveaway.messageID)
      .then(() => {
        message
          .reply(
            "Giveaway will end in less than " +
              global.client.giveawaysManager.options.updateCountdownEvery /
                1000 +
              " seconds..."
          )
          .then((m) => m.delete({ timeout: 2000 }));
      })
      .catch((e) => {
        message.reply({
          embeds: [
            {
              title: "Oh no! Something went wrong.",
              description: `Oh no! Something went wrong. Please report this to the support server. \n \`\`\`js \n ${e.message}\`\`\``,
              footer: { text: "Weird." },
            },
          ],
        });
      });
    if (message.deletable) message.delete();
    return;
  },
});
