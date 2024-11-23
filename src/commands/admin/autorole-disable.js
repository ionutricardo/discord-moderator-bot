const { Client, Interaction, PermissionFlagsBits } = require('discord.js');
const AutoRole = require('../../models/AutoRole');

module.exports = {
	/**
	 *
	 * @param {Client} client
	 * @param {Interaction} interaction
	 */
	callback: async (client, interaction) => {
		try {
			if (!(await AutoRole.exists({ guildId: interaction.guild.id }))) {
				await interaction.reply({
					content:
						'Auto-role nu a fost configurat. Foloseste `/autorole-configure` pentru configurare.',
					ephemeral: true,
				});
				return;
			}

			await AutoRole.findOneAndDelete({ guildId: interaction.guild.id });
			await interaction.reply({
				content:
					'Auto-role a fost dezactivat cu succes. Daca doresti sa il activezi din nou, foloseste `/autorole-configure`.',
				ephemeral: true,
			});
		} catch (error) {
			console.log(error);
		}
	},

	name: 'autorole-disable',
	description: 'Dezactiveaza auto-role.',
	permissionsRequired: [PermissionFlagsBits.Administrator],
};
