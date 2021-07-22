const map = require('../../index.js').map

module.exports = {
    name: "clockout",
    category: "",
    description: "",
    aliases: [''],
    run: async(client, message, args) => {
        const clockOut = new Date(Date.now());

       const clockIn = map.get(message.author.id)
       if (clockIn == null) {
           message.reply(` You haven't clocked in yet!`)
           return
       }
       map.delete(message.author.id)

       const diff = clockOut.getTime() - clockIn.getTime()
       const seconds = diff/1000;
       const minutes= seconds / 60;
       const finalTime = Math.round(minutes);
       
       let timeClock = client.channels.cache.get(`866501334123413535`);
       message.author.send(`${message.author} you have clocked out!`).then(message.delete({timeout: 5000}));
       timeClock.send(`${message.author} clocked out and worked ${finalTime} minutes`);
    }
}