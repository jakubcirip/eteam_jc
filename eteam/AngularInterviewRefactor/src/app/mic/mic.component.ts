import { Component, OnInit } from '@angular/core';
import { MicService } from '../hardware/mic.service';

@Component({
  selector: 'app-mic',
  templateUrl: './mic.component.html',
  styleUrls: ['./mic.component.scss'],
})
export class MicComponent implements OnInit {
  constructor(public mic: MicService) {}

  ngOnInit() {}
}
