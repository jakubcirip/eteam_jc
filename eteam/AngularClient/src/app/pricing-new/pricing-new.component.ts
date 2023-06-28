import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { _ } from '../utils.service';

@Component({
  selector: 'app-pricing-new',
  templateUrl: './pricing-new.component.html',
  styleUrls: ['./pricing-new.component.scss'],
})
export class PricingNewComponent implements OnInit {
  plans = [
    {
      price: 50,
      name: _('pricing-new.plan1.title'),
      features: [_('pricing-new.features.textAnalysis')],
    },
    {
      price: 200,
      name: _('pricing-new.plan2.title'),
      features: [
        _('pricing-new.features.textAnalysis'),
        _('pricing-new.features.audioAnalysis'),
      ],
    },
    {
      price: 500,
      name: _('pricing-new.plan3.title'),
      features: [
        _('pricing-new.features.textAnalysis'),
        _('pricing-new.features.audioAnalysis'),
        _('pricing-new.features.videoAnalysis'),
      ],
    },
  ];
  constructor(public data: DataService) {}

  ngOnInit() {}
}
