import { Component, OnInit } from '@angular/core';
import { _ } from '../utils.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  constructor(public data: DataService) {}

  ngOnInit() {}
}
