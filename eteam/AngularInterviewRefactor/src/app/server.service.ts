import { Injectable } from '@angular/core';
import API from './services/API';
import { InterviewService } from './interview.service';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  isAuthorized = false;
  userTag;
  intTag;

  constructor() {}

  async authorize(int: InterviewService, intTag: string, userTag: string) {
    if (this.isAuthorized === true) {
      return true;
    }

    try {
      const res = await API.validateInterviewUser(intTag, userTag);
      if (res.success) {
        this.isAuthorized = true;

        this.intTag = intTag;
        this.userTag = userTag;

        const data = await API.getInterviewForm(this.intTag, this.userTag);
        if (!int.serverData) {
          int.initData(data);
        }
      }
    } catch (err) {
      this.isAuthorized = false;
    }

    return this.isAuthorized;
  }
}
