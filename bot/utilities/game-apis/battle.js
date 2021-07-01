const { MessageEmbed, MessageButton } = require("discord.js");
const Button = require("../../utilities/ButtonMenu.js");
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
    return message.sendErrorReply("Error.", "You can't play with yourself!");
  if (member.user.bot)
    return message.sendErrorReply("Error!", "You cannot battle against bots!");
  return start(member, message);

  //
  async function start(member, message) {
    const msg = await message.channel.sendSuccess(
      message,
      "Battle!",
      `Hey ${member}! ${message.author} has challenged you to a battle, do you accept?`,
      null,
      null,
      [
        [
          new MessageButton()
            .setStyle("SUCCESS")
            .setCustomID("yes")
            .setEmoji("✅"),
          new MessageButton()
            .setStyle("DANGER")
            .setCustomID("no")
            .setEmoji("❌"),
        ],
      ]
    );
    const confir = msg.createMessageComponentInteractionCollector(() => true);
    let rejectedOof;
    confir.on("collect", (button) => {
      if (button.user.id !== message.author.id && button.user.id !== member.id)
        return button.reply({
          ephemeral: true,
          content: "This battle is not meant for you.",
        });
        if (button.user.id === message.author.id) return button.reply({
          content: "The person you are battling must confirm, not you!",
          ephemeral: true
        })
      if (button.customID === "yes") {
        button.deferUpdate();
        msg.editSuccess(
          "Accepted!",
          `${member} accepted your request, ${message.author}! Battle!`
        );
        confir.stop();
        return accept(member, message);
      } else {
        button.deferUpdate();
        rejectedOof = true;
        confir.stop();
        return msg.editError(
          "Rejected!",
          `Oof. ${member} rejected your request for battle.`
        );
      }
    });
    if (rejectedOof) return;
    setTimeout(() => {
      if (
        playerOneData.battleActive === false &&
        playerOneData.battleActive === false
      ) {
        return msg.editError(
          "Timeout Reached.",
          "Oof, they didn't react in time."
        );
      }
    }, 15000);
  }
  async function accept(member, message) {
    playerOneData.battleActive = true;
    playerTwoData.battleActive = true;
    const battleEmbed = new MessageEmbed()
      .setTitle("Settings")
      .setDescription(
        `Here are the settings you can change\nhealth: \`${settings.health}\`\nheal min: \`${settings.healMin}\` | heal max: \`${settings.healMax}\`\nattack min: \`${settings.attackMin}\` | attack max: \`${settings.attackMax}\`\n\nYou can change the values by typing in the name, then a number\nExample: \`heal max 50\`\nSend \`start\` to start!`
      )
      .setColor("GREEN")
      .setFooter(message.member.displayName, message.author.displayAvatarURL());
    message.channel.send({ embeds: [battleEmbed] }).then(async (started) => {
      const filter1 = (msg) => msg.author.id === message.author.id;
      const setSettings = message.channel.createMessageCollector(filter1, {
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
          await first(member, message);
          const emb7 = new MessageEmbed()
            .setTitle("Battle!")
            .setDescription(
              `First Player: ${message.author} \`HP: ${
                playerOneData.battleHealth
              }\`\nSecond Player: ${member} \`HP: ${
                playerTwoData.battleHealth
              }\`\n\nAttacks: \`${attacks.join(
                ", "
              )}\`\nHealing: \`${heals.join(
                ", "
              )}\`\n\nUse \`--end\` on your turn to end`
            )
            .setColor("RED")
            .setFooter(message.member.displayName, message.author.avatarURL());
          return message.channel.send({
            embeds: [emb7],
          });
        }
      });
    });
  }

  // Player 1
  async function first(member, message) {
    let nowBattling = member;
    let nextUp = message.member;

    let filter = (msg) => msg.author.id === nowBattling.id;
    let collector = message.channel.createMessageCollector(filter);
    if (playerOneData.battleTurn === true) return;
    playerOneData.battleTurn = true;

    if (playerOneData.battleHealth <= 0) {
      return end(message, member, member.id);
    }

    collector.on("collect", async (msg) => {
      if (
        msg.content.toLowerCase() === "--end" ||
        msg.content.toLowerCase() === "suicide"
      ) {
        let winner;
        if (playerOneData.battleHealth >= playerTwoData.battleHealth)
          winner = message.author.id;
        if (playerOneData.battleHealth < playerTwoData.battleHealth)
          winner = member.id;
        await collector.stop();
        return end(message, member, member.id);
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
            await message.channel.send({
              embeds: [emb8],
            });
            return second(member, message);
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
            await message.channel.send({
              embeds: [emb9],
            });
            await second(member, message);
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
            await message.channel.send({
              embeds: [emb10],
            });
            return second(member, message);
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
            await message.channel.send({
              embeds: [emb11],
            });
            return second(member, message);
          }
        }
      }
    });
  }

  // Player 2
  async function second(member, message) {
    let nowBattling = member;
    let nextUp = message.member;
    let data = playerTwoData;

    let filter = (yeet) => yeet.author.id === nowBattling.id;
    let collector = message.channel.createMessageCollector(filter);
    if (playerTwoData.battleTurn === true) return;
    playerTwoData.battleTurn = true;

    //Check if they are dead
    if (playerTwoData.battleHealth <= 0) {
      return end(message, member, message.author.id);
    }

    collector.on("collect", async (msg) => {
      if (
        msg.content.toLowerCase() === "--end" ||
        msg.content.toLowerCase() === "Ã°Å¸ÂÂ³Ã¯Â¸Â" ||
        msg.content.toLowerCase() === "suicide"
      ) {
        let winner;
        if (playerOneData.battleHealth >= playerTwoData.battleHealth)
          winner = message.author.id;
        if (playerOneData.battleHealth < playerTwoData.battleHealth)
          winner = member.id;
        await collector.stop();
        return end(message, member, winner);
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
            await message.channel.send({
              embeds: [emb12],
            });
            return first(member, message);
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
            await message.channel.send({
              embeds: [emb13],
            });
            return first(member, message);
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
            await message.channel.send({
              embeds: [emb14],
            });
            return first(member, message);
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
            await message.channel.send({
              embeds: [emb15],
            });
            return first(member, message);
          }
        }
      }
    });
  }

  async function end(message, member, winner) {
    let wonData;
    let won = winner;
    if (winner === message.author.id) wonData = playerOneData;
    if (winner === member.id) {
      wonData = playerTwoData;
      won = member;
    };
    const emb16 = new MessageEmbed()
      .setTitle("Congratulations!")
      .setDescription(
        `${won} has won the battle with \`${wonData.battleHealth}\` HP Left!`
      )
      .setColor("GREEN")
      .setFooter(won.username ? message.member.displayName : won.displayName, won.username ? won.displayAvatarURL() : won.user.displayAvatarURL());
    return message.channel.send({
      embeds: [emb16],
    });
  }
}

module.exports.createBattle = createBattle;
