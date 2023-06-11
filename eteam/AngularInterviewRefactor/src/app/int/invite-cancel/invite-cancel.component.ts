import { Component, OnInit } from '@angular/core';
import { InterviewService } from 'src/app/interview.service';

@Component({
  selector: 'app-invite-cancel',
  templateUrl: './invite-cancel.component.html',
  styleUrls: ['./invite-cancel.component.scss'],
})
export class InviteCancelComponent implements OnInit {
  constructor(private int: InterviewService) {}

  ngOnInit(): void {
    this.int.isDark
      ? $('body').addClass('dark-version')
      : $('body').removeClass('dark-version');
  }
}
