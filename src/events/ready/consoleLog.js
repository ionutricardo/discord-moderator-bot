const { ActivityType } = require('discord.js');

let status = [
	{
		name: 'Moderator BOT',
		type: ActivityType.Playing,
	},
	{
		name: 'Moderator BOT',
		type: ActivityType.Watching,
	},
	{
		name: 'Moderator BOT',
		type: ActivityType.Listening,
	},
];

module.exports = (client) => {
	console.log(
		`✅ [USERNAME: ${client.user.tag}] [ID: ${client.user.id}] (ONLINE)`
	);

	setInterval(() => {
		let random = Math.floor(Math.random() * status.length);

		client.user.setActivity(status[random]);
	}, 10000);
};
