const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const path = require("path");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("server_on")
        .setDescription("Mostra il server ON"),

    async execute(interaction) {

        await interaction.deferReply();

        try {
            const filePath = path.join(__dirname, "..", "videos", "server_on (2).gif");
            const file = new AttachmentBuilder(filePath);
            console.log("Percorso:", filePath);


            await interaction.editReply({
                content: "🟢 SERVER ON!@everyone",
                files: [file]
            });

        } catch (err) {
            console.error(err);

            if (!interaction.replied) {
                await interaction.reply("❌ Errore durante l'invio del file.");
            } else {
                await interaction.editReply("❌ Errore durante l'invio del file.");
            }
        }
    }
};
