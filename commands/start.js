const ms = require('ms');

exports.run = async (client, message, args) => {

    
    // Si le membre n'a pas assez d'autorisations
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send('Vous devez disposer des autorisations de gestion des messages pour lancer des cadeaux');
    }

    
    // Chaîne gratuite
    let giveawayChannel = message.mentions.channels.first();
    // Si aucune chaîne n'est mentionnée
    if(!giveawayChannel){
        return message.channel.send(':x: Vous devez mentionner une salon valide !');
    }

    // Durée du cadeau
    let giveawayDuration = args[1];
    
    // Si la durée n'est pas valide
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(':x: Vous devez spécifier une durée valide !');
    }

    // Nombre de gagnants
    let giveawayNumberWinners = args[2];
    // Si le nombre de gagnants spécifié n'est pas un nombre
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send(':x: Vous devez spécifier un nombre valide de gagnants !');
    }

    // Prix à gagner
    let giveawayPrize = args.slice(3).join(' ');
    // Si aucun prix n'est spécifié
    if(!giveawayPrize){
        return message.channel.send(':x: Vous devez spécifier un prix valide !');
    }

    
      // Commencer le cadeau
    client.giveawaysManager.start(giveawayChannel, {
        // La durée du cadeau
        time: ms(giveawayDuration),
        // Le prix cadeau
        prize: giveawayPrize,
        // Le décompte des gagnants
        winnerCount: parseInt(giveawayNumberWinners),
        // Qui organise ce cadeau
        hostedBy: client.config.hostedBy ? message.author : null,
        // Messages
        messages: {
            giveaway: (client.config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **GIVEAWAY** 🎉🎉",
            giveawayEnded: (client.config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **GIVEAWAY ENDED** 🎉🎉",
            timeRemaining: "Temps restant: **{duration}**!",
            inviteToParticipate: "Réagissez avec 🎉 pour participer!",
            winMessage: "Félicitations, {winners}! Vous avez gagné **{prize}**!",
            embedFooter: "Giveaways",
            noWinner: "Giveaway cancelled, no valid participations.",
            hostedBy: "Hébergé par: {user}",
            winners: "gagnant(s)",
            endedAt: "Terminé à ",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false // Pas nécessaire, car les unités se terminent par un S, elles seront donc automatiquement supprimées si la valeur de l'unité est inférieure à 2
            }
        }
    });


};
