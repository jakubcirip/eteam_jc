import * as scheduler from 'node-schedule';
import { LogManager } from '../managers/LogManager';
import * as fs from 'fs-extra';

export class DeleteFolder {
  id: number;
  deleteAt: Date;
  folderName: string;

  constructor(data: any) {
    this.id = data.id;
    this.deleteAt = data.deleteAt;
    this.folderName = data.folderName;
  }

  async init() {
    if (this.deleteAt.getTime() - Date.now() < 0) {
      LogManager.info(
        'NOT Registering Folder IN PAST ' +
          this.id +
          this.folderName +
          this.deleteAt
      );
    } else {
      LogManager.info(
        'Registering Folder ' + this.id + this.folderName + this.deleteAt
      );
      scheduler.scheduleJob(this.deleteAt, async () => {
        LogManager.success(
          'Deleting folder' + ` [${this.id}] (${this.folderName})`
        );
        await fs.remove(this.folderName);
      });
    }
  }
}
