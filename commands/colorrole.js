//guide for roles https://anidiots.guide/understanding/roles
const { colors } = require('./colorConfig.json');
const Discord = require('discord.js')

module.exports = {
    name : "colorrole",
    description : "Adds colors to users names",
    //TODO: look how to add aliases 
    //args : true,
    async execute(message, args) {
        console.log()
        if(args[0] === "init") {
            console.log('init')
            if(message.member.hasPermission("ADMINISTRATOR")) {
                // console.log(message.guild.roles.cache)
                for (const color of colors) {
                if(message.guild.roles.cache.find(Role => Role.name === color.name)) {
                    console.log(`color role: ${color.name} already exists`);
                } else {
                    message.guild.roles.create({
                        data: {
                            name: color.name,
                            color : color.color
                        },
                            reason : `role for the color ${color.name}`,
                        })
                        .then(console.log(`New color added ${color.name}`))
                        .catch(console.error);
                    }
                }
            } else {
                message.reply(`, You dont have the permissions to run this command!`);
                console.log(`User doesn't have permissions.`);
            }
        }
    }
}