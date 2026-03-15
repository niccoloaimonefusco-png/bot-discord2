const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rank")
        .setDescription("Mostra il tuo rank o quello di un altro utente")
        .addUserOption(option =>
            option
                .setName("utente")
                .setDescription("Utente di cui vuoi vedere il rank")
                .setRequired(false)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser("utente") || interaction.user;

        // DATI DI TEST (puoi collegarli a un database dopo)
        const livello = 5;
        const xp = 320;
        const xpNecessaria = 500;

        // Barra XP
        const percentuale = Math.floor((xp / xpNecessaria) * 10);
        const barra = "█".repeat(percentuale) + "░".repeat(10 - percentuale);

        const embed = new EmbedBuilder()
            .setTitle(`📊 Rank di ${user.username}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setColor("#00ff9d")
            .addFields(
                { name: "Livello", value: `${livello}`, inline: true },
                { name: "XP", value: `${xp} / ${xpNecessaria}`, inline: true },
                { name: "Progresso", value: barra }
            )
            .setFooter({ text: "Sistema Rank - Trentino RP" })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
