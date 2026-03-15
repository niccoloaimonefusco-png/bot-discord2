const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("turno_start")
        .setDescription("Inizia il turno lavorativo scegliendo il ruolo")
        .addStringOption(option =>
            option
                .setName("ruolo")
                .setDescription("Seleziona il tuo ruolo staff")
                .setRequired(true)
                .addChoices(
                    { name: "CEO", value: "CEO" },
                    { name: "CO-CEO", value: "CO-CEO" },
                    { name: "S.Moderator", value: "S.Moderator" },
                    { name: "Moderator", value: "Moderator" },
                    { name: "Jr.Moderator", value: "Jr.Moderator" },
                    { name: "S.Staff", value: "S.Staff" },
                    { name: "Staff", value: "Staff" },
                    { name: "Jr.Staff", value: "Jr.Staff" },
                    { name: "S.Head Helper", value: "S.Head Helper" },
                    { name: "Head Helper", value: "Head Helper" },
                    { name: "J.Head Helper", value: "J.Head Helper" },
                    { name: "S.Helper", value: "S.Helper" },
                    { name: "Helper", value: "Helper" },
                    { name: "Jr.Helper", value: "Jr.Helper" }
                )
        ),

    async execute(interaction) {

        const ruolo = interaction.options.getString("ruolo");

        const filePath = path.join(__dirname, "..", "turni.json");
        let turni = {};

        if (fs.existsSync(filePath)) {
            turni = JSON.parse(fs.readFileSync(filePath));
        }

        turni[interaction.user.id] = {
            start: Date.now(),
            ruolo: ruolo
        };

        fs.writeFileSync(filePath, JSON.stringify(turni, null, 2));

        await interaction.reply(
            `🟢 **Turno iniziato!**\n👤 Utente: <@${interaction.user.id}>\n🎭 Ruolo scelto: **${ruolo}**\n⏱️ Timer avviato`
        );
    }
};
