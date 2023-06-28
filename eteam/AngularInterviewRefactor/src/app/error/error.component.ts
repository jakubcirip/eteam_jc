import { Component, OnInit } from '@angular/core';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { Router } from '@angular/router';
import { InterviewService } from '../interview.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  constructor(private int: InterviewService) {}

  ngOnInit(): void {
    this.int.isDark
      ? $('body').addClass('dark-version')
      : $('body').removeClass('dark-version');
  }
}
