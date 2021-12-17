module.exports = (client, message) => {
    
    // Ignorer tous les bots
    if (message.author.bot) return;
  
    // Ignorer les messages ne commençant pas par le préfixe (dans config.json)
    if (message.content.indexOf(client.config.prefix) !== 0) return;
  
    // Notre définition de nom d'argument/commande standard.
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    // Récupérez les données de la commande à partir de l'Enmap client.commands
    const cmd = client.commands.get(command);
  
    // Si cette commande n'existe pas, quittez silencieusement et ne faites rien
    if (!cmd) return;
  
    // Exécuter la commande
    cmd.run(client, message, args);
};