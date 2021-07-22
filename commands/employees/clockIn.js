const map = require('../../index.js').map

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
        message.author.send(`Clocked in <@${message.author.id}> at ${d.toTimeString()}`)
        .then(message.delete({timeout: 5000}));
        
    }
}