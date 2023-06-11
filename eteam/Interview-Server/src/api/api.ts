import { SQLManager } from './managers/SQLManager';
import { LogManager } from './managers/LogManager';
import { __ } from 'i18n';
import { InterviewManager } from './managers/InterviewManager';

export const API = async (c) => {
  try {
    LogManager.log('Connecting to DB ..');
    SQLManager.getInstance();
    LogManager.log('Starting server ..');

    InterviewManager.getInstance();
  } catch (exp) {
    LogManager.error('Cant start server');
    LogManager.error(exp);
  }
};
