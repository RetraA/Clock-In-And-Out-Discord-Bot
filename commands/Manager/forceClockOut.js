const map = require('../../index.js').map
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "mco",
    category: "",
    description: "",
    aliases: [''],
    run: async(client, message, args) => {
        let activeRole = message.member.guild.roles.cache.find(role => role.id === "YOUR_ROLE_ID");
        

        if(!message.member.roles.cache.some(r => r.name === "YOUR_ROLE_NAME")) return message.reply(`Sorry! You're not High Command!`)

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        member.roles.remove(activeRole);

        if (!member) return message.reply("This is an invalid user!")

    const clockOut = new Date(Date.now());

       const clockIn = map.get(member.id)
       if (clockIn == null) {
           message.reply(` this user hasn't clocked in yet!`).then(message.delete({timeout: 0}));
           return
       }

       const diff = clockOut.getTime() - clockIn.getTime()
       const seconds = diff/1000;
       const minutes= seconds / 60;
       const finalTime = Math.round(minutes);

       map.delete(member.id)
       let sEmbed = new MessageEmbed()
       .setColor(`#1b75ba`)
       .setTitle("Manager Foced Clockout")
       .setTimestamp()
       .setThumbnail(`${message.author.avatarURL()}`)
       .addField("**User:**", `<@${member.id}>`)
       .addField(`**Manager:**`, `${message.author}`)
       .addField(`**Total Minutes Worked:**`, `${finalTime}`)
       .setFooter(`by Retra#1337`, 'https://i.imgur.com/3xgt3jg.png')
       let timeClock = client.channels.cache.get(`YOUR_LOG_CHANNEL`);
       timeClock.send(sEmbed);
      
       member.send(`You have been clocked out by: ${message.author}`);
       message.channel.send(`${message.author} has clocked out <@${member.id}>!`);
    }
}
