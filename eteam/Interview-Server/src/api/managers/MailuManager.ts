import * as bcrypt from 'bcrypt';
import { __ } from 'i18n';

import { SQLManager } from './SQLManager';

export class MailuManager {
  private static i: MailuManager;

  static getInstance(): MailuManager {
    if (!MailuManager.i) {
      MailuManager.i = new MailuManager();
    }

    return MailuManager.i;
  }

  constructor() {
    this.setup();
  }

  async setup() {}

  async hashPass(pass: string) {
    return new Promise((res, rej) => {
      bcrypt.hash(pass, 12, function(err, hash) {
        if (err) {
          return rej(err);
        }

        res(hash);
      });
    });
  }

  async changePassword(nick: string, newPass: string) {
    const passHash = await this.hashPass(newPass);
    await SQLManager.mailKnex
      .update({
        password: '{BLF-CRYPT}' + passHash,
      })
      .table('user')
      .where('localpart', nick);
  }

  async registerEmail(nick: string, pass: string, name: string) {
    const passHash = await this.hashPass(pass);
    await SQLManager.mailKnex
      .insert({
        localpart: nick,
        password: '{BLF-CRYPT}' + passHash,
        quota_bytes: 1000000000,
        global_admin: 0,
        created_at: SQLManager.mailKnex.raw('NOW()'),
        enable_imap: 1,
        enable_pop: 1,
        forward_enabled: 0,
        forward_destination: '',
        reply_enabled: 0,
        reply_subject: null,
        reply_body: null,
        displayed_name: name,
        spam_enabled: 1,
        domain_name: 'hiroo.eu',
        email: nick + '@hiroo.eu',
        spam_threshold: 80,
        forward_keep: 1,
        enabled: 1,
        quota_bytes_used: 0,
      })
      .into('user');
  }
}
