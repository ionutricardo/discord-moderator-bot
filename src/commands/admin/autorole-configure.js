const {
	ApplicationCommandOptionType,
	Client,
	Interaction,
	PermissionFlagsBits,
} = require('discord.js');
const AutoRole = require('../../models/AutoRole');

module.exports = {
	/**
	 *
	 * @param {Client} client
	 * @param {Interaction} interaction
	 */
	callback: async (client, interaction) => {
		if (!interaction.inGuild()) return;

		const targetRoleId = interaction.options.get('role').value;

		try {
			let autoRole = await AutoRole.findOne({ guildId: interaction.guild.id });

			if (autoRole) {
				if (autoRole.roleId === targetRoleId) {
					await interaction.reply({
						content:
							'Auto-role a fost deja configurat. Daca doresti sa il dezactivezi, foloseste `/autorole-disable`.',
						ephemeral: true,
					});
					return;
				}

				autoRole.roleId = targetRoleId;
			} else {
				autoRole = new AutoRole({
					guildId: interaction.guild.id,
					roleId: targetRoleId,
				});
			}

			await autoRole.save();
			await interaction.reply({
				content:
					'Auto-role a fost configurat cu succes. Daca doresti sa il dezactivezi, foloseste `/autorole-disable`.',
				ephemeral: true,
			});
		} catch (error) {
			console.log(error);
		}
	},

	name: 'autorole-configure',
	description: 'Configureaza auto-role.',
	options: [
		{
			name: 'role',
			description:
				'Rolul pe care doresti sa il primeasca utilizatorii atunci cand intra pe acest server de discord.',
			type: ApplicationCommandOptionType.Role,
			required: true,
		},
	],
	permissionsRequired: [PermissionFlagsBits.Administrator],
	botPermissions: [PermissionFlagsBits.ManageRoles],
};
