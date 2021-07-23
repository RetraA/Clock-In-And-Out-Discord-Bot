const map = require('../../index.js').map
const { MessageEmbed } = require("discord.js")

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
       const diff = clockOut.getTime() - clockIn.getTime()
       const seconds = diff/1000;
       const minutes= seconds / 60;
       const finalTime = Math.round(minutes);

       map.delete(message.author.id)
       let sEmbed = new MessageEmbed()
       .setColor(`YELLOW`)
       .setTitle("Clock Out Log")
       .setTimestamp()
       .setThumbnail('https://i.imgur.com/3xgt3jg.png')
       .addField("**User:**", `${message.author}`)
       .addField(`**Total Minutes Worked:**`, `${finalTime}`)
       .setFooter(`by Retra#1337`, 'https://i.imgur.com/3xgt3jg.png')
      let timeClock = client.channels.cache.get(`866501334123413535`);
        timeClock.send(sEmbed);
        message.author.send(`${message.author} you have clocked out!`).then(message.delete({timeout: 5000}));

       
      // let timeClock = client.channels.cache.get(`679670897728290846`);
       //message.author.send(`${message.author} you have clocked out!`).then(message.delete({timeout: 5000}));
       //timeClock.send(`${message.author} clocked out and worked ${finalTime} minutes`);
    }
}
