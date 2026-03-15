const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("turno_stop")
        .setDescription("Termina il turno lavorativo"),

    async execute(interaction) {

        const filePath = path.join(__dirname, "..", "turni.json");

        if (!fs.existsSync(filePath)) {
            return interaction.reply("❌ Non hai un turno attivo.");
        }

        const turni = JSON.parse(fs.readFileSync(filePath));

        const turno = turni[interaction.user.id];
        if (!turno) {
            return interaction.reply("❌ Non hai un turno attivo.");
        }

        const durataMs = Date.now() - turno.start;
        const minuti = Math.floor(durataMs / 60000);
        const ore = Math.floor(minuti / 60);
        const minFinali = minuti % 60;

        delete turni[interaction.user.id];
        fs.writeFileSync(filePath, JSON.stringify(turni, null, 2));

        await interaction.reply(
            `🔴 **Turno terminato!**\n👤 Utente: <@${interaction.user.id}>\n🎭 Ruolo: **${turno.ruolo}**\n⏱️ Durata: **${ore}h ${minFinali}m**`
        );
    }
};
