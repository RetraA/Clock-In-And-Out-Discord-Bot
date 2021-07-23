const map = require('../../index.js').map
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "clockin",
    category: "",
    description: "",
    aliases: [''],
    run: async (client, message, args) => {
        var d = new Date(Date.now());
        const checkId = () => {
            setTimeout(checkId)
        }

        map.set(message.author.id, d)

        let sEmbed = new MessageEmbed()
       .setColor(`YELLOW`)
       .setTitle("Clock In Log")
       .setTimestamp()
       .setThumbnail(`${message.author.avatarURL}`())
       .addField("**User:**", `${message.author} has clocked in!`)
       .setFooter(`by Retra#1337`, 'https://i.imgur.com/3xgt3jg.png')
        let timeClock = client.channels.cache.get(`your channel id`);
        timeClock.send(sEmbed);


        message.author.send(`Clocked in <@${message.author.id}> at ${d.toTimeString()}`)

        .then(message.delete({timeout: 5000}));
        
    }
}
