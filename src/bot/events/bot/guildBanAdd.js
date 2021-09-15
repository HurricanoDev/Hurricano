import { MessageEmbed } from "discord.js";
import BaseEvent from "../../structures/internal/BaseEvent.js";
export default (class guildBanAddEvent extends BaseEvent {
    constructor(client) {
        super("guildBanAdd", {
            description: "guildBanAdd event. Meant for server logs.",
            client,
        });
    }
    async run(guild, user, client) {
        const guildData = client.db.guilds.cache.get(guild.id);
        const serverLogChannel = await client.channels.cache.get(guildData.serverLog);
        if (!serverLogChannel)
            return;
        const embed = new MessageEmbed()
            .setTitle("Member Banned")
            .setDescription(`A member was banned in **${guild.name}**`)
            .setThumbnail(user.displayAvatarURL())
            .addField("Member Banned", user)
            .setTimestamp()
            .setColor("#606365");
        if (serverLogChannel &&
            serverLogChannel.viewable &&
            serverLogChannel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
            serverLogChannel.send({ embeds: [embed] });
        }
    }
});
