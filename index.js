const Discord = require('discord.js');
const client = new Discord.Client();
const {Client, Collection } = require("discord.js");
client.commands = new Collection();
client.aliases = new Collection();
require('dotenv').config();

module.exports.map = new Map();

const config = {
    token: process.env.TOKEN,
    owner: process.env.OWNER,
};

client.on("message", async message => {
            console.log(`${message.createdAt.getHours(`HH`)}:${message.createdAt.getMinutes(`MM`)}:${message.createdAt.getSeconds(`SS`)}: (${message.guild.name+') in: #'+message.channel.name} ${message.member.user.tag}: ${message.content}`);
});


const prefix = "!";
client.on("ready", async() => {
    console.log(`Hi, ${client.user.username} is now online!`);

    client.user.setPresence({
        status: "online",
    }); 

    client.user.setActivity(``, {type: 'PLAYING'});
})


client.on("message", async message => {
    

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    // If message.member is uncached, cache it.
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    // Get the command
    let command = client.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    // If a command is finally found, run the command
    if (command) 
        command.run(client, message, args);

});

client.login(process.env.TOKEN);
