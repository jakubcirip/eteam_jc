import { Injectable } from '@angular/core';
import { _ } from './utils.service';
declare const reinit: any;

export enum ScreenshotTags {
  HR_PANEL = 'hrpanel',
  INT_RESULTS = 'interviewresults',
  INT = 'interview',
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  plans;
  clients;
  counters;
  moreFeatures;
  features;
  defaultStyle;
  newShapes;
  team;

  screenshots;

  constructor() {
    this.init();
  }

  init() {
    this.screenshots = [
      // {
      //   tags: [ScreenshotTags.HR_PANEL],
      //   src: '/assets/screenshots_gallery/hrpanel/p1.png',
      // },

      {
        tags: [ScreenshotTags.HR_PANEL],
        src: '/assets/screenshots_gallery/hrpanel/p2.png',
      },

      // {
      //   tags: [ScreenshotTags.HR_PANEL],
      //   src: '/assets/screenshots_gallery/hrpanel/p3.png',
      // },

      // {
      //   tags: [ScreenshotTags.HR_PANEL],
      //   src: '/assets/screenshots_gallery/hrpanel/p4.png',
      // },

      // {
      //   tags: [ScreenshotTags.HR_PANEL],
      //   src: '/assets/screenshots_gallery/hrpanel/p5.png',
      // },

      // {
      //   tags: [ScreenshotTags.HR_PANEL],
      //   src: '/assets/screenshots_gallery/hrpanel/p6.png',
      // },

      // {
      //   tags: [ScreenshotTags.HR_PANEL],
      //   src: '/assets/screenshots_gallery/hrpanel/p7.png',
      // },

      // {
      //   tags: [ScreenshotTags.INT],
      //   src: '/assets/screenshots_gallery/int/i1.png',
      // },
      // {
      //   tags: [ScreenshotTags.INT],
      //   src: '/assets/screenshots_gallery/int/i2.png',
      // },
      // {
      //   tags: [ScreenshotTags.INT],
      //   src: '/assets/screenshots_gallery/int/i3.png',
      // },
      // {
      //   tags: [ScreenshotTags.INT],
      //   src: '/assets/screenshots_gallery/int/i4.png',
      // },
      // {
      //   tags: [ScreenshotTags.INT],
      //   src: '/assets/screenshots_gallery/int/i5.png',
      // },
      {
        tags: [ScreenshotTags.INT],
        src: '/assets/screenshots_gallery/int/i6.png',
      },
      // {
      //   tags: [ScreenshotTags.INT],
      //   src: '/assets/screenshots_gallery/int/i7.png',
      // },
      // {
      //   tags: [ScreenshotTags.INT],
      //   src: '/assets/screenshots_gallery/int/i8.png',
      // },
      // {
      //   tags: [ScreenshotTags.INT],
      //   src: '/assets/screenshots_gallery/int/i9.png',
      // },
      // {
      //   tags: [ScreenshotTags.INT],
      //   src: '/assets/screenshots_gallery/int/i10.png',
      // },

      // {
      //   tags: [ScreenshotTags.INT_RESULTS],
      //   src: '/assets/screenshots_gallery/intresults/r1.png',
      // },

      {
        tags: [ScreenshotTags.INT_RESULTS],
        src: '/assets/screenshots_gallery/intresults/r2.png',
      },

      // {
      //   tags: [ScreenshotTags.INT_RESULTS],
      //   src: '/assets/screenshots_gallery/intresults/r3.png',
      // },

      // {
      //   tags: [ScreenshotTags.INT_RESULTS],
      //   src: '/assets/screenshots_gallery/intresults/r4.png',
      // },

      // {
      //   tags: [ScreenshotTags.INT_RESULTS],
      //   src: '/assets/screenshots_gallery/intresults/r5.png',
      // },
    ];

    this.plans = [
      {
        title: _('blog.plans.plan1.title'),
        price: 0,
        currency: _('shared.currency'),
        color: _('blog.plans.plan1.color'),
        points: _('blog.plans.plan1.points').split(';'),
        pointsNo: _('blog.plans.plan1.pointsNo').split(';'),
        pointsAnalysisNo: _('blog.plans.plan1.pointsAnalysisNo').split(';'),
        pointsAnalysis: _('blog.plans.plan1.pointsAnalysis').split(';'),
        pointsLimits: _('blog.plans.plan1.pointsLimits').split(';'),
        pricePerMinute: '0.5',
      },
      {
        title: _('blog.plans.plan2.title'),
        price: 0,
        currency: _('shared.currency'),
        color: _('blog.plans.plan2.color'),
        points: _('blog.plans.plan2.points').split(';'),
        pointsNo: _('blog.plans.plan2.pointsNo').split(';'),
        pointsAnalysisNo: _('blog.plans.plan2.pointsAnalysisNo').split(';'),
        pointsAnalysis: _('blog.plans.plan2.pointsAnalysis').split(';'),
        pointsLimits: _('blog.plans.plan2.pointsLimits').split(';'),
        pricePerMinute: '1.0',
      },
      {
        title: _('blog.plans.plan3.title'),
        price: 0,
        currency: _('shared.currency'),
        color: _('blog.plans.plan3.color'),
        points: _('blog.plans.plan3.points').split(';'),
        pointsNo: _('blog.plans.plan3.pointsNo').split(';'),
        pointsAnalysisNo: _('blog.plans.plan3.pointsAnalysisNo').split(';'),
        pointsAnalysis: _('blog.plans.plan3.pointsAnalysis').split(';'),
        pointsLimits: _('blog.plans.plan3.pointsLimits').split(';'),
        pricePerMinute: '2.0',
      },
    ];

    this.clients = [
      {
        pos: '50%,auto,auto,20%',
        imgSrc: '/assets/agency/img/avatar-1.png',
        rating: [1, 1, 1],
        name: _('clients.client1.name'),
        companyName: _('clients.client1.company'),
        text: _('clients.client1.text'),
      },
      {
        pos: '50%,auto,auto,80%',
        imgSrc: '/assets/agency/img/avatar-1.png',
        rating: [1, 1, 1, 1, 1],
        name: _('clients.client2.name'),
        companyName: _('clients.client2.company'),
        text: _('clients.client2.text'),
      },
    ];

    this.counters = [
      {
        classes: 'fas fa-clock',
        number: 20,
        title: _('counters.items.item1.title'),
        text: _('counters.items.item1.text'),
      },
      {
        classes: 'fas fa-money-bill',
        number: 2000,
        title: _('counters.items.item2.title'),
        text: _('counters.items.item2.text'),
      },
      {
        classes: 'fas fa-users',
        number: 40,
        title: _('counters.items.item3.title'),
        text: _('counters.items.item3.text'),
      },
      {
        classes: 'fas fa-phone',
        number: 35,
        title: _('counters.items.item4.title'),
        text: _('counters.items.item4.text'),
      },
    ];

    this.moreFeatures = [
      // {
      //   img: '/assets/icons/more1.svg',
      //   title: _('more.feature1.title'),
      //   text: _('more.feature1.text'),
      // },
      // {
      //   img: '/assets/icons/more2.svg',
      //   title: _('more.feature2.title'),
      //   text: _('more.feature2.text'),
      // },
      // {
      //   img: '/assets/icons/more3.svg',
      //   title: _('more.feature3.title'),
      //   text: _('more.feature3.text'),
      // },
    ];

    this.features = [
      // {
      //   img: '/assets/icons/feature1.svg',
      //   preTitle: _('parralax.feature1.preTitle'),
      //   description: _('parralax.feature1.description'),
      //   title: {
      //     before: _('parralax.feature1.title.before'),
      //     after: _('parralax.feature1.title.after'),
      //     words: _('parralax.feature1.title.words'),
      //   },
      //   modal: {
      //     title: _('parralax.feature1.modal.title'),
      //     text: _('parralax.feature1.modal.text'),
      //     image: '/assets/screenshots/modal_f1.png',
      //   },
      // },
      {
        img: '/assets/icons/feature2.svg',
        preTitle: _('parralax.feature2.preTitle'),
        description: _('parralax.feature2.description'),
        title: {
          before: _('parralax.feature2.title.before'),
          after: _('parralax.feature2.title.after'),
          words: _('parralax.feature2.title.words'),
        },
        modal: {
          title: _('parralax.feature2.modal.title'),
          text: _('parralax.feature2.modal.text'),
          image: '/assets/screenshots/modal_f2.png',
        },
      },
      {
        img: '/assets/icons/feature3.svg',
        preTitle: _('parralax.feature3.preTitle'),
        description: _('parralax.feature3.description'),
        title: {
          before: _('parralax.feature3.title.before'),
          after: _('parralax.feature3.title.after'),
          words: _('parralax.feature3.title.words'),
        },
        modal: {
          title: _('parralax.feature3.modal.title'),
          text: _('parralax.feature3.modal.text'),
          image: null,
        },
      },
      {
        img: '/assets/icons/feature4.svg',
        preTitle: _('parralax.feature4.preTitle'),
        description: _('parralax.feature4.description'),
        title: {
          before: _('parralax.feature4.title.before'),
          after: _('parralax.feature4.title.after'),
          words: _('parralax.feature4.title.words'),
        },
        modal: {
          title: _('parralax.feature4.modal.title'),
          text: _('parralax.feature4.modal.text'),
          image: null,
        },
      },
      // {
      //   img: '/assets/icons/feature5.svg',
      //   preTitle: _('parralax.feature5.preTitle'),
      //   description: _('parralax.feature5.description'),
      //   title: {
      //     before: _('parralax.feature5.title.before'),
      //     after: _('parralax.feature5.title.after'),
      //     words: _('parralax.feature5.title.words'),
      //   },
      //   modal: {
      //     title: _('parralax.feature5.modal.title'),
      //     text: _('parralax.feature5.modal.text'),
      //     image: '/assets/screenshots/modal_f5.png',
      //   },
      // },
      {
        img: '/assets/icons/feature6.svg',
        preTitle: _('parralax.feature6.preTitle'),
        description: _('parralax.feature6.description'),
        title: {
          before: _('parralax.feature6.title.before'),
          after: _('parralax.feature6.title.after'),
          words: _('parralax.feature6.title.words'),
        },
        modal: {
          title: _('parralax.feature6.modal.title'),
          text: _('parralax.feature6.modal.text'),
          image: '/assets/screenshots/modal_f6.png',
        },
      },
    ];

    this.defaultStyle = {
      position: 'absolute',
    };

    this.newShapes = [
      {
        src: '/assets/agency/img/shape-6.png',
        style: {
          ...this.defaultStyle,
          left: '85%',
          top: '20%',
        },
      },
      {
        src: '/assets/agency/img/shape-2.png',
        style: {
          ...this.defaultStyle,
          left: '75%',
          top: '50%',
        },
      },
      {
        src: '/assets/agency/img/shape-5.png',
        style: {
          ...this.defaultStyle,
          left: '50%',
          top: '20%',
        },
      },
      {
        src: '/assets/agency/img/shape-4.png',
        style: {
          ...this.defaultStyle,
          left: '85%',
          top: '70%',
        },
      },
      {
        src: '/assets/agency/img/shape-1.png',
        style: {
          ...this.defaultStyle,
          left: '10%',
          top: '60%',
        },
      },
      {
        src: '/assets/agency/img/shape-3.png',
        style: {
          ...this.defaultStyle,
          left: '40%',
          top: '80%',
        },
      },
      {
        src: '/assets/agency/img/shape-2.png',
        style: {
          ...this.defaultStyle,
          left: '30%',
          top: '50%',
        },
      },
      {
        src: '/assets/agency/img/shape-1.png',
        style: {
          ...this.defaultStyle,
          left: '20%',
          top: '70%',
        },
      },
      {
        src: '/assets/agency/img/shape-4.png',
        style: {
          ...this.defaultStyle,
          left: '60%',
          top: '50%',
        },
      },
    ];

    // shapre 9 10 11
    this.team = [
      {
        name: 'Denis Sedlák',
        linkedIn: true,
        linkedInUrl: 'https://www.linkedin.com/in/denis-sedlak-3794aa50/',
        position: _('team.denis.position'),
        imgUrl: '/assets/icons/team1.svg',
        colorUrl: '/assets/agency/img/shape-9.png',
      },
      {
        name: 'Linda Hnatová',
        linkedIn: true,
        linkedInUrl: 'https://www.linkedin.com/in/lindahnatova',
        position: _('team.linda.position'),
        imgUrl: '/assets/icons/team2.svg',
        colorUrl: '/assets/agency/img/shape-10.png',
      },
      {
        linkedIn: false,
        name: 'Matej Bačo',
        position: _('team.matej.position'),
        imgUrl: '/assets/icons/team3.svg',
        colorUrl: '/assets/agency/img/shape-11.png',
      },
      // {
      //   linkedIn: false,
      //   name: 'Adam Kaša',
      //   position: _('team.adam.position'),
      //   imgUrl: '/assets/icons/team4.svg',
      //   colorUrl: '/assets/agency/img/shape-9.png',
      // },
    ];

    setTimeout(() => {
      // reinit();
    });
  }
}
