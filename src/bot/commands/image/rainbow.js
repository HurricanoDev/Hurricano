import Discord from "discord.js";
import { MessageAttachment } from "discord.js";
import Command from "@structures/Command.js";
import canvacord from "canvacord";
export default new Command({
    name: "rainbow",
    cooldown: 5,
    description: "Makes someone's avatar rainbow!",
    async run({ message, args }) {
        let person = (await client.utils.getMember(true, { message, args }[0]))
            .user;
        let avatar = person.displayAvatarURL({
            dynamic: false,
            format: "png",
            size: 1024,
        });
        const img = await canvacord.Canvas.rainbow(avatar);
        const embed = new Discord.MessageEmbed()
            .setAuthor("🌈", message.author.displayAvatarURL())
            .setDescription(`${person.toString()} is a   r a i n b o w .`)
            .attachFiles([new Discord.MessageAttachment(img, "img.png")])
            .setImage("attachment://img.png");
        message.reply({
            embeds: [embed],
            files: [new MessageAttachment(img, "img.png")],
        });
    },
});
