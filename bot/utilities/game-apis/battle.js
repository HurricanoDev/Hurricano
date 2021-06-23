const { MessageEmbed } = require("discord.js");
const Button = require('../../utilities/ButtonMenu.js')
let attacks = ["stab", "attack", "360 no scope", "punch", "kick"];
let heals = ["heal", "bandage", "chew 5 gum", "potion", "rest"];
let chance = ["yes", "yes", "no", "yes", "yes", "no", "yes", "yes"];
//BATTLES
async function createBattle(member, message) {
  const settings = {
    health: 100,
    attackMin: 1,
    attackMax: 40,
    healMin: 5,
    healMax: 20,
  };
  const playerOneData = {
    id: message.author.id,
    battleHealth: settings.health,
    battleActive: false,
    battleTurn: false,
  };
  const playerTwoData = {
    id: member.id,
    battleHealth: settings.health,
    battleActive: false,
    battleTurn: false,
  };
  if (member.id === message.author.id)
    return message.sendErrorReply("Error", "You can't play with yourself!");
  if (member.user.bot) return message.sendErrorReply("Error!", "You cannot battle against bots!");
  return start(member, message.channel, message.author.id, member.id, message);

  //
  async function start(member, channel, playerOne, playerTwo, message) {
    await channel
      .send(
        `Hey ${member}! ${message.author} has challenged you to a battle, do you accept?`
      )
      .then(async (msg) => {
        await msg.react("✅");
        await msg.react("❌");
        const filter = (reaction, user) =>
          reaction.emoji.name === "❌" && user.id === playerTwo;
        const no = msg.createReactionCollector(filter, {
          time: 15000,
          max: 1,
        });
        const filter2 = (reaction, user) =>
          reaction.emoji.name === "✅" && user.id === playerTwo;
        const yes = msg.createReactionCollector(filter2, {
          time: 15000,
          max: 1,
        });

        no.on("collect", async (collected) => {
          await msg.edit("Sorry, the user has declined your request!");
          await yes.stop();
        });
        yes.on("collect", async (collected) => {
          if (
            (playerOneData.battleActive === true &&
              playerOneData.id === playerOne) ||
            (playerTwoData.battleActive === true &&
              playerOneData.id === playerTwo)
          )
            return msg.edit("You are already in a battle!");
          await no.stop();
          return accept(channel, playerOne, playerTwo, message, member);
        });
        setTimeout(() => {
          if (
            playerOneData.battleActive === false &&
            playerOneData.battleActive === false
          ) {
            return msg.edit("They didn't react in time :/");
          }
        }, 15000);
      });
  }

  async function accept(channel, playerOne, playerTwo, message, member) {
    playerOneData.battleActive = true;
    playerTwoData.battleActive = true;
    const battleEmbed = new MessageEmbed()
      .setTitle("Settings")
      .setDescription(
        `Here are the settings you can change\nhealth: \`${settings.health}\`\nheal min: \`${settings.healMin}\` | heal max: \`${settings.healMax}\`\nattack min: \`${settings.attackMin}\` | attack max: \`${settings.attackMax}\`\n\nYou can change the values by typing in the name, then a number\nExample: \`heal max 50\`\nSend \`start\` to start!`
      )
      .setColor("GREEN")
      .setFooter(message.member.displayName, message.author.displayAvatarURL());
    channel.send({ embeds: [battleEmbed] }).then(async (started) => {
      let filter1 = (msg) => msg.author.id === playerOne;
      let setSettings = channel.createMessageCollector(filter1, {
        time: 120000,
      });

      setSettings.on("collect", async (msg) => {
        let args = msg.content.split(/ +/);
        if (
          args[0] === "heal" &&
          args[1] &&
          args[2] &&
          !isNaN(args[2] && args[2] <= 200 && args[2] >= 2)
        ) {
          if (args[1] === "min") {
            settings.healMin = parseInt(args[2]);
            setTimeout(() => {
              const emb2 = new MessageEmbed()
                .setTitle("Settings")
                .setDescription(
                  `Here are the settings you can change\nhealth: \`${settings.health}\`\nheal min: \`${settings.healMin}\` | heal max: \`${settings.healMax}\`\nattack min: \`${settings.attackMin}\` | attack max: \`${settings.attackMax}\`\n\nYou can change the values by typing in the name, then a number\nExample: \`heal max 50\`\nSend \`start\` to start!`
                )
                .setColor("GREEN")
                .setFooter(
                  message.member.displayName,
                  message.author.displayAvatarURL()
                );
              started.edit({ embeds: [emb2] });
            }, 1000);
          } else if (args[1] === "max") {
            settings.healMax = parseInt(args[2]);
            setTimeout(() => {
              const emb3 = new MessageEmbed()
                .setTitle("Settings")
                .setDescription(
                  `Here are the settings you can change\nhealth: \`${settings.health}\`\nheal min: \`${settings.healMin}\` | heal max: \`${settings.healMax}\`\nattack min: \`${settings.attackMin}\` | attack max: \`${settings.attackMax}\`\n\nYou can change the values by typing in the name, then a number\nExample: \`heal max 50\`\nSend \`start\` to start!`
                )
                .setColor("GREEN")
                .setFooter(
                  message.member.displayName,
                  message.author.displayAvatarURL()
                );
              started.edit({ embeds: [emb3] });
            }, 1000);
          }
        } else if (
          args[0] === "attack" &&
          args[1] &&
          args[2] &&
          !isNaN(args[2]) &&
          args[2] <= 200 &&
          args[2] >= 2
        ) {
          if (args[1] === "min") {
            settings.attackMin = parseInt(args[2]);
            setTimeout(() => {
              const emb4 = new MessageEmbed()
                .setTitle("Settings")
                .setDescription(
                  `Here are the settings you can change\nhealth: \`${settings.health}\`\nheal min: \`${settings.healMin}\` | heal max: \`${settings.healMax}\`\nattack min: \`${settings.attackMin}\` | attack max: \`${settings.attackMax}\`\n\nYou can change the values by typing in the name, then a number\nExample: \`heal max 50\`\nSend \`start\` to start!`
                )
                .setColor("GREEN")
                .setFooter(
                  message.member.displayName,
                  message.author.displayAvatarURL()
                );
              started.edit({ embeds: [emb4] });
            }, 1000);
          } else if (args[1] === "max") {
            settings.attackMax = parseInt(args[2]);
            setTimeout(() => {
              const emb5 = new MessageEmbed()
                .setTitle("Settings")
                .setDescription(
                  `Here are the settings you can change\nhealth: \`${settings.health}\`\nheal min: \`${settings.healMin}\` | heal max: \`${settings.healMax}\`\nattack min: \`${settings.attackMin}\` | attack max: \`${settings.attackMax}\`\n\nYou can change the values by typing in the name, then a number\nExample: \`heal max 50\`\nSend \`start\` to start!`
                )
                .setColor("GREEN")
                .setFooter(
                  message.member.displayName,
                  message.author.displayAvatarURL()
                );
              started.edit({ embeds: [emb5] });
            }, 1000);
          }
        } else if (
          args[0] === "health" &&
          !isNaN(args[1]) &&
          args[1] <= 500 &&
          args[1] >= 50
        ) {
          settings.health = args[1];
          playerOneData.battleHealth = parseInt(args[1]);
          playerTwoData.battleHealth = parseInt(args[1]);
          setTimeout(() => {
            const emb6 = new MessageEmbed()
              .setTitle("Settings")
              .setDescription(
                `Here are the settings you can change\nhealth: \`${settings.health}\`\nheal min: \`${settings.healMin}\` | heal max: \`${settings.healMax}\`\nattack min: \`${settings.attackMin}\` | attack max: \`${settings.attackMax}\`\n\nYou can change the values by typing in the name, then a number\nExample: \`heal max 50\`\nSend \`start\` to start!`
              )
              .setColor("GREEN")
              .setFooter(
                message.member.displayName,
                message.author.displayAvatarURL()
              );
            started.edit({
              embeds: [emb6],
            });
          }, 1000);
        } else if (args[0] === "start") {
          await setSettings.stop();
          await first(channel, playerOne, playerTwo, message);
          const emb7 = new MessageEmbed()
            .setTitle("Battle!")
            .setDescription(
              `First Player: <@${playerOne}> \`HP: ${
                playerOneData.battleHealth
              }\`\nSecond Player: <@${playerTwo}> \`HP: ${
                playerTwoData.battleHealth
              }\`\n\nAttacks: \`${attacks.join(
                ", "
              )}\`\nHealing: \`${heals.join(
                ", "
              )}\`\n\nUse \`--end\` on your turn to end`
            )
            .setColor("RED")
            .setFooter(message.author.username, message.author.avatarURL());
          return channel.send({
            embeds: [emb7],
          });
        }
      });
    });
  }

  // Player 1
  async function first(channel, playerOne, playerTwo, message) {
    let nowBattling = channel.guild.members.cache.get(playerOne);
    let nextUp = channel.guild.members.cache.get(playerTwo);

    let filter = (msg) => msg.author.id === nowBattling.id;
    let collector = channel.createMessageCollector(filter);
    if (playerOneData.battleTurn === true) return;
    playerOneData.battleTurn = true;

    if (playerOneData.battleHealth <= 0) {
      return end(channel, playerOne, playerTwo, playerTwo);
    }

    collector.on("collect", async (msg) => {
      if (
        msg.content.toLowerCase() === "--end" ||
        msg.content.toLowerCase() === "suicide"
      ) {
        let winner;
        if (playerOneData.battleHealth >= playerTwoData.battleHealth)
          winner = playerOne;
        if (playerOneData.battleHealth < playerTwoData.battleHealth)
          winner = playerTwo;
        await collector.stop();
        return end(channel, playerOne, playerTwo, winner);
      }

      //Attacks
      var i;
      for (i = 0; i < attacks.length; i++) {
        if (msg.content.toLowerCase() === attacks[i]) {
          let attackAmount =
            Math.floor(
              Math.random() * (settings.attackMax - settings.attackMin)
            ) + settings.attackMin;
          let attackChance = Math.floor(Math.random() * chance.length);
          if (chance[attackChance] === "yes") {
            playerTwoData.battleHealth -= attackAmount;
            playerOneData.battleTurn = false;
            await collector.stop();
            const emb8 = new MessageEmbed()
              .setDescription(
                `${nowBattling} used **${attacks[i]}** to do \`${attackAmount}\` damage to ${nextUp}, they have \`${playerTwoData.battleHealth}\` HP Left!`
              )
              .setColor("RED")
              .setAuthor(
                `Attack by: ${nowBattling.displayName}`,
                nowBattling.user.displayAvatarURL()
              )
              .setFooter(
                `Next up: ${nextUp.displayName}`,
                nextUp.user.displayAvatarURL()
              );
            await channel.send({
              embeds: [emb8],
            });
            return second(channel, playerOne, playerTwo, message);
          } else if (chance[attackChance] === "no") {
            playerOneData.battleTurn = false;
            await collector.stop();
            const emb9 = new MessageEmbed()
              .setDescription(
                `${nowBattling} used **${attacks[i]}** against ${nextUp}, but it was unsuccessful, they still have \`${playerTwoData.battleHealth}\` HP Left!`
              )
              .setColor("RED")
              .setAuthor(
                `Attack by: ${nowBattling.displayName}`,
                nowBattling.user.displayAvatarURL()
              )
              .setFooter(
                `Next up: ${nextUp.displayName}`,
                nextUp.user.displayAvatarURL()
              );
            await channel.send({
              embeds: [emb9],
            });
            await second(channel, playerOne, playerTwo, message);
          }
        }
      }

      // Heals
      var x;
      for (x = 0; x < heals.length; x++) {
        if (msg.content.toLowerCase() === heals[x]) {
          let healAmount =
            Math.floor(Math.random() * (settings.healMax - settings.healMin)) +
            settings.healMin;
          let healChance = Math.floor(Math.random() * chance.length);
          if (chance[healChance] === "yes") {
            playerOneData.battleHealth += healAmount;
            playerOneData.battleTurn = false;
            await collector.stop();
            const emb10 = new MessageEmbed()
              .setDescription(
                `${nowBattling} used **${heals[x]}** and healed \`${healAmount}\` HP, they now have \`${playerOneData.battleHealth}\` HP!`
              )
              .setColor("GREEN")
              .setAuthor(
                `Heal by: ${nowBattling.displayName}`,
                nowBattling.user.displayAvatarURL()
              )
              .setFooter(
                `Next up: ${nextUp.displayName}`,
                nextUp.user.displayAvatarURL()
              );
            await channel.send({
              embeds: [emb10],
            });
            return second(channel, playerOne, playerTwo, message);
          } else if (chance[healChance] === "no") {
            playerOneData.battleTurn = false;
            await collector.stop();
            const emb11 = new MessageEmbed()
              .setDescription(
                `${nowBattling} used **${heals[x]}** but it was unsuccessful, they still have \`${playerTwoData.battleHealth}\` HP!`
              )
              .setColor("GREEN")
              .setAuthor(
                `Heal by: ${nowBattling.displayName}`,
                nowBattling.user.displayAvatarURL()
              )
              .setFooter(
                `Next up: ${nextUp.displayName}`,
                nextUp.user.displayAvatarURL()
              );
            await channel.send({
              embeds: [emb11],
            });
            return second(channel, playerOne, playerTwo, message);
          }
        }
      }
    });
  }

  // Player 2
  async function second(channel, playerOne, playerTwo, message) {
    let nowBattling = channel.guild.members.cache.get(playerTwo);
    let nextUp = channel.guild.members.cache.get(playerOne);
    let data = playerTwoData;

    let filter = (yeet) => yeet.author.id === nowBattling.id;
    let collector = channel.createMessageCollector(filter);
    if (playerTwoData.battleTurn === true) return;
    playerTwoData.battleTurn = true;

    //Check if they are dead
    if (playerTwoData.battleHealth <= 0) {
      return end(channel, playerOne, playerTwo, playerOne);
    }

    collector.on("collect", async (msg) => {
      if (
        msg.content.toLowerCase() === "--end" ||
        msg.content.toLowerCase() === "Ã°Å¸ÂÂ³Ã¯Â¸Â" ||
        msg.content.toLowerCase() === "suicide"
      ) {
        let winner;
        if (playerOneData.battleHealth >= playerTwoData.battleHealth)
          winner = playerOne;
        if (playerOneData.battleHealth < playerTwoData.battleHealth)
          winner = playerTwo;
        await collector.stop();
        return end(channel, playerOne, playerTwo, winner);
      }

      //Attacks
      var i;
      for (i = 0; i < attacks.length; i++) {
        if (msg.content.toLowerCase() === attacks[i]) {
          let attackAmount =
            Math.floor(
              Math.random() * (settings.attackMax - settings.attackMin)
            ) + settings.attackMin;
          let attackChance = Math.floor(Math.random() * chance.length);
          if (chance[attackChance] === "yes") {
            playerOneData.battleHealth -= attackAmount;
            playerTwoData.battleTurn = false;
            await collector.stop();
            const emb12 = new MessageEmbed()
              .setDescription(
                `${nowBattling} used **${attacks[i]}** to do \`${attackAmount}\` damage to ${nextUp}, they have \`${playerOneData.battleHealth}\` HP Left!`
              )
              .setColor("RED")
              .setAuthor(
                `Attack by: ${nowBattling.displayName}`,
                nowBattling.user.displayAvatarURL()
              )
              .setFooter(
                `Next up: ${nextUp.displayName}`,
                nextUp.user.displayAvatarURL()
              );
            await channel.send({
              embeds: [emb12],
            });
            return first(channel, playerOne, playerTwo, message);
          } else if (chance[attackChance] === "no") {
            playerTwoData.battleTurn = false;
            await collector.stop();
            const emb13 = new MessageEmbed()
              .setDescription(
                `${nowBattling} used **${attacks[i]}** against ${nextUp}, but it was unsuccessful, they still have \`${playerTwoData.battleHealth}\` HP Left!`
              )
              .setColor("RED")
              .setAuthor(
                `Attack by: ${nowBattling.displayName}`,
                nowBattling.user.displayAvatarURL()
              )
              .setFooter(
                `Next up: ${nextUp.displayName}`,
                nextUp.user.displayAvatarURL()
              );
            await channel.send({
              embeds: [emb13],
            });
            return first(channel, playerOne, playerTwo, message);
          }
        }
      }

      //Heals
      var x;
      for (x = 0; x < heals.length; x++) {
        if (msg.content.toLowerCase() === heals[x]) {
          let healAmount =
            Math.floor(Math.random() * (settings.healMax - settings.healMin)) +
            settings.healMin;
          let healChance = Math.floor(Math.random() * chance.length);
          if (chance[healChance] === "yes") {
            playerTwoData.battleHealth += healAmount;
            playerTwoData.battleTurn = false;
            await collector.stop();
            const emb14 = new MessageEmbed()
              .setDescription(
                `${nowBattling} used **${heals[x]}** and healed \`${healAmount}\` HP, they now have \`${playerTwoData.battleHealth}\` HP!`
              )
              .setColor("GREEN")
              .setAuthor(
                `Heal by: ${nowBattling.displayName}`,
                nowBattling.user.displayAvatarURL()
              )
              .setFooter(
                `Next up: ${nextUp.displayName}`,
                nextUp.user.displayAvatarURL()
              );
            await channel.send({
              embeds: [emb14],
            });
            return first(channel, playerOne, playerTwo, message);
          } else if (chance[healChance] === "no") {
            playerTwoData.battleTurn = false;
            await collector.stop();
            const emb15 = new MessageEmbed()
              .setDescription(
                `${nowBattling} used **${heals[x]}** but it was unsuccessful, they still have \`${playerTwoData.battleHealth}\` HP!`
              )
              .setColor("GREEN")
              .setAuthor(
                `Heal by: ${nowBattling.displayName}`,
                nowBattling.user.displayAvatarURL()
              )
              .setFooter(
                `Next up: ${nextUp.displayName}`,
                nextUp.user.displayAvatarURL()
              );
            await channel.send({
              embeds: [emb15],
            });
            return first(channel, playerOne, playerTwo, message);
          }
        }
      }
    });
  }

  async function end(channel, playerOne, playerTwo, winner) {
    let wonData;
    let won = channel.guild.members.cache.get(winner);
    if (winner === playerOne) wonData = playerOneData;
    if (winner === playerTwo) wonData = playerTwoData;
    setTimeout(() => {
      const emb16 = new MessageEmbed()
        .setTitle("Congratulations!")
        .setDescription(
          `${won} has won the battle with \`${wonData.battleHealth}\` HP Left!`
        )
        .setColor("GREEN")
        .setFooter(won.displayName, won.user.displayAvatarURL());
      return channel.send({
        embeds: [emb16],
      });
    }, 1500);
  }
}

module.exports.createBattle = createBattle;
