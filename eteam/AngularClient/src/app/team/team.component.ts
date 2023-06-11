import { Component, OnInit } from '@angular/core';
import { _ } from '../utils.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  constructor(public data: DataService) {}

  ngOnInit() {}
}
