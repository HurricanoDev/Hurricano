import Discord from "discord.js";
import { MessageAttachment } from "discord.js";
import Command from "@structures/Command.js";
import canvacord from "canvacord";
export default new Command({
    name: "trigger",
    cooldown: 5,
    description: "Shows a triggered version of someone's avatar!",
    async run({ message, args }) {
        let person = (await client.utils.getMember(true, { message, args }[0]))
            .user;
        let avatar = person.displayAvatarURL({
            dynamic: false,
            format: "png",
            size: 1024,
        });
        const img = await canvacord.Canvas.trigger(avatar);
        const embed = new Discord.MessageEmbed()
            .setAuthor("Triggered.", message.author.displayAvatarURL())
            .setDescription(`${person} is so triggered.`)
            .attachFiles([new Discord.MessageAttachment(img, "img.png")])
            .setImage("attachment://img.png");
        message.reply({
            embeds: [embed],
            files: [new MessageAttachment(img, "img.png")],
        });
    },
});
