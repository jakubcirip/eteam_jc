import { SQLManager } from './SQLManager';
import { LogManager } from './LogManager';
import { Interview } from '../classes/Interview';
import { DeleteFolder } from '../classes/DeleteFolder';

export class InterviewManager {
  private static i: InterviewManager;

  registeredInterviews: Interview[] = [];
  registeredFolders: DeleteFolder[] = [];

  static getInstance(): InterviewManager {
    if (!InterviewManager.i) {
      InterviewManager.i = new InterviewManager();
    }

    return InterviewManager.i;
  }

  constructor() {
    this.setup();
  }

  async setup() {
    await this.update();
    setTimeout(() => {
      this.setup();
    }, 10000);
  }

  async update() {
    const intRes = await SQLManager.knex
      .select(['id'])
      .from('job_interviews')
      .where('state', 'pending');

    LogManager.log('Found ' + intRes.length + ' running interviews');

    const p = intRes.map(async (int) => {
      const { id: intId } = int;

      if (!this.isRegistered(intId)) {
        await this.registerInterview(intId);
      }
    });

    await Promise.all(p);

    const deleteFolderRes = await SQLManager.knex
      .select({
        folderName: 'folder_name',
        deleteAt: 'delete_at',
        id: 'id',
      })
      .from('interview_delete');

    for (const folderRes of deleteFolderRes) {
      if (!this.isFolderRegistered(folderRes.id)) {
        await this.registerFolder(folderRes);
      }
    }

    LogManager.log('Found ' + deleteFolderRes.length + ' delete folder jobs');
  }

  async registerInterview(intId: number) {
    LogManager.info('Registering ' + intId);

    const int = new Interview(intId);

    this.registeredInterviews.push(int);

    await int.init();
  }

  async registerFolder(folderData: any) {
    const f = new DeleteFolder(folderData);
    this.registeredFolders.push(f);
    await f.init();
  }

  isRegistered(intId: number): boolean {
    return this.registeredInterviews.find((int) => int.id === intId)
      ? true
      : false;
  }

  isFolderRegistered(fId: number): boolean {
    return this.registeredFolders.find((f) => f.id === fId) ? true : false;
  }
}
