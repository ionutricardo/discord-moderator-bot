const mongoose = require('mongoose');

require('dotenv/config');

const { Client, GatewayIntentBits } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

(async () => {
	try {
		eventHandler(client);

		await mongoose.connect(process.env.MONGODB_URI);
		console.log('✅ [DB] Successfully connected.');
	} catch (error) {
		console.log(`Error: ${error}`);
	}
})();

client.login(process.env.BOT_TOKEN);
