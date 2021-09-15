import Command from "@structures/Command.js";
import { MessageEmbed, MessageButton } from "discord.js";
export default new Command({
    name: "muterole",
    slash: false,
    aliases: ["setmuterole"],
    userPermissions: ["ADMINISTRATOR"],
    clientPermissions: ["MANAGE_CHANNELS"],
    cooldown: 30,
    description: "Set/remove/create your server's mute role!",
    async run({ message, args }) {
        const guildPrefix = message._usedPrefix;
        const defEmbed = new MessageEmbed()
            .setAuthor("Muterole Help", client.user.displayAvatarURL())
            .setDescription(`**Syntax:** \`${guildPrefix}muterole\`\n**Aliases:** \`setmuterole\``)
            .addField("Permissions", "`ADMINISTRATOR`")
            .addField("Subcommands:", "`set` Set a muterole.\n`remove` Remove the current muterole\n`create` Make me create a muterole!")
            .setFooter(`Type ${guildPrefix}help <command> for more info on a command.`)
            .setColor("#606365");
        const muteRow = new MessageButton()
            .setcustomId("muteHelpDelete")
            .setLabel("Delete?")
            .setEmoji("<:trashcan:854306995280150558>")
            .setStyle("PRIMARY");
        if (!args.length) {
            const sendMsg = await message.channel.send({
                embeds: [defEmbed],
                components: [[muteRow]],
            });
            let conf = await sendMsg
                .awaitMessageComponent({
                filter: (x) => (x.user.id === message.author.id) &
                    (x.customId == "muteHelpDelete"),
                time: 45000,
            })
                .catch(() => {
                sendMsg.edit({ components: [] });
            });
            if (conf?.customId) {
                conf.reply({
                    content: "Successfully deleted!",
                    ephemeral: true,
                });
                sendMsg.delete();
            }
            return;
        }
        switch (args[0].toLowerCase()) {
            case "set":
                const role = message.mentions.roles.first() ||
                    message.guild.roles.cache.get(args[1]);
                if (!role)
                    return message.sendErrorReply("Incorrect Usage", `Usage: \`${guildPrefix}muterole set <role/roleID>\``);
                const data = await client.schemas.guild.findOneAndUpdate({
                    id: message.guild.id,
                }, {
                    muteRole: role.id,
                }, {
                    upsert: true,
                });
                message.sendSuccessReply("Success!", `The mute role was set => ${role}`);
                break;
            case "create":
                const muteRole = await message.guild.roles.create({
                    name: "Muted",
                    color: "RED",
                    reason: "Muterole created.",
                    hoisted: true,
                    permissions: ["VIEW_CHANNEL"],
                });
                await message.channel.sendSuccess(message, "Role Created", "The mute role was created. Applying overwrites now.");
                message.guild.channels.cache.forEach((channel) => {
                    channel.updateOverwrite(muteRole.id, {
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: null,
                    });
                });
                message.channel.sendSuccess(message, "Done!", `Applied overwrites to ${message.guild.channels.cache.size} channels.`);
                const createData = await client.schemas.guild.findOneAndUpdate({ id: message.guild.id }, { muteRole: muteRole.id }, { upsert: true });
                break;
            case "remove":
                const isData = await client.schemas.guild.findOne({
                    id: message.guild.id,
                });
                if (!isData.muteRole)
                    return message.sendErrorReply("Error!", `There is no muterole set in this server! Use \`${await client.db.guilds.getPrefix(message.guild.id)}muterole set/create\` to set one!`);
                const noMuteRole = await client.schemas.guild.findOneAndUpdate({ id: message.guild.id }, { muteRole: null }, { upsert: true });
                message.channel.sendSuccess(message, "Done!", "The muterole for this server was successfully removed!");
                break;
        }
    },
});
