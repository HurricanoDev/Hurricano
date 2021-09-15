import { MessageAttachment, MessageEmbed } from "discord.js";
import Command from "@structures/Command.js";
import fetch from "node-fetch";
export default new Command({
    name: "clyde",
    cooldown: 5,
    description: "Sends a clyde message",
    async run({ message, args }) {
        const text = args.slice().join(" ");
        if (!text) {
            return message.channel.sendError(message, "An Error Occured.", "Please provide valid text.");
        }
        const url = `https://nekobot.xyz/api/imagegen?type=clyde&text=${EncodeURIComponent(text)}`;
        let response;
        try {
            response = await fetch(url).then((res) => res.json());
        }
        catch (e) {
            return message.channel.sendError(message, "An Error Occured.", `Error: \`\`\`js\n${e.stack}\`\`\``);
        }
        const embed = new MessageEmbed()
            .setAuthor("Clyde do be talkin' tho-")
            .setDescription("Clyde do be talkin' real smooth-")
            .setImage("attachment://clyde.png");
        return message.channel.send({
            embeds: [embed],
            files: [new MessageAttachment(response.message, "clyde.png")],
        });
    },
});
