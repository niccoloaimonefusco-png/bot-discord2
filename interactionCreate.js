if (interaction.isButton()) {

    const user = interaction.user;
    const guild = interaction.guild;

    // Mappa categorie
    const categorie = {
        "ticket_supporto": "supporto",
        "ticket_staff": "staff",
        "ticket_segnalazioni": "segnalazioni"
    };

    if (categorie[interaction.customId]) {

        const categoria = categorie[interaction.customId];
        const channelName = `ticket-${categoria}-${user.username.toLowerCase()}`;

        const existing = guild.channels.cache.find(c => c.name === channelName);
        if (existing) {
            return interaction.reply({ content: "❌ Hai già un ticket aperto.", ephemeral: true });
        }

        const channel = await guild.channels.create({
            name: channelName,
            type: 0,
            permissionOverwrites: [
                {
                    id: guild.id,
                    deny: ["ViewChannel"]
                },
                {
                    id: user.id,
                    allow: ["ViewChannel", "SendMessages"]
                },
                {
                    id: interaction.client.user.id,
                    allow: ["ViewChannel", "SendMessages"]
                }
            ]
        });

        const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("close_ticket")
                .setLabel("Chiudi Ticket")
                .setStyle(ButtonStyle.Danger)
        );

        await channel.send({
            content: `🎫 **Ticket aperto da <@${user.id}>**\n📂 Categoria: **${categoria}**`,
            components: [row]
        });

        return interaction.reply({
            content: `🟢 Ticket creato: <#${channel.id}>`,
            ephemeral: true
        });
    }
}
if (interaction.isButton()) {
    if (interaction.customId === "close_ticket") {
        await interaction.reply("🔴 Ticket chiuso, il canale verrà eliminato.");
        setTimeout(() => {
            interaction.channel.delete().catch(() => {});
        }, 2000);
    }
}
