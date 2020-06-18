const { description } = require("./ping");
const { Guild, Client, DiscordAPIError } = require("discord.js");

const {prefix} = require('../config.json')
module.exports = {
    name : 'help',
    description : 'list all of my commands or info about a specific command.',
    execute(message, args) {
        const data = [];
        const {commands} = message.client;

        if(!args.length) {
            data.push('Here is a list of all my commands:');
            data.push(commands.map(command => '`' + command.name + ': ' + command.description + '`').join(', \n'));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I have sent you a DM of all of my commands')
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.replay('it seems like i can not DM you! Do you have DMs disabled?')
                })
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if(!command) {
            return message.reply('that is not a valid command!')
        }

        data.push(`**Name:** ${command.name}`);

        if(command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if(command.description) data.push(`**description:** ${command.description}`);
        if(command.usage) data.push(`**Usage: ** ${prefix}${command.name} ${command.usage}`);

        message.channel.send(data, { split: true });

        //if(command)
    }
}