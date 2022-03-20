const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const Beautify = require('beautify');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
  if (message.author.bot) return;
    let prefix = config.prefix;
    if(!message.content.startsWith(prefix)) return;
  
  if (message.author.id !== "859022507821498378") {
    return message.channel.send(" Interdit : cette commande est réservée au propriétaire !")
  }
  
  if (!args[0]) {
    message.channel.send("Vous devez évaluer _**QUELQUE CHOSE**_ stp!")
  }
  
  try {
    if (args.join(" ").toLowerCase().includes("token")) {
      return;
    }
    
    const toEval = args.join(" ");
    const evaluated = eval(toEval);
    
    let embed = new Discord.MessageEmbed()
    .setTitle("Eval")
    .addField("Évaluer", `\`\`\`js\n${Beautify(args.join(" "), { format: "js" })}\n\`\`\``)
    .addField("Évalué", evaluated)
    .addField("Type de:", typeof(evaluated))
    .setTimestamp()
    .setFooter(`${message.author.tag}`, client.user.displayAvatarURL())
    message.channel.send(embed);
    
  } catch (e) {
    let errorembed = new Discord.MessageEmbed()
    .addField("\ Erreur!")
    .setDescription(e)
    .setTimestamp()
    .setFooter(`${message.author.tag}`, client.user.displayAvatarURL())
    message.channel.send(errorembed);
  }
}
