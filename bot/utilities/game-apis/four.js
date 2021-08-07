const Discord = require('discord.js');

const WIDTH = 7;
const HEIGHT = 7;
const gameBoard = [];

const reactions = {
  '1️⃣': 1,
  '2️⃣': 2,
  '3️⃣': 3,
  '4️⃣': 4,
  '5️⃣': 5,
  '6️⃣': 6,
  '7️⃣': 7,
};

class Connect4 {
  constructor(message, userFirst, userSecond) {
    this.message = message;
    this.users = [userFirst, userSecond];
    this.gameEmbed = null;
    this.inGame = false;
    this.redTurn = true;
    this.currentTurn = null;
  }

  gameBoardToString() {
    let str = `|${Object.keys(reactions).join('|')}|\n`;
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        str += '|' + gameBoard[y * WIDTH + x];
      }
      str += '|\n';
    }
    return str;
  }

  newGame() {
    const message = this.message;
    if (this.inGame) return;

    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        gameBoard[y * WIDTH + x] = '⚪';
      }
    }

    this.inGame = true;
    let user = this.users[Math.floor(Math.random() * this.users.length)];
    const embed = new Discord.MessageEmbed()
      .setColor('#000b9e')
      .setTitle('Connect-4')
      .setDescription(this.gameBoardToString())
      .addField('Turn:', this.getChipFromTurn() + `\n (${user})`)
      .setTimestamp();
    message.channel.send({ embeds: [embed] }).then((emsg) => {
      this.gameEmbed = emsg;
      Object.keys(reactions).forEach((reaction) => {
        this.gameEmbed.react(reaction);
      });

      this.waitForReaction(user);
    });
  }

  step(user) {
    user = user[0];
    this.redTurn = !this.redTurn;
    const editEmbed = new Discord.MessageEmbed()
      .setColor('#000b9e')
      .setTitle('Connect-4')
      .setDescription(this.gameBoardToString())
      .addField('Turn:', this.getChipFromTurn() + `\n (${user})`)
      .setTimestamp();
    this.gameEmbed.edit({ embeds: [editEmbed] });
    this.waitForReaction(user);
  }

  gameOver(winner) {
    this.inGame = false;
    const editEmbed = new Discord.MessageEmbed()
      .setColor('#000b9e')
      .setTitle('Connect-4')
      .setDescription('GAME OVER! ' + this.getWinnerText(winner))
      .setTimestamp();
    this.gameEmbed.edit({ embeds: [editEmbed] });
    this.gameEmbed.reactions.removeAll();
  }

  filter(reaction, user, userTurn) {
    return (
      Object.keys(reactions).includes(reaction.emoji.name) &&
      !user.bot &&
      user.id == userTurn.id
    );
  }

  waitForReaction(userTurn) {
    this.gameEmbed
      .awaitReactions({
        filter: (reaction, user) => this.filter(reaction, user, userTurn),
        max: 1,
        time: 300000,
        errors: ['time'],
      })
      .then((collected) => {
        const reaction = collected.first();
        const column = reactions[reaction.emoji.name] - 1;
        let placedX = -1;
        let placedY = -1;

        for (let y = HEIGHT - 1; y >= 0; y--) {
          const chip = gameBoard[column + y * WIDTH];
          if (chip === '⚪') {
            gameBoard[column + y * WIDTH] = this.getChipFromTurn();
            placedX = column;
            placedY = y;
            break;
          }
        }

        reaction.users
          .remove(
            reaction.users.cache
              .filter((user) => user.id !== this.gameEmbed.author.id)
              .first().id,
          )
          .then(() => {
            if (placedY == 0)
              this.gameEmbed.reactions.cache.get(reaction.emoji.name).remove();

            if (this.hasWon(placedX, placedY)) {
              this.gameOver(this.getChipFromTurn());
            } else if (this.isBoardFull()) {
              this.gameOver('tie');
            } else {
              this.step(
                this.users.filter((otherUser) => otherUser.id !== userTurn.id),
              );
            }
          });
      })
      .catch((collected) => {
        this.gameOver('timeout');
      });
  }

  getChipFromTurn() {
    return this.redTurn ? '🔴' : '🟡';
  }

  hasWon(placedX, placedY) {
    const chip = this.getChipFromTurn();

    //Horizontal Check
    const y = placedY * WIDTH;
    for (var i = Math.max(0, placedX - 3); i <= placedX; i++) {
      var adj = i + y;
      if (i + 3 < WIDTH) {
        if (
          gameBoard[adj] === chip &&
          gameBoard[adj + 1] === chip &&
          gameBoard[adj + 2] === chip &&
          gameBoard[adj + 3] === chip
        )
          return true;
      }
    }

    //Verticle Check
    for (var i = Math.max(0, placedY - 3); i <= placedY; i++) {
      var adj = placedX + i * WIDTH;
      if (i + 3 < HEIGHT) {
        if (
          gameBoard[adj] === chip &&
          gameBoard[adj + WIDTH] === chip &&
          gameBoard[adj + 2 * WIDTH] === chip &&
          gameBoard[adj + 3 * WIDTH] === chip
        )
          return true;
      }
    }

    //Ascending Diag
    for (var i = -3; i <= 0; i++) {
      var adjX = placedX + i;
      var adjY = placedY + i;
      var adj = adjX + adjY * WIDTH;
      if (adjX + 3 < WIDTH && adjY + 3 < HEIGHT) {
        if (
          gameBoard[adj] === chip &&
          gameBoard[adj + WIDTH + 1] === chip &&
          gameBoard[adj + 2 * WIDTH + 2] === chip &&
          gameBoard[adj + 3 * WIDTH + 3] === chip
        )
          return true;
      }
    }

    //Descending Diag
    for (var i = -3; i <= 0; i++) {
      var adjX = placedX + i;
      var adjY = placedY - i;
      var adj = adjX + adjY * WIDTH;
      if (adjX + 3 < WIDTH && adjY - 3 >= 0) {
        if (
          gameBoard[adj] === chip &&
          gameBoard[adj - WIDTH + 1] === chip &&
          gameBoard[adj - 2 * WIDTH + 2] === chip &&
          gameBoard[adj - 3 * WIDTH + 3] === chip
        )
          return true;
      }
    }

    return false;
  }

  isBoardFull() {
    for (let y = 0; y < HEIGHT; y++)
      for (let x = 0; x < WIDTH; x++)
        if (gameBoard[y * WIDTH + x] === '⚪') return false;
    return true;
  }

  getWinnerText(winner) {
    if (winner === '🔴' || winner === '🟡') return winner + ' Has Won!';
    else if (winner == 'tie') return 'It was a tie!';
    else if (winner == 'timeout') return 'The game went unfinished :(';
  }
}

module.exports = Connect4;
