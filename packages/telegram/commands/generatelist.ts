import { bot } from '../bot';
import rooms from '../rooms.json';

bot.command('generatelist', async (ctx) => {
  const stringifiedData = rooms
    .filter((d) => !!d.url)
    .map((d) => `${d.name}: ${d.url}`)
    .join('\n');
  await ctx.telegram.sendMessage(ctx.chat.id, stringifiedData);
});
