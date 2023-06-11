import { Component, OnInit } from '@angular/core';
import { _ } from '../utils.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-counters',
  templateUrl: './counters.component.html',
  styleUrls: ['./counters.component.scss'],
})
export class CountersComponent implements OnInit {
  constructor(public data: DataService) {}

  ngOnInit() {}
}
