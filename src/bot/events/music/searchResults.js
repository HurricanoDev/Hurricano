import { MessageEmbed } from "discord.js";
export const name = "searchResults";
export const run = async (queue, query, tracks) => {
    const message = queue.metadata;
    message.channel.send({
        embeds: [
            new MessageEmbed()
                .setAuthor(`Search Results for ${query}.`, "https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Success.png")
                .setDescription(`${tracks
                .map((t, i) => `**${i + 1}** - ${t.title}`)
                .join("\n")}`)
                .setTimestamp()
                .setFooter("Type the number you want to play, or type cancel to cancel."),
        ],
    });
};
export default {
    name,
    run,
};
