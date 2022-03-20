const ms = require('ms');

exports.run = async (client, message, args) => {

    // Si le membre n'a pas assez d'autorisations
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(' Vous devez disposer des autorisations de gestion des messages pour relancer les cadeaux.');
    }

    
    // Si aucun ID de message ou nom de cadeau n'est spécifié
    if(!args[0]){
        return message.channel.send(' **Vous devez spécifier un ID de message valide !**');
    }

    // essayez de trouver le cadeau avec un prix puis avec une pièce d'identité
    let giveaway = 
    // Recherche avec prix cadeau
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    // Recherche avec ID cadeau
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    // Si aucun cadeau n'a été trouvé
    if(!giveaway){
        return message.channel.send('Impossible de trouver un cadeau pour`'+ args.join(' ') +'`.');
    }

    // Relancer le cadeau
    client.giveawaysManager.reroll(giveaway.messageID)
    .then(() => {
        // Message de réussite
        message.channel.send('Giveaway Relancé !');
    })
    .catch((e) => {
        if(e.startsWith(`Cadeau avec ID de message ${giveaway.messageID} n'est pas terminé.`)){
            message.channel.send('Ce cadeau est pas terminé !');
        } else {
            console.error(e);
            message.channel.send('Une erreur est produite...');
        }
    });

};