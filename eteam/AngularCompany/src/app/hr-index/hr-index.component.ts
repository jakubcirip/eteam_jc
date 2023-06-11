import { Component, OnInit } from '@angular/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';

import bootstrapPlugin from '@fullcalendar/bootstrap';
import { Router } from '@angular/router';
import API from 'src/services/API';

@Component({
  selector: 'app-hr-index',
  templateUrl: './hr-index.component.html',
  styleUrls: ['./hr-index.component.scss'],
})
export class HrIndexComponent implements OnInit {
  calendarPlugins = [dayGridPlugin, bootstrapPlugin, listPlugin];

  eventTimeFormat = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  events = [];

  buttonText = {
    today: 'Today',
    month: 'Month',
    week: 'Week',
    day: 'Day',
    list: 'List',
  };

  header = {
    left: 'title, dayGridMonth, dayGridWeek, dayGridDay, list',
    center: '',
    right: 'prev,today,next',
  };

  constructor(private router: Router) {}

  onNewInterview() {
    this.router.navigate(['/hr', 'fast-interview']);
  }

  async ngOnInit() {
    this.events = (await API.hrGetCalendar()).events;
  }

  onClick(e) {
    this.router.navigate(['/hr/interview']);
  }
}
