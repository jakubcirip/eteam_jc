import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

declare const scrollTo: any;
declare const fullScreenViewer: any;
declare const $: any;

@Component({
  selector: 'app-slider-new',
  templateUrl: './slider-new.component.html',
  styleUrls: ['./slider-new.component.scss'],
})
export class SliderNewComponent implements OnInit {
  constructor(public data: DataService) {}

  ngOnInit() {}

  onScrollDown() {
    scrollTo('#intro');
  }

  onCovid() {
    $('html, body').animate(
      {
        scrollTop: $('#more-n0-aos-anchor').offset().top - 200,
      },
      2000,
    );
  }
}
