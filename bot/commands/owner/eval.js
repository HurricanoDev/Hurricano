const Discord = require ("discord.js");
const sourcebin = require('sourcebin_js')

module.exports = {
    name: "eval",
    description: "Evaluates arbituary JavaScript.",
    ownerOnly: true,
    args: true,
    run: async (client, message, args) => {

  const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
  const args2 = message.content.split(' ').slice(1).join(' ');

    if (!args2) {
      message.channel.send("What do you want me to evaluate?");
      return;
  }

        const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);


        if (clean(evaled).length > 1024 || code.length > 1024) {
          sourcebin.create([{
            name: `Code by ${message.author.tag}`,
            content: clean(evaled),
            languageId: 'js'
          }]).then(src => {
         var embed = new Discord.MessageEmbed()
         .setTitle("Evaluation Overload!")
         .setColor("#4CEF8B")
         .setDescription("The evaluation was more than 1,024 characters")
         .addField("Click on the link below to view the eval result", `${src.url}`)
         message.channel.send({ embed: embed })
          }).catch(e => {
            message.channel.send(`Error: ${e}`)
      });
} else {
        var embed2 = new Discord.MessageEmbed()
        .setTitle("Evaled:")
        .setColor("#4CEF8B")
        .addField("Evaled: :inbox_tray:",  `\`\`\`js\n${code}\n\`\`\``)
        .addField("Output: :outbox_tray:", `\`\`\`js\n${clean(evaled)}\n\`\`\``)
        message.channel.send({embed : embed2 });
}
    } catch (err) {
        const code = args.join(" ");
                if (clean(err).length > 1024 || code.length > 1024) {
                  sourcebin.create([{
                    name: `Code by ${message.author.tag}`,
                    content: clean(err),
                    languageId: 'js'
                  }]).then(src => {
                 var embed = new Discord.MessageEmbed()
                 .setTitle("Evaluation Overload!")
                 .setColor("#4CEF8B")
                 .setDescription("The evaluation was more than 1,024 characters")
                 .addField("Click on the link below to view the eval result", `${src.url}`)
                 message.channel.send({ embed: embed })
                  }).catch(e => {
                    message.channel.send(`Error: ${e}`)
              });
};
      var embed3 = new Discord.MessageEmbed()
      .setTitle("ERROR:")
      .setColor("#f44242")
      .addField("Evaled: :inbox_tray:", `\`\`\`js\n${code}\n\`\`\``)
      .addField("Output: :outbox_tray:", `\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
      message.channel.send({embed: embed3 });
    }
  }
}
