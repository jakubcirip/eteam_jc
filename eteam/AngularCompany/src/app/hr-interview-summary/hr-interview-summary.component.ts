import { Component, OnInit, OnDestroy } from '@angular/core';
import API, { InterviewSummary, InterviewSummaryEmail } from 'src/services/API';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Utils } from 'src/services/Utils';
import { environment } from 'src/environments/environment';

declare const document: any;
declare const Swal: any;
declare const $: any;
declare const moment: any;
declare const ics: any;

@Component({
  selector: 'app-hr-interview-summary',
  templateUrl: './hr-interview-summary.component.html',
  styleUrls: ['./hr-interview-summary.component.scss'],
})
export class HrInterviewSummaryComponent implements OnInit, OnDestroy {
  sub: Subscription;
  intId: number;
  data: InterviewSummary = null;

  selectedMail: InterviewSummaryEmail = null;
  selectedMailContent: string = null;
  selectedMailSubject: string = null;

  interviewUrl;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.interviewUrl = environment.interview;
  }

  async ngOnInit() {
    this.sub = this.route.params.subscribe((newParams) => {
      this.intId = +newParams.intId;
      this.reloadSummary();
    });
  }

  async ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  async reloadSummary() {
    this.data = await API.getHrInterviewSummary(this.intId.toString());
  }

  async onStartInterview() {
    if (!this.data || !this.data.warnings || !this.data.warnings.length) {
      Swal.fire(
        'Start interview',
        'Please resolve all warning before starting interview.',
        'warning',
      );
    }

    if (
      this.data.warnings.length > 0 &&
      this.data.warnings[0].type === 'success'
    ) {
      const res = await Utils.sendRequest(
        'Start interview',
        API.startHrInterview(this.intId.toString()),
      );

      if (res) {
        this.router.navigate(['/hr', 'interview']);
      }

      return;
    } else {
      Swal.fire(
        'Start interview',
        'Please resolve all warning before starting interview.',
        'warning',
      );
    }
  }

  getDate(date: string): Date {
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) {
        throw new Error('Not a date');
      }
      return d;
    } catch (err) {
      return null;
    }
  }

  resizeIframe(obj) {
    obj.style.height =
      obj.contentWindow.document.documentElement.scrollHeight + 'px';
  }

  async showEmailPreview(id: number) {
    const res = await Utils.sendRequestToast(
      'Load mail content',
      API.getHrEmailPreview(id, this.intId),
    );

    this.selectedMail = this.data.emails.find((m) => m.id === id);
    this.selectedMailContent = res.content;
    this.selectedMailSubject = res.subject;

    setTimeout(() => {
      document.querySelector('#fframe').innerHTML = res.content;
    });
  }

  firstUpperCase(str: string): string {
    return str.charAt(0).toUpperCase() + str.substring(1);
  }

  goBack() {
    this.router.navigate(['/hr', 'interview']);
  }

  isEndDateValid() {
    const endMail = this.data.emails.find((m) => m.type === 'end');
    const endDate = endMail ? endMail.date : null;
    return moment(endDate).isValid();
  }

  getGogleCalendarUrl() {
    const title = this.data.interviewName;
    const desc = 'End of your Hiroo interview. Results are ready!';
    const endMail = this.data.emails.find((m) => m.type === 'end');
    const endDate = endMail ? endMail.date : null;
    const m = moment(endDate);
    const m1 = moment(endDate).add(1, 'hour');
    const endDateStr1 = m.format('YYYYMMDDTHHmmSS');
    const endDateStr2 = m1.format('YYYYMMDDTHHmmSS');
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=End of ${title}&details=${desc}&location=Hiroo&dates=${endDateStr1}/${endDateStr2}`;
    return url;
  }

  getYahooCalendarUrl() {
    const title = this.data.interviewName;
    const desc = 'End of your Hiroo interview. Results are ready!';
    const endMail = this.data.emails.find((m) => m.type === 'end');
    const endDate = endMail ? endMail.date : null;
    const m = moment(endDate);
    const m1 = moment(endDate).add(1, 'hour');
    const endDateStr1 = m.format('YYYYMMDDTHHmmSS');
    const endDateStr2 = m1.format('YYYYMMDDTHHmmSS');
    const url = `https://calendar.yahoo.com/?v=60&title=End of ${title}&st=${endDateStr1}&et=${endDateStr2}&desc=${desc}&in_loc=Hiroo`;
    return url;
  }

  getOutlookCalendarUrl() {
    const title = this.data.interviewName;
    const desc = 'End of your Hiroo interview. Results are ready!';
    const endMail = this.data.emails.find((m) => m.type === 'end');
    const endDate = endMail ? endMail.date : null;
    const m = moment(endDate);
    const m1 = moment(endDate).add(1, 'hour');
    const endDateStr1 = m.format('YYYYMMDDTHHmmSS');
    const endDateStr2 = m1.format('YYYYMMDDTHHmmSS');
    const url = `https://outlook.live.com/owa/?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=${endDateStr1}&enddt=${endDateStr2}&subject=End of ${title}&body=${desc}&location=Hiroo`;
    return url;
  }

  getFileCalendar() {
    const title = this.data.interviewName;
    const desc = 'End of your Hiroo interview. Results are ready!';
    const endMail = this.data.emails.find((m) => m.type === 'end');
    const endDate = endMail ? endMail.date : null;
    const m = moment(endDate);
    const m1 = moment(endDate).add(1, 'hour');
    const endDateStr1 = m.format('YYYYMMDDTHHmmSS');
    const endDateStr2 = m1.format('YYYYMMDDTHHmmSS');
    const cal = ics();
    cal.addEvent('End of ' + title, desc, 'Hiroo', m, m1);
    cal.download('Hiroo-Calendar-Interview');
  }

  async sendPreviewMail() {
    $('#mailModal').modal('hide');

    Swal.fire({
      title: 'Send Preview Email',
      input: 'text',
      inputValue: '',
      inputPlaceholder: 'Enter email to send it to',
      showCancelButton: true,
      confirmButtonText: 'Send Email',
    }).then(async (result) => {
      if (result.value) {
        await Utils.sendRequest(
          'Preview email',
          API.sendHrEmailPreview(
            this.selectedMail.id,
            this.intId,
            {},
            {
              reciever: result.value,
            },
          ),
        );

        Swal.fire({
          type: 'success',
          title: `Send Preview Email`,
          text: 'Preview email successfully sent to ' + result.value,
        });
      }
    });
  }

  async onGeneratePreview() {
    const swalRes = await Swal.fire({
      title: 'Preview an Interview',
      text:
        'To preview an interview, we need to send some settings into AI in order to prepare as close experience to reality as possible. To prevent spam, we only let you preview one interview in 24 hours. If you want to preview interview anyway, click button below. This action usually takes less than 1 minute may take up to 5 minutes depending on length of your interview.',
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Do not preview',
      confirmButtonText: 'Prepare Interview Preview',
    });

    if (swalRes.value) {
      const res = await Utils.sendRequest(
        'Prepare an Interview',
        API.testHrInterview(this.intId),
      );
      if (res) {
        const url =
          this.interviewUrl +
          '/en/invite/' +
          this.data.interviewTag +
          '/' +
          this.data.testUserTag +
          '?preview=true';

        await Swal.fire({
          title: 'Preview an Interview',
          html:
            '<p>Your test interview is ready. Click url below to open up the interview </p><p> <a target="blank" href=' +
            url +
            '>' +
            url +
            '</a> </p>',
          type: 'warning',
          showCancelButton: false,
        });
      }
    }
  }
}
