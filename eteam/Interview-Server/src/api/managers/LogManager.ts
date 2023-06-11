import * as debug from 'debug';
import { __ } from 'i18n';

export class LogManager {
  static log(msg: any) {
    debug('log')(msg);
  }

  static error(msg: any) {
    debug('error')(msg);
  }

  static info(msg: any) {
    debug('info')(msg);
  }

  static warning(msg: any) {
    debug('warn')(msg);
  }

  static success(msg: any) {
    debug('success')(msg);
  }
}
