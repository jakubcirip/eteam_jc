import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterOutlet, ActivatedRoute } from '@angular/router';
import { slideInAnimation } from '../animations';
import API, { GetSharedVideoTutorialsResponse } from 'src/services/API';
import { DomSanitizer } from '@angular/platform-browser';

declare var toggleFullscreen: any;
declare var Swal: any;
declare const Shepherd: any;
declare const Cookies: any;
declare const $: any;
declare const uuidv4: any;

@Component({
  selector: 'app-company-board',
  templateUrl: './company-board.component.html',
  styleUrls: ['./company-board.component.scss'],
  animations: [slideInAnimation],
})
export class CompanyBoardComponent implements OnInit {
  i = 0;
  name = '';

  videoArr: {
    pth: string[];
    data: GetSharedVideoTutorialsResponse['paths'][number];
  }[];
  currentVideo: GetSharedVideoTutorialsResponse['paths'][number] = null;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) {}

  async ngOnInit() {
    const data = await API.getMeInfoCompany();
    this.videoArr = (await API.getSharedVideoTutorials()).paths.map((p) => {
      return { data: p, pth: p.pth.split('/') };
    });
    this.name = data.name;

    setTimeout(() => {
      const tourCookie = Cookies.get('tour');
      if (!tourCookie) {
        this.startTour();
        Cookies.set('tour', 'over');
      }
    }, 1000);

    this.route.url.subscribe(() => {
      let url = this.router.url;
      if (url.startsWith('/')) {
        url = url.substring(1);
      }
      if (url.endsWith('/')) {
        url = url.slice(0, -1);
      }

      const urlArr = url.split('/');

      let possibleVideos = [...this.videoArr];

      let index = -1;
      urlArr.forEach((currectSegment) => {
        index++;

        possibleVideos = possibleVideos.filter((possibleSegment) => {
          if (
            possibleSegment.pth[index] !== undefined &&
            possibleSegment.pth[index] !== null
          ) {
            if (
              possibleSegment.pth[index] === currectSegment ||
              possibleSegment.pth[index] === '*'
            ) {
              return true;
            }
          }
          return false;
        });
      });

      possibleVideos = possibleVideos.filter(
        (p) => p.pth.length === urlArr.length,
      );

      if (possibleVideos.length > 0) {
        this.currentVideo = possibleVideos[0].data;
      } else {
        this.currentVideo = null;
      }
    });
  }

  getCurrentVideoUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + this.currentVideo.video,
    );
  }

  onOpenCurrentVideo() {
    $('#myModal').modal();
  }

  onContactClick() {
    Swal.fire({
      type: 'info',
      title: 'Contact',
      html:
        '<br><p>Tel.: <strong> +421 48 618 600 </strong> </p><br><p>Email: <strong> denis@hiroo.eu </strong> </p>',
    });
  }

  startTour() {
    const stepsArr = [
      {
        target: '#aside > div > div.navbar',
        content:
          'Welcome to Hiroo. Let me show you the basics how to use our website.',
      },
      {
        target: '#header > div > ul > li:nth-child(1) > label',
        content:
          'Here you can switch between dark and light theme to achieve the best experience in different enviroments.',
      },

      {
        target: '#aside > div > div.flex.scrollable.hover',
        content: 'Side menu contains all redirects you may need.',
      },
      {
        target: '#aside > div > div.flex.scrollable.hover',
        content:
          'First of all, there is "Plan" section. You can configure plan of your company here. You can change this for free but it will affect price of every interview. Better plans gives you more complex features for HRspecialist to beter analyse interview results.',
      },
      {
        target: '#aside > div > div.flex.scrollable.hover',
        content:
          'Secondly, there is "Division" section. Division is one section of your company. If your company is small or medium-sized, feel free to create one division and use it for everything. After creating division, you can add specific people - HRspecialist into divisions.',
      },
      {
        target: '#aside > div > div.flex.scrollable.hover',
        content:
          'Lastly, there is "Tokens" section. In there you can see your current tokens balance and purcahse new tokens. 1 token represents 1€ and it is used when HR specialist start an interview.',
      },

      {
        target: '#aside > div > div.navbar > a > div',
        content:
          'If you are stuck on any step, use this info button. It will provide you with video tutorial how to use specific page.',
      },

      {
        target: '#aside > div > div.no-shrink > div > ul > li:nth-child(1)',
        content:
          'The tour is over. If you want to replay it, click here at anytime.',
      },
    ];

    const tour = new Shepherd.Tour({
      defaultStepOptions: {
        classes: 'shadow-md bg-purple-dark',
        scrollTo: true,
      },
      exitOnEsc: true,
      keyboardNavigation: true,
    });

    stepsArr.forEach((s) => {
      tour.addStep({
        cancelIcon: {
          enabled: true,
          label: 'Close',
        },
        canClickTarget: false,
        scrollTo: false,
        highlightClass: 'tour-highlight',
        id: uuidv4(),
        text: s.content,
        attachTo: {
          element: s.target,
          on: 'auto',
        },
        // classes: 'example-step-extra-class',
        buttons: [
          {
            text: 'Next',
            action: tour.next,
          },
        ],
      });
    });

    tour.start();
  }

  logout() {
    this.auth.setKey('NOT LOGGED');
    this.router.navigate(['/company-login']);
    this.auth.setDarkTheme();
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData['anim']
    );
  }

  toggleFullscreen() {
    toggleFullscreen();
  }

  toggleColorMode() {
    if (this.i % 2 !== 0) {
      this.i++;
      return;
    }

    this.i++;
    const el = document.getElementById('page');
    if (el.classList.contains('bg-dark')) {
      el.classList.remove('bg-dark');
    } else {
      el.classList.add('bg-dark');
    }
  }

  getDomain() {
    return this.auth.getDomain();
  }

  getName() {
    return this.name;
  }
}
