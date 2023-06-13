import { bot } from '../bot';
import rooms from '../rooms.json';

bot.command('broadcast', async (ctx) => {
  const messageToBroadcast = ctx.message.reply_to_message;
  if (!messageToBroadcast) {
    return;
  }

  const linkToBroadcastMessage = `https://t.me/c/${messageToBroadcast.chat.id
    .toString()
    .replace('-100', '')}/${messageToBroadcast.message_id}`;
  const message = `New broadcast: ${linkToBroadcastMessage}`;

  for (const room of rooms) {
    if (room.chatId) {
      await ctx.telegram.sendMessage(room.chatId, message);
    }
  }
});
