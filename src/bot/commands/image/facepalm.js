import Discord from "discord.js";
import { MessageAttachment } from "discord.js";
import Command from "@structures/Command.js";
import canvacord from "canvacord";
export default new Command({
    name: "facepalm",
    cooldown: 5,
    description: "Make your own facepalm image with your/mentions avatar.",
    async run({ message, args }) {
        let person = (await client.utils.getMember(true, { message, args }[0]))
            .user;
        let avatar = person.displayAvatarURL({
            dynamic: false,
            format: "png",
            size: 1024,
        });
        let avatar2 = message.author.displayAvatarURL({
            dynamic: false,
            format: "png",
        });
        let image = await canvacord.Canvas.facepalm(avatar);
        return message.reply({
            embeds: [new Discord.MessageEmbed()],
            files: [new MessageAttachment(img, "img.png")],
        });
    },
});
