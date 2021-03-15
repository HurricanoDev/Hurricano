const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const { stripIndent } = require("common-tags"); // optionnal
const region = {
  "us-central": ":flag_us:  **US Central**",
  "us-east": ":flag_us:  **US East**",
  "us-south": ":flag_us:  **US South**",
  "us-west": ":flag_us:  **US West**",
  europe: ":flag_eu:  **Europe**",
  singapore: ":flag_sg:  **Singapore**",
  japan: ":flag_jp:  **Japan**",
  russia: ":flag_ru:  **Russia**",
  hongkong: ":flag_hk:  **Hong Kong**",
  brazil: ":flag_br:  **Brazil**",
  sydney: ":flag_au:  **Sydney**",
  southafrica: ":flag_za: **South Africa**",
  india: ":flag_in: India",
};
const verif = {
  NONE: "**None**",
  LOW: "**Low**",
  MEDIUM: "**Medium**",
  HIGH: "**High**",
  VERY_HIGH: "**Highest**",
};

module.exports = {
  name: "serverinfo",
  aliases: ["serveri", "si", "guildinfo", "gi"],
  description: "Shows information about the server!",
  run: async (message, args) => {
    const oldmem = message.guild.members.cache
      .filter((m) => !m.user.bot)
      .sort((a, b) => a.user.createdAt - b.user.createdAt)
      .first();
    const newmem = message.guild.members.cache
      .filter((m) => !m.user.bot)
      .sort((a, b) => b.user.createdAt - a.user.createdAt)
      .first();
    //Roles and Users
    const roleCount = message.guild.roles.cache.size - 1;
    const members = message.guild.members.cache.array();
    const memberCount = members.length;
    const online = members.filter((m) => m.presence.status === "online").length;
    const offline = members.filter((m) => m.presence.status === "offline")
      .length;
    const dnd = members.filter((m) => m.presence.status === "dnd").length;
    const afk = members.filter((m) => m.presence.status === "idle").length;
    const bots = members.filter((b) => b.user.bot).length;
    //Channels
    const channels = message.guild.channels.cache.array();
    const channelCount = channels.length;
    const textChannels = channels
      .filter((c) => c.type === "text" && c.viewable)
      .sort((a, b) => a.rawPosition - b.rawPosition);
    const voiceChannels = channels.filter((c) => c.type === "voice").length;
    const newsChannels = channels.filter((c) => c.type === "news").length;
    const categoryChannels = channels.filter((c) => c.type === "category")
      .length;

    const em = new MessageEmbed()
      .setTitle(`Info about ${message.guild}`)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setColor(message.guild.me.displayHexColor)
      .addField("Owner:", message.guild.owner, true)
      .addField("Verification:", verif[message.guild.verificationLevel], true)
      .addField(
        "Creation Date:",
        `**${moment(message.guild.createdAt).format("MMM DD YYYY")}**`,
        true
      )
      .addField(
        "Members:",
        `Total Member Count: ${memberCount} Member(s) \n Online Member(s): ${online} Online Member(s) \n Do not Disturb Member(s): ${dnd} DND Member(s) \n Idle Member(s): ${afk} AFK Member(s) \n Offline Member(s): ${offline} Offline Member(s) \n Bot(s): ${bots} Bot(s)`
      )
      .addField(
        "Channels:",
        `Channels: ${channelCount} \n Text Channels: ${textChannels.length} Text Channel(s) \n Voice Channels: ${voiceChannels} Voice Channel(s) \n News Channels: ${newsChannels} News Channel(s) \n Categories: ${categoryChannels} Categories \n Roles: ${roleCount}`
      )
      .addField("Region:", region[message.guild.region], true)
      .addField(
        "Boosts:",
        `**${message.guild.premiumSubscriptionCount || 0}**`,
        true
      )
      .addField(
        "Boost Tier:",
        `**${
          message.guild.premiumTier
            ? `Tier ${message.guild.premiumTier}`
            : "None"
        }**`,
        true
      )
      .addField(
        "Other",
        `**Youngest:** \`${newmem.user.tag}\` (${newmem.user.createdAt})\n**Oldest:** \`${oldmem.user.tag}\` (${oldmem.user.createdAt})`
      );

    message.channel.send(em);
  },
};
