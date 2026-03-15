const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const path = require("path");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("server_off")
        .setDescription("Mostra il server OFF"),

    async execute(interaction) {

        await interaction.deferReply();

        try {
            const filePath = path.join(__dirname, "..", "videos", "server_off.gif");
            const file = new AttachmentBuilder(filePath);

            await interaction.editReply({
                content: "🔴 SERVER OFF! @everyone",
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
