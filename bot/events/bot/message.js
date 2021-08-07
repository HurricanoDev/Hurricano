const { MessageEmbed } = require('discord.js');
const config = require('@config');
const moment = require('moment');
const { blacklistedWords } = require('../../collections/blwords.js');
const leven = require('../../utilities/leven.js');
const Cooldown = require('../../schemas/cooldown');
// const stc = require("statcord.js");
//Spam Variables
const LIMIT = 10;
const TIME = 10000;
const DIFF = 2000;
const BaseEvent = require('../../structures/internal/BaseEvent.js');
function generateKey(user_id, commandname) {
  return `${user_id}|${commandname}`;
}

async function handleCooldown(message, command) {
  const cd = await Cooldown.findOne({
    key: generateKey(message.author.id, command.name),
  });
  if (!cd) return 'allow';
  if (cd) {
    const now = Date.now();

    if (cd.expiration < now) {
      await Cooldown.deleteMany({
        key: generateKey(message.author.id, command.name),
      });
      return 'allow';
    } else {
      return message.sendErrorReply(
        'Chillza.',
        `You need to wait ${Math.floor((cd.expiration - now) / 1000).toFixed(
          1,
        )} more second(s) before reusing the \`${command.name}\` command.`,
        `"Patience is the key my child."`,
      );
    }
  }

  return false;
}

async function makeCooldown(message, command) {
  await Cooldown.deleteMany({
    key: generateKey(message.author.id, command.name),
  });
  await Cooldown.create({
    key: generateKey(message.author.id, command.name),
    expiration: Date.now() + (command.conf.cooldown ?? 3) * 1000,
  });
}

