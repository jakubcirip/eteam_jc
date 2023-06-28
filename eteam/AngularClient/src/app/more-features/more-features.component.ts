import { Component, OnInit } from '@angular/core';
import { _ } from '../utils.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-more-features',
  templateUrl: './more-features.component.html',
  styleUrls: ['./more-features.component.scss'],
})
export class MoreFeaturesComponent implements OnInit {
  constructor(public data: DataService) {}

  ngOnInit() {}
}
