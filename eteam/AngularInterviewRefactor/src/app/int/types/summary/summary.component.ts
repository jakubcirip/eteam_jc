import { Component, OnInit, Input } from '@angular/core';
import { AssistentService } from 'src/app/assistent.service';
import { Step } from '../../base/base.component';
import { InterviewService, InterviewType } from 'src/app/interview.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  @Input() step: Step;

  lines = [];

  constructor(
    public assistent: AssistentService,
    private int: InterviewService,
  ) {}

  ngOnInit() {
    this.int.dataChangeSubject.subscribe(() => {
      this.loadSummaryData();
    });
  }

  loadSummaryData() {
    this.lines = [
      {
        value: this.int.name,
        icon: 'fa-id-card',
        title: 'First Name',
      },
      {
        value: this.int.surname,
        icon: 'fa-id-card',
        title: 'Surname',
      },
      {
        value: this.int.email,
        icon: 'fa-envelope',
        title: 'Email',
      },
      {
        value: this.int.phone,
        icon: 'fa-phone',
        title: 'Phone Number',
      },
      {
        value: this.int.nickname,
        icon: 'fa-user',
        title: 'Nickname',
      },
      {
        value:
          this.int.interviewType === InterviewType.CAM
            ? 'Camera and Microphone'
            : 'Microphone (without camera)',
        icon:
          this.int.interviewType === InterviewType.CAM
            ? 'fa-camera'
            : 'fa-microphone',
        title: 'Interview Type',
      },
      {
        value: this.int.stickyHardwarePreview ? 'Yes' : 'No',
        icon: 'fa-eye',
        title: 'Sticky Hardware Preview',
      },
    ];
  }
}