module.exports = class MessageEvent extends BaseEvent {
  constructor(client) {
    super('message', {
      description: 'Message event, used for handling commands.',
      client: client,
    });
  }
  async run(message, client) {
    const usersMap = client.usersMap;
    if (message.author.bot || message.channel.type === 'dm') return;
    if (
      !message.channel
        .permissionsFor(client.user.id)
        .has([
          'SEND_MESSAGES',
          'READ_MESSAGE_HISTORY',
          'EMBED_LINKS',
          'ADD_REACTIONS',
        ])
    )
      return message.author
        .sendError(
          message,
          'Invalid Permissions!',
          "I don't have enough permissions in this guild! Please ask an admin to give me the following permissions: \n `READ_MESSAGES`, `SEND_MESSAGES`, `EMBED_LINKS`",
        )
        ?.catch(() => {});
    //------------------------------------------------------------------
    let guildSchema = await message.guild.db.fetch();
    const muteRole = guildSchema.muteRole;
    const prefix = guildSchema.prefixes.find((x) =>
      message.content.startsWith(x),
    );
    const { author } = message;
    const prefixRegex = new RegExp(
      `^(<@!?${client.user.id}>|${prefix?.replace(
        /[.*+?^${}()|[\]\\]/g,
        '\\$&',
      )})\\s*`,
    );
    let userSchema = await client.db.users.cache.get(author.id);
    if (!userSchema) userSchema = await client.db.users.fetch(author.id);

    const mentionedMember = message.mentions.members.first();

    if (mentionedMember && message.author.id !== mentionedMember?.id) {
      const data = client.afk.get(mentionedMember.id);

      if (data) {
        const [timestamp, reason] = data;
        const timeAgo = moment(timestamp).fromNow();

        message.reply(
          new MessageEmbed({
            title: 'AFK!',
            description: `${mentionedMember} is currently AFK! **(${timeAgo})**\nReason: ${reason}`,
            color: 'RANDOM',
          }),
        );
      }
    }

    const getData = client.afk.get(message.author.id);
    if (getData) {
      client.afk.delete(message.author.id);
      message.reply('**Welcome Back!** Your AFK has now been removed!');
    }
    function checkPerm(perm) {
      return message.member.permissions.has(perm);
    }
    //Word Blacklist System
    let deleting = false;
    const blacklistedWords = client.db.guilds.cache.get(
      message.guild.id,
    ).blacklistedWords;
    blacklistedWords.map((x) => {
      if (
        message.content.toLowerCase().includes(x.toLowerCase()) &&
        !message.author.bot &&
        (!checkPerm('ADMINISTRATOR') ||
          !checkPerm('MANAGE_GUILD') ||
          !checkPerm('MANAGE_MESSAGES'))
      )
        deleting = true;
    });
    if (deleting) message.delete();

    //Anti-Spam
    const getMuteRole = message.guild.roles.cache.get(muteRole);

    if (
      muteRole &&
      getMuteRole &&
      guildSchema.antiSpam &&
      message.channel.permissionsFor(client.user.id).has(['MANAGE_ROLES']) &&
      message.member.roles.highest < message.guild.me.roles.highest &&
      !message.channel.permissionsFor(message.author.id).has(['ADMINISTRATOR'])
    ) {
      if (usersMap.has(message.author.name)) {
        const userData = usersMap.get(message.author.id);
        const { lastMessage, timer } = userData;
        const difference =
          message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;
        if (difference > DIFF) {
          clearTimeout(timer);
          userData.msgCount = 0;
          userData.lastMessage = message;
          userData.timer = setTimeout(() => {
            usersMap.delete(message.author.id);
          }, TIME);
          usersMap.set(message.author.id, userData);
        } else {
          ++msgCount;
          if (parseInt(msgCount) === LIMIT) {
            const spamEmbed = new MessageEmbed()
              .setAuthor('Slow Down!', message.member.displayAvatarURL())
              .setColor('RED')
              .setDescription(
                "**Chillza!** Hey, would you mind slowing down? You've sent 5 messages in 5 seconds.",
              )
              .setThumbnail(
                'https://assets.onlinelabels.com/images/clip-art/Leomarc/Leomarc_stop_sign.png',
              );

            message.member.roles.add(muteRole);
            message.channel.send({ embeds: [spamEmbed] });
            setTimeout(async () => {
              message.member.roles.remove(muteRole);
              const unmuteEmbed = new MessageEmbed()
                .setAuthor('Unmuted!', message.member.displayAvatarURL())
                .setColor('GREEN')
                .setDescription(
                  'You have been unmuted now, better not spam next time!',
                )
                .setThumbnail(
                  'https://lh3.googleusercontent.com/proxy/sz_ww5-B0qhs7RPhI7ilQ6Wq06IFvw7aGCl30oqn4KduUYdMz3ElboKF911VVWO0QYwodKSH3p5eEKECTvOQFcsPQeMQ4m0',
                );
              const sendUnmute = await message.channel.send({
                embeds: [unmuteEmbed],
              });
              setTimeout(async () => {
                await sendUnmute.delete();
              }, 10000);
            }, TIME);
          } else {
            userData.msgCount = msgCount;
            usersMap.set(message.author.id, userData);
          }
        }
      } else {
        let fn = setTimeout(() => {
          usersMap.delete(message.author.id);
        }, TIME);
        usersMap.set(message.author.id, {
          msgCount: 1,
          lastMessage: message,
          timer: fn,
        });
      }
    }
    let prefixes = guildSchema.prefixes.map((x) => {
      return `\`${x}\``;
    });
    prefixes = prefixes?.length ? prefixes.join(', ') : '{mention}';
    const whichToUse =
      prefixes?.length == 1
        ? guildSchema.prefixes.toString()
        : '{prefix/mention}';
    const embed = new MessageEmbed()
      .setAuthor(
        "Hello, I'm Hurricano™!",
        'https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/SetAuthorEmojis/Wave.png',
      )
      .addField(
        'Forgot my prefix?',
        `No worries! My ${
          guildSchema.prefixes?.length > 1 ? 'prefixes are' : 'prefix is'
        } ${prefixes}.`,
      )
      .addField(
        'Need help?',
        `Oh! Well, incase you want to see my commands, you can just use \`${whichToUse}help\`, and incase you need a more detailed description, you can use \`${whichToUse}help {command name}\``,
      )
      .addField(
        'Want to view my info?',
        `Cool! You can do so by using \`${whichToUse}botinfo\`. By the way, we also support slash commands!`,
      )
      .addField(
        'Still need help?',
        'Feel free to join the Hurricano™ support server, by clicking [here](https://discord.gg/RDEBGXp7sG)!',
      )
      .setColor('#034ea2')
      .setImage(
        'https://raw.githubusercontent.com/HurricanoBot/HurricanoImages/master/other/Wave.png',
      )
      .setFooter(`© Hurricano™ v1.0.0`);
    if (prefixRegex.test(message.content.toLowerCase())) {
      if (userSchema.blacklisted)
        return message.sendErrorReply(
          'You have been blacklisted!',
          'Damn it! You have been blacklisted by a bot moderator! This means you will be unable to use any of the bot commands.',
        );
      if (guildSchema.blacklisted)
        return message.sendErrorReply(
          'Blacklisted!',
          'This guild has been blacklisted. It cannot use any commands.',
        );
      if (
        message.content === `<@${client.user.id}>` ||
        (message.content === `<@!${client.user.id}>` && !userSchema.blacklisted)
      )
        return message.channel.send({ embeds: [embed] });

      const [, match] = message.content.toLowerCase().match(prefixRegex);
      if (!message.content.toLowerCase().startsWith(match)) return;
      let args = message.content.slice(match.length).trim().split(/ +/g);
      const cmd = args.shift().toLowerCase();
      const tag = guildSchema.tags.find((x) => x.name === cmd);
      if (tag) return message.reply(tag.content);
      if (cmd.length == 0) return;
      const command =
        client.commands.get(cmd) ||
        client.commands.get(client.aliases.get(cmd));

      if (userSchema.blacklisted)
        return message.sendErrorReply(
          'You have been blacklisted!',
          'Damn it! You have been blacklisted by a bot moderator! This means you will be unable to use any of the bot commands.',
        );
      if (!command) {
        const best = [
          ...client.commands.map((cmd) => cmd.name),
          ...client.aliases.keys(),
        ].filter(
          (c) => leven(cmd.toLowerCase(), c.toLowerCase()) < c.length * 0.4,
        );
        const dym =
          best.length == 0
            ? ''
            : best.length == 1
            ? `+ ${best[0]}`
            : `${best
                .slice(0, 3)
                .map((value) => `+ ${value}`)
                .join('\n')}`;

        return dym
          ? message.channel.sendError(
              message,
              'Invalid Command!',
              `Sorry! I don't have that command! Did you happen to mean: \n\`\`\`diff\n${dym}\`\`\``,
            )
          : null;
      }
      message._usedPrefix = message.content.startsWith('<')
        ? `{prefix/mention}`
        : prefix;
      if (command.subCommands && args.length) {
        const { subCommands } = command;
        function getKey(value) {
          for (const [key, val] of subCommands.commands.entries()) {
            if (Object.is(value, val)) return key;
          }
        }
        const subCommand =
          subCommands.commands.get(args[0]) ||
          subCommands.commands.find((x) => {
            const keyfunc = getKey(x);
            if (Array.isArray(keyfunc) && keyfunc.includes(args[0])) return x;
          });
        if (subCommand) {
          /**
           * Subcommand Arguments.
           * @type Array
           */

          let subArgs = args.map((x) => x);
          subArgs.shift();
          if (subCommands.baseAuthorization) {
            const auth = subCommands.baseAuthorization
              ? await subCommands.baseAuthorization(
                  message,
                  args,
                  subArgs,
                  args[0],
                )
              : null;
            if (auth && auth !== 'allow') return;
          }

          /**
           * Example:
           * subCommands: [
           * ["foo", (message) => {
           * return message.reply("bar!");
           * }]
           * ]
           */

          await subCommand(message, subArgs, args);
        }
      }

      // command.ownerOnly ? null : stc.ShardingClient.postCommand(command.name, message.author.id, client);
      let checkAdmin = config.ownerIds.includes(author.id);
      if (command.conf.ownerOnly === true && !checkAdmin)
        return message.channel.sendError(
          message,
          'Permission Error.',
          `You are not the owner of Hurricano™, ${author}.`,
        );
      if (!message.member)
        message.member = await message.guild.members.fetch(message);

      let disabledModules = guildSchema.disabledModules;
      if (
        disabledModules &&
        disabledModules.includes(command.category) &&
        !client.config.ownerIds.includes(message.author.id)
      )
        return;

      if (command.conf.userPermissions) {
        if (
          !checkPerm(command.userPermissions) &&
          !client.config.ownerIds.includes(message.author.id)
        ) {
          return message.sendErrorReply(
            'Permission Error.',
            `Stop disturbing me bro, you require the \`${command.userPermissions.join(
              ', ',
            )}\` permission(s) to use that command...`,
            'Smh, imagine trying to use a command without having the perms-',
          );
        }
      }
      if (command.conf.args && !args.length)
        return message.channel.sendError(
          message,
          'Arguments Error.',
          command.conf.args,
        );

      if (disabledModules && !disabledModules.includes('levelling')) {
        const userLevel = await client.levels.fetch(
          message.author.id,
          message.guild.id,
        );

        if (!userLevel)
          await client.levels.createUser(message.author.id, message.guild.id);
        const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
        const hasLeveledUp = await client.levels.appendXp(
          message.author.id,
          message.guild.id,
          randomAmountOfXp,
        );
        if (hasLeveledUp) {
          const user = await client.levels.fetch(
            message.author.id,
            message.guild.id,
          );
          await message.sendSuccessReply(
            `Level Up!`,
            `${message.author}, congratulations! You have leveled up to **${user.level}**! :tada:`,
          );
        }
      }
      const auth = await handleCooldown(message, command);
      if (auth !== 'allow') return;
      if (!client.config.ownerIds.includes(message.author.id))
        await makeCooldown(message, command);
      client.logger.message(
        `${message.author.tag} used the "${command.name}" command in guild ${
          message.guild
        } with args: "${args.join(' ')}"`,
      );

      await command.run(message, args);
    }
  }
};
