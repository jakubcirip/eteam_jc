import { Component, OnInit } from '@angular/core';

declare const initIndex: any;
declare const AOS: any;

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
})
export class EmptyComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      initIndex();
    }, 1000);
  }
}
