const Command = require("@Command");
const { MessageEmbed, MessageButton } = require("discord.js");
module.exports = new Command({
  name: "database",
  aliases: ["db"],
  description: "View the database settings for a guild.",
  userPermissions: ["ADMINISTRATOR"],
  async run(message, args) {
    const guildSchema = message.guild.db.cache();
    const types = [
      "messageLogs",
      "suggestionChannel",
      "systemChannel",
      "autoRole",
      "memberLog",
      "muteRole",
      "antiSpam",
      "serverLog",
    ];
    const channelSettings = [
      "messageLogs",
      "suggestionChannel",
      "systemChannel",
      "memberLog",
      "serverLog",
    ];
    const roleSettings = ["autoRole", "muteRole"];
    const otherSettings = ["antiSpam"];
    const mainEmbed = new MessageEmbed()
      .setTitle("Database")
      .setDescription(
        `**More information:** \`${message._usedPrefix}settings [category]\``
      )
      .addField("Total Settings", `\`${types.length}\` settings`)
      .addField("Channel", `\`${channelSettings.length}\` settings`)
      .addField("Role", `\`${roleSettings.length}\` settings`)
      .addField("Other", `\`${otherSettings.length}\` setting(s)`)
      .setTimestamp()
      .setColor("#6082b6")
      .setFooter(`© Hurricano`);
    let currentPage;
    const Page2 = new MessageEmbed()
      .setTitle("Page 2/4: **`Channel`**")
      .setTimestamp()
      .setColor("#6082b6")
      .setFooter(`© Hurricano`);
    channelSettings.forEach((type) => {
      let desc = guildSchema[type];
      let status = true;
      if (desc == null) status = false;
      let title = type.toString().toLowerCase();
      title = client.functions.capitalize(title);
      Page2.addField(title, status ? `<#${desc}>` : "None");
    });
    const Page3 = new MessageEmbed()
      .setTitle("Page 3/4: **`Role`**")
      .setTimestamp()
      .setColor("#6082b6")
      .setFooter(`© Hurricano`);
    roleSettings.forEach((type) => {
      let desc = guildSchema[type];
      let status = true;
      if (desc == null) status = false;
      let title = type.toString().toLowerCase();
      title = client.functions.capitalize(title);
      Page3.addField(title, status ? `<@&${desc}>` : "None");
    });
    const Page4 = new MessageEmbed()
      .setTitle("Page 4/4")
      .setTimestamp()
      .setColor("#6082b6")
      .setFooter(`© Hurricano`);
    otherSettings.forEach((type) => {
      let desc = guildSchema[type];
      let status = true;
      if (desc == null) status = false;
      let title = type.toString().toLowerCase();
      title = client.functions.capitalize(title);
      Page4.addField(
        title,
        status ? `\`${client.functions.capitalize(desc)}\`` : "None"
      );
    });

    //Buttons
    const leftButton = new MessageButton()
      .setStyle("PRIMARY")
      .setCustomID("DBLeft")
      .setEmoji("⬅️");
    const rightButton = new MessageButton()
      .setStyle("PRIMARY")
      .setCustomID("DBRight")
      .setEmoji("➡️");
    const msg = await message.channel.send({
      embeds: [mainEmbed],
      components: [[leftButton, rightButton]],
    });

    //Work
    currentPage = 1;
    let Pages = { 1: mainEmbed, 2: Page2, 3: Page3, 4: Page4 };
    const collector = msg.createMessageComponentInteractionCollector(
      (x) => x.user.id == message.author.id,
      { idle: 30000, errors: ["time"] }
    );
    collector.on("collect", (button) => {
      if (button.customID === "DBLeft") {
        --currentPage;
        if (currentPage < 1) currentPage = 4;
        const emb = Pages[currentPage];
        msg.edit({ embeds: [emb] });
        button.deferUpdate();
      } else if (button.customID === "DBRight") {
        ++currentPage;
        if (currentPage >= 5) currentPage = 1;
        const emb = Pages[currentPage];
        msg.edit({ embeds: [emb] });
        button.deferUpdate();
      }
    });
    collector.on("end", () => {
      msg.edit({ components: [] });
    });
  },
});
