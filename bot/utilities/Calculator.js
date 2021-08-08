const { MessageEmbed, MessageButton } = require("discord.js");

module.exports = async (message) => {
  if (!message)
    throw new TypeError("Calculator Error: Missing argument message");

  function i(length) {
    var randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var result = "";
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length),
      );
    }
    return result;
  }

  // Button ID generator
  let str = " ";
  let stringify = "```\n" + str + "\n```";
  let calculator_clear = i(20);
  let calculator_e1 = i(20);
  let calculator_e2 = i(20);
  let calculator_uppercase = i(20);
  let calculator_7 = i(20);
  let calculator_8 = i(20);
  let calculator_9 = i(20);
  let calculator_plus = i(20);
  let calculator_minus = i(20);
  let calculator_star = i(20);
  let calculator_devide = i(20);
  let calculator_1 = i(20);
  let calculator_2 = i(20);
  let calculator_3 = i(20);
  let calculator_4 = i(20);
  let calculator_5 = i(20);
  let calculator_0 = i(20);
  let calculator_6 = i(20);
  let calculator_dot = i(20);
  let calculator_equal = i(20);
  let calculator_backspace = i(20);
  let calc_irrc = i(20);
  let empty_irrc = i(20);
  let calc_percent = i(20);
  // Buttons
  let ac = new MessageButton()
    .setLabel("AC")
    .setcustomId(calculator_clear)
    .setStyle("DANGER");
  let e1 = new MessageButton()
    .setLabel("(")
    .setcustomId(calculator_e1)
    .setStyle("PRIMARY");
  let e2 = new MessageButton()
    .setLabel(")")
    .setcustomId(calculator_e2)
    .setStyle("PRIMARY");
  let uppercase = new MessageButton()
    .setLabel("^")
    .setcustomId(calculator_uppercase)
    .setStyle("PRIMARY");
  let seven = new MessageButton()
    .setLabel("7️")
    .setcustomId(calculator_7)
    .setStyle("SECONDARY");
  let eight = new MessageButton()
    .setLabel("8️")
    .setcustomId(calculator_8)
    .setStyle("SECONDARY");
  let nine = new MessageButton()
    .setLabel("9️")
    .setcustomId(calculator_9)
    .setStyle("SECONDARY");
  let slash = new MessageButton()
    .setLabel("÷")
    .setcustomId(calculator_devide)
    .setStyle("PRIMARY");
  let four = new MessageButton()
    .setLabel("4️")
    .setcustomId(calculator_4)
    .setStyle("SECONDARY");
  let five = new MessageButton()
    .setLabel("5️")
    .setcustomId(calculator_5)
    .setStyle("SECONDARY");
  let six = new MessageButton()
    .setLabel("6️")
    .setcustomId(calculator_6)
    .setStyle("SECONDARY");
  let star = new MessageButton()
    .setLabel("x")
    .setcustomId(calculator_star)
    .setStyle("PRIMARY");
  let one = new MessageButton()
    .setLabel("1️")
    .setcustomId(calculator_1)
    .setStyle("SECONDARY");
  let two = new MessageButton()
    .setLabel("2️")
    .setcustomId(calculator_2)
    .setStyle("SECONDARY");
  let three = new MessageButton()
    .setLabel("3️")
    .setcustomId(calculator_3)
    .setStyle("SECONDARY");
  let minus = new MessageButton()
    .setLabel("-")
    .setcustomId(calculator_minus)
    .setStyle("PRIMARY");
  let zero = new MessageButton()
    .setLabel("0️")
    .setcustomId(calculator_0)
    .setStyle("SECONDARY");
  let dot = new MessageButton()
    .setLabel(".")
    .setcustomId(calculator_dot)
    .setStyle("PRIMARY");
  let equal = new MessageButton()
    .setLabel("=")
    .setcustomId(calculator_equal)
    .setStyle("SUCCESS");
  let plus = new MessageButton()
    .setLabel("+")
    .setcustomId(calculator_plus)
    .setStyle("PRIMARY");
  let backspace = new MessageButton()
    .setLabel("⌫")
    .setcustomId(calculator_backspace)
    .setStyle("DANGER");
  let destroy = new MessageButton()
    .setLabel("DC")
    .setcustomId(calc_irrc)
    .setStyle("DANGER");
  let empty = new MessageButton()
    .setLabel("\u200b")
    .setcustomId(empty_irrc)
    .setStyle("SECONDARY")
    .setDisabled(true);
  let percent = new MessageButton()
    .setLabel("%")
    .setcustomId(calc_percent)
    .setStyle("PRIMARY");
  // Lock
  let qac = new MessageButton()
    .setLabel("AC")
    .setcustomId(calculator_clear)
    .setStyle("DANGER")
    .setDisabled(true);
  let qe1 = new MessageButton()
    .setLabel("(")
    .setcustomId(calculator_e1)
    .setStyle("PRIMARY")
    .setDisabled(true);
  let qe2 = new MessageButton()
    .setLabel(")")
    .setcustomId(calculator_e2)
    .setStyle("PRIMARY")
    .setDisabled(true);
  let quppercase = new MessageButton()
    .setLabel("^")
    .setcustomId(calculator_uppercase)
    .setStyle("PRIMARY")
    .setDisabled(true);
  let qseven = new MessageButton()
    .setLabel("7️")
    .setcustomId(calculator_7)
    .setStyle("SECONDARY")
    .setDisabled(true);
  let qeight = new MessageButton()
    .setLabel("8️")
    .setcustomId(calculator_8)
    .setStyle("SECONDARY")
    .setDisabled(true);
  let qnine = new MessageButton()
    .setLabel("9️")
    .setcustomId(calculator_9)
    .setStyle("SECONDARY")
    .setDisabled(true);
  let qslash = new MessageButton()
    .setLabel("÷")
    .setcustomId(calculator_devide)
    .setStyle("PRIMARY")
    .setDisabled(true);
  let qfour = new MessageButton()
    .setLabel("4️")
    .setcustomId(calculator_4)
    .setStyle("SECONDARY")
    .setDisabled(true);
  let qfive = new MessageButton()
    .setLabel("5️")
    .setcustomId(calculator_5)
    .setStyle("SECONDARY")
    .setDisabled(true);
  let qsix = new MessageButton()
    .setLabel("6️")
    .setcustomId(calculator_6)
    .setStyle("SECONDARY")
    .setDisabled(true);
  let qstar = new MessageButton()
    .setLabel("x")
    .setcustomId(calculator_star)
    .setStyle("PRIMARY")
    .setDisabled(true);
  let qone = new MessageButton()
    .setLabel("1️")
    .setcustomId(calculator_1)
    .setStyle("SECONDARY")
    .setDisabled(true);
  let qtwo = new MessageButton()
    .setLabel("2️")
    .setcustomId(calculator_2)
    .setStyle("SECONDARY")
    .setDisabled(true);
  let qthree = new MessageButton()
    .setLabel("3️")
    .setcustomId(calculator_3)
    .setStyle("SECONDARY")
    .setDisabled(true);
  let qminus = new MessageButton()
    .setLabel("-")
    .setcustomId(calculator_minus)
    .setStyle("PRIMARY")
    .setDisabled(true);
  let qzero = new MessageButton()
    .setLabel("0️")
    .setcustomId(calculator_0)
    .setStyle("SECONDARY")
    .setDisabled(true);
  let qdot = new MessageButton()
    .setLabel(".")
    .setcustomId(calculator_dot)
    .setStyle("PRIMARY")
    .setDisabled(true);
  let qequal = new MessageButton()
    .setLabel("=")
    .setcustomId(calculator_equal)
    .setStyle("SUCCESS")
    .setDisabled(true);
  let qplus = new MessageButton()
    .setLabel("+")
    .setcustomId(calculator_plus)
    .setStyle("PRIMARY")
    .setDisabled(true);
  let qbackspace = new MessageButton()
    .setLabel("⌫")
    .setcustomId(calculator_backspace)
    .setStyle("DANGER")
    .setDisabled(true);
  let qdestroy = new MessageButton()
    .setLabel("DC")
    .setcustomId(calc_irrc)
    .setStyle("DANGER")
    .setDisabled(true);
  let qpercent = new MessageButton()
    .setLabel("%")
    .setcustomId(calc_percent)
    .setStyle("PRIMARY")
    .setDisabled(true);
  //----------------------------------------------------------------------
  const filter = (m) => m.user.id === message.author.id;

  message.channel
    .send({
      embeds: [
        new MessageEmbed()
          .setAuthor(
            message.author.tag,
            message.author.displayAvatarURL({
              dynamic: true,
            }),
          )
          .setTitle("Button Calculator")
          .setDescription(stringify)
          .setColor("BLURPLE")
          .setTimestamp(),
      ],
      components: [
        [e1, e2, uppercase, percent, ac],
        [seven, eight, nine, slash, destroy],
        [four, five, six, star, backspace],
        [one, two, three, minus, empty],
        [dot, zero, equal, plus, empty],
      ],
    })
    .then(async (msg) => {
      async function edit() {
        msg.edit({
          embeds: [
            new MessageEmbed()
              .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({
                  dynamic: true,
                }),
              )
              .setTitle("Button Calculator")
              .setDescription(stringify)
              .setColor("BLURPLE")
              .setTimestamp(),
          ],
          components: [
            [e1, e2, uppercase, percent, ac],
            [seven, eight, nine, slash, destroy],
            [four, five, six, star, backspace],
            [one, two, three, minus, empty],
            [dot, zero, equal, plus, empty],
          ],
        });
      }
      async function lock() {
        msg.edit({
          embeds: [
            new MessageEmbed()
              .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL({
                  dynamic: true,
                }),
              )
              .setTitle("Button Calculator")
              .setDescription(stringify)
              .setColor("RED")
              .setTimestamp(),
          ],
          components: [
            [qe1, qe2, quppercase, qpercent, qac],
            [qseven, qeight, qnine, qslash, qdestroy],
            [qfour, qfive, qsix, qstar, qbackspace],
            [qone, qtwo, qthree, qminus, empty],
            [qdot, qzero, qequal, qplus, empty],
          ],
        });
      }
      const calc = msg.createMessageComponentCollector({ filter });

      calc.on("collect", async (btn) => {
        if (btn.user.id !== message.author.id) {
          return btn.deferUpdate();
        }

        btn.deferUpdate();
        switch (btn.customId) {
          case calculator_0:
            str += "0";
            stringify = "```\n" + str + "\n```";
            edit();
            break;
          case calculator_1:
            str += "1";
            stringify = "```\n" + str + "\n```";
            edit();
            break;
          case calculator_2:
            str += "2";
            stringify = "```\n" + str + "\n```";
            edit();
            break;
          case calculator_3:
            str += "3";
            stringify = "```\n" + str + "\n```";
            edit();
            break;
          case calculator_4:
            str += "4";
            stringify = "```\n" + str + "\n```";
            edit();
            break;
          case calculator_5:
            str += "5";
            stringify = "```\n" + str + "\n```";
            edit();
            break;
          case calculator_6:
            str += "6";
            stringify = "```\n" + str + "\n```";
            edit();
            break;
          case calculator_7:
            str += "7";
            stringify = "```\n" + str + "\n```";
            edit();
            break;
          case calculator_8:
            str += "8";
            stringify = "```\n" + str + "\n```";
            edit();
            break;
          case calculator_9:
            str += "9";
            stringify = "```\n" + str + "\n```";
            edit();
            break;
          case calculator_plus:
            str += "+";
            stringify = "```\n" + str + "\n```";
            edit();
            break;
          case calculator_minus:
            str += "-";
            stringify = "```\n" + str + "\n```";
            edit();
            break;
          case calculator_devide:
            str += "/";
            stringify = "```\n" + str + "\n```";
            edit();
            break;
          case calculator_uppercase:
            str += "^";
            stringify = "```\n" + str + "\n```";
            edit();
            break;
          case calculator_star:
            str += "*";
            stringify = "```\n" + str + "\n```";
            edit();
            break;
          case calculator_dot:
            str += ".";
            stringify = "```\n" + str + "\n```";
            edit();
            break;
          case calculator_clear:
            str = " ";
            stringify = "```\n" + str + "\n```";
            edit();
            break;
          case calculator_e1:
            str += "(";
            stringify = "```\n" + str + "\n```";
            edit();
            break;
          case calculator_e2:
            str += ")";
            stringify = "```\n" + str + "\n```";
            edit();
            break;
          case calculator_backspace:
            if (
              str === " " ||
              str === "" ||
              str === null ||
              str === undefined
            ) {
              return;
            } else {
              str = str.split("");
              str.pop();
              str = str.join("");

              stringify = "```\n" + str + "\n```";
              edit();
              break;
            }
          case calc_percent:
            str += "%";
            stringify = "```\n" + str + "\n```";
            edit();
            break;
        }

        if (btn.customId === calculator_equal) {
          if (str === " " || str === "" || str === null || str === undefined) {
            return;
          } else {
            try {
              str += " = " + require("mathjs").evaluate(str);
              stringify = "```\n" + str + "\n```";
              edit();
              str = " ";
              stringify = "```\n" + str + "\n```";
            } catch (e) {
              str = "Invalid Question Entered";
              stringify = "```\n" + str + "\n```";
              edit();
              str = " ";
              stringify = "```\n" + str + "\n```";
            }
          }
        } else if (btn.customId === calc_irrc) {
          str = "Calculator Disabled";
          stringify = "```\n" + str + "\n```";
          edit();
          calc.stop();
          lock();
        }
      });
    });
};
