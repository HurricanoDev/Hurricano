import Command from "@structures/Command.js";
import { MessageEmbed } from "discord.js";
export default new Command({
    name: "balance",
    aliases: ["bal", "coins", "money"],
    description: "Check how many coins you have.",
    async run({ message, args }) {
        const target = await client.utils.getMember(true, { message, args }[0]);
        const userData = client.db.users.cache.get(target.id);
        const wallet = userData.wallet;
        const bank = userData.bank;
        const balEmbed = new MessageEmbed()
            .setTitle(`${target.user.username}'s balance`)
            .setDescription(`**Wallet:** 🪙 ${wallet}\n**Bank:** 🪙 ${bank}`)
            .setTimestamp()
            .setFooter("🤠");
        message.channel.send({ embeds: [balEmbed] });
    },
});
