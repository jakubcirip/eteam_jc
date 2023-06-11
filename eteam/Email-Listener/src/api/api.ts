import { SQLManager } from './managers/SQLManager';
import { LogManager } from './managers/LogManager';
import { MailClientManager } from './managers/MailClientManager';
import { MailManager } from './managers/MailManager';

export const API = async (c) => {
  try {
    LogManager.log('Connecting to DB ..');
    SQLManager.getInstance();

    LogManager.log('Connecting to email server ..');
    await MailClientManager.getInstance().init();

    LogManager.log('Starting mail service ..');
    MailManager.Start();
    LogManager.log('Starting server ..');
    MailManager.Update();
  } catch (exp) {
    LogManager.error('Cant start server');
    LogManager.error(exp);
  }
};
