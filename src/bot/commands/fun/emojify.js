import Discord from "discord.js";
import Command from "@structures/Command.js";
export default new Command({
    name: "emojify",
    aliases: ["emjfy"],
    description: "Emojify some text!",
    clientPermissions: ["SEND_MESSAGES"],
    async run({ message, args }) {
        if (!args.join(" "))
            return message.channel.sendError(message, "Error!", `Correct Usage: \`${message._usedPrefix}emojify <text>\``);
        function hasNumber(myString) {
            return /\d/.test(myString);
        }
        if (hasNumber(args.join(" ")))
            return message.channel.sendError(message, "Error!", "I can't emojify text with numbers in it!");
        let msg = message.content.slice(message.content.indexOf(args.join(" ")), message.content.length);
        msg = msg
            .split("")
            .map((c) => {
            if (c === " ")
                return c;
            else if (/[0-9]/.test(c))
                return numberMap[c];
            else
                return /[a-zA-Z]/.test(c)
                    ? ":regional_indicator_" + c.toLowerCase() + ":"
                    : "";
        })
            .join("");
        if (msg.length > 2048) {
            msg = msg.slice(0, msg.length - (msg.length - 2033));
            msg = msg.slice(0, msg.lastIndexOf(":")) + "**...**";
        }
        const embed = new Discord.MessageEmbed()
            .setTitle("Emojify")
            .setColor("BLUE")
            .setDescription(msg)
            .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp();
        message.channel.send({ embeds: [embed] });
    },
});
