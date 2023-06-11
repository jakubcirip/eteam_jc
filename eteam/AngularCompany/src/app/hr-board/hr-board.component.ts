import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {
  Router,
  RouterOutlet,
  ActivatedRoute,
  NavigationEnd,
} from '@angular/router';
import { slideInAnimation } from '../animations';
import API, { GetSharedVideoTutorialsResponse } from 'src/services/API';
import { AlertTypes, Utils } from 'src/services/Utils';
import { DomSanitizer } from '@angular/platform-browser';

declare var toggleFullscreen: any;
declare var Swal: any;
declare const $: any;
declare const uuidv4: any;
declare const Shepherd: any;
declare const Cookies: any;

@Component({
  selector: 'app-hr-board',
  templateUrl: './hr-board.component.html',
  styleUrls: ['./hr-board.component.scss'],
  animations: [slideInAnimation],
})
export class HrBoardComponent implements OnInit {
  i = 0;
  name = '';

  videoArr: {
    pth: string[];
    data: GetSharedVideoTutorialsResponse['paths'][number];
  }[];
  currentVideo: GetSharedVideoTutorialsResponse['paths'][number] = null;

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) {}

  async ngOnInit() {
    try {
      const data = await API.getMeInfoHr();
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
    } catch (exp) {
      Utils.showAlert(
        AlertTypes.ERROR,
        'Loading data',
        Utils.getErrorMessage(exp),
      );
    }

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

  startTour() {
    const stepsArr = [
      {
        target: '#aside > div > div.navbar',
        content:
          'Welcome to Hiroo. Let me show you the basics how to use our website.',
      },
      {
        target: '#content > app-hr-index > div > div > div > button',
        content:
          'Use this button to create your first interview. Our website provides many more advanced features but this is great start if you want to create your first interview as fast as possible.',
      },
      {
        target: '#content > app-hr-index > div > div > div > div',
        content:
          'This calendar shows you all started interviews. No worries, you can add interviews into calendar of your choice (google, apple, outlook, ...)',
      },

      {
        target: '#header > div > ul > li.nav-item.d-md-block > label',
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
          'First of all, there is "Job Position" section. In there you can create job position formilars. Formulars consists of configuration for each question and answer. You can imagine this as "Google Formular".',
      },
      {
        target: '#aside > div > div.flex.scrollable.hover',
        content:
          'Secondly, you can find "Emails" section. Every interview needs emails asigned to it because we automatically send emails to candidate, such as registration email, email when interview starts ends or even remind emails. You can configure all of these emails in this section. You can imagine this as "MailChimp"',
      },
      {
        target: '#aside > div > div.flex.scrollable.hover',
        content:
          'Lastly, we have "Interview" section. This is place where you create an interview and put everything together. When creatig interview you configure dates, specify which job position to use, which emails to send and start an interview. Also, you can test interview before starting it.',
      },
      {
        target: '#aside > div > div.flex.scrollable.hover',
        content:
          'Please dont forget about "Fast Interview" which can help you to create interview within few mintues without having to configure anything. Of course, if you need to, you can edit anything after importing from fast interview.',
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

  getCurrentVideoUrl() {
    if (!this.currentVideo) {
      return null;
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + this.currentVideo.video,
    );
  }

  onOpenCurrentVideo() {
    $('#myModal').modal();
  }

  logout() {
    this.auth.setHrKey('NOT LOGGED');
    this.router.navigate(['/hr-login']);
    this.auth.setDarkTheme();
  }

  onContactClick() {
    Swal.fire({
      type: 'info',
      title: 'Contact',
      html:
        '<br><p>Tel.: <strong> +421 48 618 600 </strong> </p><br><p>Email: <strong> denis@hiroo.eu </strong> </p>',
    });
  }

  onNonstopInterviewClick() {
    Swal.fire({
      type: 'info',
      title: 'Nonstop Interview',
      html:
        '<br><p> Create interview without setting strict dates. Recieve candidate response anytime.<br><b>Coming soon ...</b> </p>',
    });
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
