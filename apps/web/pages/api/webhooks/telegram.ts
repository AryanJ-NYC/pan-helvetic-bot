import type { NextApiHandler } from 'next';
import { messageHandler } from 'telegram';

const handler: NextApiHandler = async (req, res) => {
  await messageHandler(req, res);
};

export default handler;
