const map = require('../../index.js').map
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "active",
    category: "",
    description: "",
    aliases: [''],
    run: async(client, message, args) => {
        if(!message.member.roles.cache.some(r => r.name === "YOUR_ROLE_NAME")) return message.reply(`Sorry! You're not High Command!`)
        //message.channel.send("Current active members:");
        console.log(map.size);
        if(map.size == 0){
            message.channel.send(`No one is currently clocked in!`);
        }

        message.channel.send(`There are currently: ${map.size} people clocked in!`);
        for(const value of map.keys()){
            const time = map.get(value);
            const timeElapsed = new Date(Date.now());

            const diff = timeElapsed.getTime() - time.getTime()
            const seconds = diff/1000;
            const minutes= seconds / 60;
            const finalTime = Math.round(minutes);
    
            let embed = new MessageEmbed()
            .setColor(`#1b75ba`)
            .addField("**User:** ", `<@!${value}>`)
           .addField(`Time Elapsed: `, `${finalTime} minutes`)
           message.channel.send(embed);
        }
    }
}
