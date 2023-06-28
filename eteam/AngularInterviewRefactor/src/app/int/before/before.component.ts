import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Step, StepTypes, ValidateTypes } from '../base/base.component';
import { InterviewService, InterviewType } from 'src/app/interview.service';
import { __ } from 'src/app/utils.service';

@Component({
  selector: 'app-before',
  templateUrl: './before.component.html',
  styleUrls: ['./before.component.scss'],
})
export class BeforeComponent implements OnInit {
  steps: Step[] = [
    {
      validator: async () => true,
      id: 'page0',
      type: StepTypes.TEXT,
      emojiTimer: false,
      emojiCallback: () => {},
      emoji: '34_Hello!',
      emojiMp3: '/assets/tts/en/' + 'emojiIntroduction_title' + '.mp3',
      data: {
        title: __('emojiIntroduction.title'),
        text: null,
        terms: {
          url: null,
          text: null,
        },
      },
    },
    {
      validator: async () => true,
      id: 'page1',
      type: StepTypes.TEXT,
      emojiTimer: false,
      emojiCallback: () => {},
      emoji: '05_Happy',
      emojiMp3: '/assets/tts/en/' + 'prelog_title' + '.mp3',
      data: {
        title: __('prelog.title'),
        text: '...',
        terms: {
          url: null,
          text: null,
        },
      },
    },
    {
      validator: async () => true,
      id: 'page2',
      type: StepTypes.INPUT,
      emojiTimer: false,
      emojiCallback: () => {},
      emoji: '13_Breathe',
      emojiMp3: '/assets/tts/en/' + 'formular_title' + '.mp3',
      data: {
        title: __('formular.title'),
        text: __('formular.text'),
        terms: {
          url:
            'https://gdpr.eu/wp-content/uploads/2019/01/Our-Company-Privacy-Policy.pdf',
          text: __('formular.terms.text'),
        },
        inputs: [
          {
            id: 'name',
            // value: 'Matej',
            value: '',
            placeholder: __('formular.inputs.name.placeholder'),
            type: 'text',
            required: true,
            minLength: 3,
            maxLength: 100,
            validateType: ValidateTypes.NONE,
            onChange: (val) => {
              this.int.name = val;
              this.int.dataChangeSubject.next();
            },
          },
          {
            id: 'surname',
            // value: 'Baco',
            value: '',
            placeholder: __('formular.inputs.surname.placeholder'),
            type: 'text',
            required: true,
            minLength: 3,
            maxLength: 100,
            validateType: ValidateTypes.NONE,
            onChange: (val) => {
              this.int.surname = val;
              this.int.dataChangeSubject.next();
            },
          },
          {
            id: 'email',
            // value: 'matejbacocom@gmail.com',
            value: '',
            placeholder: __('formular.inputs.email.placeholder'),
            type: 'email',
            required: true,
            minLength: 3,
            maxLength: 100,
            validateType: ValidateTypes.EMAIL,
            onChange: (val) => {
              this.int.email = val;
              this.int.dataChangeSubject.next();
            },
          },
          {
            id: 'phone',
            // value: '+421 919 178 798',
            value: '',
            placeholder: __('formular.inputs.phone.placeholder'),
            type: 'text',
            required: true,
            minLength: 3,
            maxLength: 100,
            validateType: ValidateTypes.PHONE_NUMBER,
            onChange: (val) => {
              this.int.phone = val;
              this.int.dataChangeSubject.next();
            },
          },
          {
            id: 'nickname',
            // value: 'Meldiron',
            value: '',
            placeholder: __('formular.inputs.nickname.placeholder'),
            type: 'text',
            required: true,
            minLength: 3,
            maxLength: 100,
            validateType: ValidateTypes.NONE,
            onChange: (val) => {
              this.int.nickname = val;
              this.int.dataChangeSubject.next();
            },
          },
        ],
      },
    },
    {
      validator: async () => true,
      id: 'page3',
      type: StepTypes.SELECT_ONE,
      emojiTimer: false,
      emojiCallback: () => {},
      emoji: '22_Cool',
      emojiMp3: '/assets/tts/en/' + 'hardware_title' + '.mp3',
      data: {
        title: __('hardware.title'),
        text: __('hardware.text'),
        terms: {
          url: null,
          text: null,
        },
        options: [
          {
            id: 'hardware',
            text: 'Camera',
            value: 'cam',
            recommended: true,
            selected: false,
            icon: 'fa-camera',
            onSelect: () => {
              this.int.interviewType = InterviewType.CAM;
              this.int.dataChangeSubject.next();
            },
          },
          {
            id: 'hardware',
            text: 'Microphone',
            value: 'mic',
            recommended: false,
            selected: false,
            icon: 'fa-microphone',
            onSelect: () => {
              this.int.interviewType = InterviewType.MIC;
              this.int.dataChangeSubject.next();
            },
          },
        ],
      },
    },
    {
      id: 'page4',
      type: StepTypes.HARDWARE_TEXT,
      emojiTimer: false,
      emojiCallback: () => {},
      emoji: '11_Wink',
      emojiMp3: '/assets/tts/en/' + 'hardwareTest_title' + '.mp3',
      data: {
        title: __('hardwareTest.title'),
        terms: {
          url: null,
          text: null,
        },
      },
      validator: async () => {
        return this.int.isHardwareWorking;
      },
    },
    {
      validator: async () => true,
      id: 'page5',
      type: StepTypes.SUMMARY,
      emojiTimer: false,
      emojiCallback: () => {},
      emoji: '01_Amazed',
      emojiMp3: '/assets/tts/en/' + 'introSummary_title' + '.mp3',
      data: {
        title: __('introSummary.title'),
      },
    },
  ];

  constructor(private int: InterviewService) {}

  ngOnInit(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    this.steps[1].data.text = this.int.serverData.prelog
      .split('\n')
      .join('<br />');

    this.int.steps.next(this.steps);
    this.int.showButtonNext = true;
    this.int.showButtonPrevious = true;
  }
}
