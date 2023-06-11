import { Component, OnInit } from '@angular/core';
import { _ } from '../utils.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-parralax',
  templateUrl: './parralax.component.html',
  styleUrls: ['./parralax.component.scss'],
})
export class ParralaxComponent implements OnInit {
  constructor(public data: DataService) {}

  ngOnInit() {}
}
