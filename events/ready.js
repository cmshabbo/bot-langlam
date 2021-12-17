module.exports = (client) => {
  console.log(
    `Prêt à servir dans ${client.channels.cache.size} chaînes sur ${client.guilds.cache.size} serveurs, pour un total de ${client.users.cache.size} users.`
  );

  const activities = [`Giveaways dans ${client.guilds.cache.size} guilds`,"!help",`plus de ${client.users.cache.size} users!`];
  setInterval(() => {
    let activity = activities[Math.floor(Math.random() * activities.length)];
    client.user.setActivity("Giveaway de la semaine", { type: "WATCHING" });
  }, 20000);

};
