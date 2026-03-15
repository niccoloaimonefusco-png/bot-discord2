const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    PermissionFlagsBits
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup_ticket")
        .setDescription("Invia il pannello ticket")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("ticket_supporto")
                .setLabel("Supporto")
                .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
                .setCustomId("ticket_staff")
                .setLabel("Staff")
                .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
                .setCustomId("ticket_segnalazioni")
                .setLabel("Segnalazioni")
                .setStyle(ButtonStyle.Danger)
        );

        await interaction.reply({
            content: "🎫 **Apri un ticket scegliendo la categoria:**",
            components: [row]
        });
    }
};
