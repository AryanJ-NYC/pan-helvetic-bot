import { bot } from './bot';
import './commands/broadcast';
import './commands/generatelist';

export const messageHandler = bot.webhookCallback('/api/webhooks/telegram');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
