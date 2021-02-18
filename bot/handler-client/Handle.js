const client = require('./Client.js');
const { readdirSync } = require("fs");
const Discord = require('discord.js');
const ascii = require("ascii-table");
let table = new ascii("Commands");
table.setHeading("Command File", "Command Name", "Load status");
module.exports = client => {
  readdirSync("./bot/commands").forEach(dir => {
    const commands = readdirSync(`./bot/commands/${dir}/`).filter(file =>
      file.endsWith(".js")
    );
    for (let file of commands) {
      let pull = require(`../commands/${dir}/${file}`);
      if (pull.name) {
        client.commands.set(pull.name, pull);
        table.addRow(file, pull.name, "Loaded!");
      } else {
        table.addRow(
          file,
          pull.name,
          "Not Loaded -> Missing a help.name, or help.name is not a string."
        );
        continue;
      }
      if (pull.aliases && Array.isArray(pull.aliases))
        pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
    }
  });
  console.log(table.toString());
};