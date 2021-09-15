import Command from "@structures/Command.js";
import { MessageEmbed } from "discord.js";
export default new Command({
    name: "snipe",
    description: "Snipe a deleted message.",
    ownerOnly: true,
    async run({ message, args }) {
        function snipeEmbed(messageSnipe, number, arrayLength) {
            const embed = new MessageEmbed()
                .setAuthor("Sniped!", messageSnipe.author.displayAvatarURL())
                .setTitle("Content:")
                .setDescription(messageSnipe.content);
            messageSnipe.action
                ? embed.addField("Action:", `**\`${messageSnipe.action}.\`**`, true)
                : null;
            embed.addField("Action By:", `${messageSnipe.author}, \n ID: ${messageSnipe.authorId}`, true);
            messageSnipe.attachments
                ? embed.addField("Attachments:", messageSnipe.attachments.join(", \n"), true)
                : null;
            embed.setFooter(`Message ${number}/${arrayLength}`);
            return embed;
        }
        if (!args.length) {
            const array = client.snipes.recent
                .get(message.channel.id)
                ?.reverse();
            if (!array)
                return message.channel.sendError(message, "Nothing to Snipe!", `There's nothing to snipe, ${message.author}!`);
            const messageSnipe = array[0];
            const embed = snipeEmbed(messageSnipe, 1, array.length);
            message.channel.send({ embeds: [embed] });
        }
        const number = +args[0];
        if (number) {
            const array = client.snipes.recent
                .get(message.channel.id)
                .reverse();
            if (!array)
                return message.channel.sendError(message, "Nothing to Snipe!", `There's nothing to snipe, ${message.author}!`);
            if (array?.length < number)
                return message.channel.sendError(message, "Invalid Number!", `There's only \`${array.length}\` messages I can snipe!`);
            const messageSnipe = array[number - 1];
            const embed = snipeEmbed(messageSnipe, number, array.length);
            message.channel.send({ embeds: [embed] });
        }
        const num = +args[1] - 1;
        switch (args[0]) {
            case "delete":
                const msgs = this.client.snipes.deleted
                    .get(message.channel.id)
                    .reverse();
                if (!msgs)
                    return message.channel.sendError(message, "Nothing to Snipe!", `There's nothing to snipe, ${message.author}!`);
                if (msgs?.length < num)
                    return message.channel.sendError(message, "Invalid Number!", `There's only \`${array.length}\` messages I can snipe!`);
                const msg = args[1] ? msgs[num] : msgs[0];
                const embed = snipeEmbed(msg, num, array.length);
                return message.channel.send({ embeds: [embed] });
                break;
            case "edit":
                const msgsE = this.client.snipes.deleted
                    .get(message.channel.id)
                    .reverse();
                if (msgsE?.length < num)
                    return message.channel.sendError(message, "Invalid Number!", `There's only \`${array.length}\` messages I can snipe!`);
                const msgE = args[1] ? msgsE[num] : msgsE[0];
                const embedE = snipeEmbed(msgE, num, array.length);
                return message.channel.send({ embeds: [embed] });
        }
    },
});
