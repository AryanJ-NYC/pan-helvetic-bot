import { Telegraf } from 'telegraf';
import { type MyContext } from './types';

export const bot = new Telegraf<MyContext>(process.env.TELEGRAM_API_KEY, {
  telegram: { webhookReply: true },
});
