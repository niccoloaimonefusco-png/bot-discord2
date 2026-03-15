const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("annuncio")
        .setDescription("Crea un annuncio con embed")
        .addStringOption(option =>
            option
                .setName("titolo")
                .setDescription("Titolo dell'annuncio")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("descrizione")
                .setDescription("Testo dell'annuncio")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("colore")
                .setDescription("Colore dell'embed (es: #ff0000)")
                .setRequired(false)
        ),

    async execute(interaction) {
        const titolo = interaction.options.getString("titolo");
        const descrizione = interaction.options.getString("descrizione");
        let colore = interaction.options.getString("colore") || "#2b2d31";

        // VALIDAZIONE COLORE
        const hexRegex = /^#?[0-9A-Fa-f]{6}$/;

        if (!hexRegex.test(colore)) {
            return interaction.reply({
                content: "❌ Colore non valido! Usa un HEX valido, esempio: `#ff0000`",
                ephemeral: true
            });
        }

        // Se manca il #, lo aggiunge
        if (!colore.startsWith("#")) {
            colore = `#${colore}`;
        }

        const embed = new EmbedBuilder()
            .setTitle(titolo)
            .setDescription(descrizione)
            .setColor(colore)
            .setTimestamp()
            .setFooter({ text: "Annuncio automatico" });

        await interaction.reply({
            embeds: [embed]
        });
    }
};
