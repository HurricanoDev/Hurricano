import Discord from "discord.js";
import { MessageAttachment } from "discord.js";
import Command from "@structures/Command.js";
import canvacord from "canvacord";
export default new Command({
    name: "wanted",
    cooldown: 5,
    description: "Makes someone's avatar wanted.",
    async run({ message, args }) {
        let person = (await client.utils.getMember(true, { message, args }[0]))
            .user;
        let avatar = person.displayAvatarURL({
            dynamic: false,
            format: "png",
            size: 1024,
        });
        const img = await canvacord.Canvas.wanted(avatar);
        const embed = new Discord.MessageEmbed()
            .setAuthor("Wanted.", message.author.displayAvatarURL())
            .setDescription(`${person.toString()} is now wanted.`)
            .attachFiles([new Discord.MessageAttachment(img, "img.png")])
            .setImage("attachment://img.png");
        message.reply({
            embeds: [embed],
            files: [new MessageAttachment(img, "img.png")],
        });
    },
});
