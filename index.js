const fs = require('fs')
const Discord = require('discord.js');

const {prefix , token, ticktokurl} = require('./config.json');

//Create a new Discord Client
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command);
}

//When the Client is ready this code iwll run and will only trigger on login
client.once('ready', () => console.log('Ready!'))

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.substring(prefix.length).split(" ");
    const command = args.shift().toLowerCase();

    // console.log(command);
    // console.log(args)
    // console.log(client.commands)

    if (!client.commands.has(command)) return message.reply('there was an error trying to execute that command!'), console.log('command does not exist');

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
})

client.login(token);