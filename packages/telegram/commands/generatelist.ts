import { bot } from '../bot';

bot.command('generatelist', async (ctx) => {
  const stringifiedData = data.map((d) => `${d.name}: ${d.url}`).join('\n');
  await ctx.telegram.sendMessage(ctx.chat.id, stringifiedData);
});

const data = [
  { name: 'Blockchain Vaud', url: 'https://t.me/+96abb9MxPMoyOWY0' },
  { name: 'Bitcoin Geneva', url: 'https://t.me/BitcoinGeneva' },
  { name: 'Einezwänzg Bitcoin Solothurn', url: 'https://t.me/Einundzwanzig_Seeland' },
  { name: 'Bitcoin Lausanne', url: 'https://t.me/BitcoinLausanne' },
];
