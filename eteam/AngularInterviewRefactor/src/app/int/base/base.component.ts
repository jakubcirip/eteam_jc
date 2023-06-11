import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { InterviewService, InterviewType } from 'src/app/interview.service';
import { environment } from 'src/environments/environment';
import { __ } from 'src/app/utils.service';
import { AssistentService } from 'src/app/assistent.service';
import { CamService } from 'src/app/hardware/cam.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

export enum StepTypes {
  INTERVIEW_QUESTION_IMAGE,
  SELF_REVIEW,
  TEXT,
  INPUT,
  SELECT_ONE,
  HARDWARE_TEXT,
  SUMMARY,
  INTERVIEW_ANSWER_TEXT,
  INTERVIEW_ANSWER_SPEAK,
  INTERVIEW_ANSWER_SELECT_ONE,
  INTERVIEW_ANSWER_SELECT_MANY,
  INTERVIEW_QUESTION_MP4,
  INTERVIEW_QUESTION_MP3,
}

export enum ValidateTypes {
  NONE,
  EMAIL,
  PHONE_NUMBER,
}

export interface Step {
  id: string;
  type: StepTypes;
  emoji: string;
  emojiMp3: string;
  emojiCallback?: () => void;
  startCallback?: () => void;
  emojiTimerStart?: () => void;
  emojiTimer: boolean;
  emojiAddationalTime?: number;
  data: any;
  validator: () => Promise<boolean>;
}

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {
  static i: BaseComponent;

  steps: Step[] = [];
  currentPage = 0;
  DOMstrings: any = {};

  stepTypes = StepTypes;

  currentStepId;

  constructor(
    public int: InterviewService,
    private assistent: AssistentService,
    private cam: CamService,
    private router: Router,
    private localize: LocalizeRouterService,
  ) {
    BaseComponent.i = this;
  }

  ngOnInit() {
    if (this.int.steps.getValue().length > 0) {
      this.steps = this.int.steps.getValue();
      this.afterStepsInit();
    }
    this.int.steps.subscribe((newSteps) => {
      setTimeout(() => {
        this.steps = newSteps;
        this.afterStepsInit();
      }, 1);
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.currentPage = 0;
      }
    });
  }

  async afterStepsInit() {
    if (this.steps.length === 0) {
      return;
    }

    setTimeout(() => {
      this.afterStepsViewInit();
    }, 1);
  }

  onToggleStickyPreview(val: boolean) {
    this.int.setStickyHardware(val, this.cam);
  }

  getProgressPercentage(current: number, total: number) {
    return Math.max(5, Math.ceil((current / total) * 100));
  }

  async afterStepsViewInit() {
    const color = this.int.serverData.color;
    const colorObj = {
      blue: 'color-3',
      red: 'color-5',
      purple: 'color-4',
      orange: 'color-2',
    };
    const cssFile = colorObj[color];

    const getImageUrl = (data: string) => {
      if (data.startsWith('apiurl:')) {
        return environment.api + '/public/backgrounds/' + data.substring(7);
      } else if (data.startsWith('externalUrl:')) {
        return data.substring(12);
      } else if (data.startsWith('customImage:')) {
        return data.substring(12);
      }

      return data;
    };

    this.setActiveStyleSheet(cssFile);
    this.int.isDark ? this.setDark() : this.setLight();
    this.setImage(getImageUrl(this.int.serverData.image));

    $('#isJsActive0').addClass('js-active');

    let stepsClassesI = 0;
    $('.progress-items-holder')
      .children('li')
      .each((el) => {
        if (stepsClassesI === 0) {
          $(el).addClass('current');
        }

        if (stepsClassesI >= this.steps.length - 1) {
          $(el).addClass('last');
        }
        stepsClassesI++;
      });

    await new Promise((res, rej) => {
      setTimeout(() => {
        res();
      }, 1);
    });

    const stepsLength = this.steps.length;
    let i = 0;
    $('.multisteps-form__progress')
      .children()
      .each(function () {
        if (i === 0) {
          $(this).addClass('current');
        }

        if (i >= stepsLength - 1) {
          $(this).addClass('last');
        }

        i++;
      });

    // Select Dropdown
    $('html').on('click', () => {
      $('.select .dropdown').hide();
    });
    $('.select').on('click', (event) => {
      event.stopPropagation();
    });
    $('.select .select-control').on('click', function () {
      $(this).parent().next().toggle();
    });
    $('.select .dropdown li').on('click', function () {
      $(this).parent().toggle();
      const text = $(this).attr('rel');
      $(this).parent().prev().find('div').text(text);
    });

    if (this.steps[0].emoji) {
      this.assistent.setEmoji(this.steps[0]);
    } else {
      this.assistent.clearEmoji();
    }

    // date picker
    $('.datepicker').datepicker({
      clearBtn: true,
      format: 'dd/mm/yyyy',
    });

    $('.step-box-content ').on('click', function () {
      $('.step-box-content').removeClass('active');
      $(this).addClass('active');
    });

    $('input[type=checkbox]').click(function () {
      this.stopPropagation();
      return true;
    });

    $('.plan-icon-text').on('click', function () {
      $(this).find('input[type=radio]').prop('checked', true);
      $('.plan-icon-text').removeClass('active');
      $(this).addClass('active');
    });

    // multi form ===================================
    // DOM elements
    this.DOMstrings = {
      stepsBtnClass: 'multisteps-form__progress-btn',
      stepsBtns: document.querySelectorAll(`.multisteps-form__progress-btn`),
      stepsBar: document.querySelector('.multisteps-form__progress'),
      stepsForm: document.querySelector('.multisteps-form__form'),
      stepFormPanelClass: 'multisteps-form__panel',
      stepFormPanels: document.querySelectorAll('.multisteps-form__panel'),
      stepPrevBtnClass: 'js-btn-prev',
      stepNextBtnClass: 'js-btn-next',
    };

    // STEPS BAR CLICK FUNCTION
    this.DOMstrings.stepsBar.addEventListener('click', (e) => {
      // check if click target is a step button
      const eventTarget: any = e.target;

      if (!eventTarget.classList.contains(`${this.DOMstrings.stepsBtnClass}`)) {
        return;
      }

      // get active button step number
      const activeStep = this.getActiveStep(eventTarget);

      // set all steps before clicked (and clicked too) to active
      // setActiveStep(activeStep);

      // open active panel
      // setActivePanel(activeStep);
    });

    // PREV/NEXT BTNS CLICK
    this.DOMstrings.stepsForm.addEventListener('click', async (e) => {
      const eventTarget: any = e.target;

      // check if we clicked on `PREV` or NEXT` buttons
      if (
        !(
          eventTarget.classList.contains(
            `${this.DOMstrings.stepPrevBtnClass}`,
          ) ||
          eventTarget.classList.contains(`${this.DOMstrings.stepNextBtnClass}`)
        )
      ) {
        return;
      }

      // set active step and active panel onclick
      if (
        eventTarget.classList.contains(`${this.DOMstrings.stepPrevBtnClass}`)
      ) {
        this.goLeft();
      } else if (
        eventTarget.classList.contains(`${this.DOMstrings.stepNextBtnClass}`)
      ) {
        this.goRight();
      }
    });

    // SETTING PROPER FORM HEIGHT ONLOAD
    window.addEventListener(
      'load',
      () => {
        this.setFormHeight();
      },
      true,
    );

    // SETTING PROPER FORM HEIGHT ONRESIZE
    window.addEventListener(
      'resize',
      () => {
        this.setFormHeight();
      },
      true,
    );

    window.addEventListener('keydown', (event) => {
      const e: any = event || window.event;
      const target: any = e.target || e.srcElement;

      if (
        target.tagName.toUpperCase() === 'INPUT' ||
        target.tagName.toUpperCase() === 'TEXTAREA'
      ) {
        return;
      }

      if (e.keyCode === 37) {
        this.goLeft();
      } else if (e.keyCode === 39) {
        this.goRight();
      }
    });
  }

  setActiveStyleSheet(title) {
    let i;
    let a;

    // tslint:disable-next-line:no-conditional-assignment
    for (i = 0; (a = document.getElementsByTagName('link')[i]); i++) {
      if (
        a.getAttribute('rel').indexOf('style') !== -1 &&
        a.getAttribute('title')
      ) {
        a.disabled = true;
        if (a.getAttribute('title') === title) {
          a.disabled = false;
        }
      }
    }
  }

  setImage(img) {
    $('.custom-img').css('background-image', `url('` + img + `')`);
  }

  setDark() {
    $('body').addClass('dark-version');
  }

  setLight() {
    $('body').removeClass('dark-version');
  }

  removeClasses(elemSet, className) {
    elemSet.forEach((elem) => {
      elem.classList.remove(className);
    });
  }

  findParent(elem, parentClass) {
    let currentNode = elem;

    while (!currentNode.classList.contains(parentClass)) {
      currentNode = currentNode.parentNode;
    }

    return currentNode;
  }

  formHeight(activePanel) {
    const activePanelHeight = activePanel.offsetHeight;

    this.DOMstrings.stepsForm.style.height = `${activePanelHeight}px`;
  }

  setFormHeight() {
    const activePanel = this.getActivePanel();

    this.formHeight(activePanel);
  }

  setActivePanel(activePanelNum) {
    const animation = $(this.DOMstrings.stepFormPanels, 'js-active').attr(
      'data-animation',
    );

    // remove active class from all the panels
    this.removeClasses(this.DOMstrings.stepFormPanels, 'js-active');
    this.removeClasses(this.DOMstrings.stepFormPanels, animation);
    this.removeClasses(this.DOMstrings.stepFormPanels, 'animate__animated');

    // show active panel
    this.DOMstrings.stepFormPanels.forEach((elem, index) => {
      if (index === activePanelNum) {
        elem.classList.add('js-active');
        // stepFormPanels
        elem.classList.add('animate__animated', animation);

        setTimeout(() => {
          this.removeClasses(
            this.DOMstrings.stepFormPanels,
            'animate__animated',
            // animation,
          );
        }, 1200);

        // setFormHeight(elem);
        this.setFormHeight();
      }
    });
  }

  getActiveStep(elem) {
    return Array.from(this.DOMstrings.stepsBtns).indexOf(elem);
  }

  setActiveStep(activeStepNum) {
    this.removeClasses(this.DOMstrings.stepsBtns, 'js-active');
    this.removeClasses(this.DOMstrings.stepsBtns, 'current');

    this.DOMstrings.stepsBtns.forEach((elem, index) => {
      if (index <= activeStepNum) {
        elem.classList.add('js-active');
        $(elem).addClass(index);
      }

      if (index === activeStepNum) {
        elem.classList.add('current');
      }
    });
  }

  getActivePanel() {
    let activePanel;

    this.DOMstrings.stepFormPanels.forEach((elem) => {
      if (elem.classList.contains('js-active')) {
        activePanel = elem;
      }
    });

    return activePanel;
  }

  async goLeft() {
    if (this.currentPage > 0) {
      this.currentPage--;

      if (this.steps[this.currentPage].emoji) {
        this.assistent.setEmoji(this.steps[this.currentPage]);
      } else {
        this.assistent.clearEmoji();
      }

      this.setActiveStep(this.currentPage);
      this.setActivePanel(this.currentPage);
    }

    this.currentStepId = this.steps[this.currentPage].id;

    window.scroll({
      top: 0,
      left: 0,
    });
  }

  async goRight() {
    const currentStep = this.steps[this.currentPage];

    if (!currentStep) {
      return;
    }

    if (this.currentPage >= this.steps.length - 1) {
      const path = this.router.url;

      const pathArr = path.split('/'); // /en/interview/setup
      pathArr.shift();
      pathArr.shift();
      // interview, setup

      if (path.length >= 2) {
        if (pathArr[0] === 'interview') {
          if (pathArr[1] === 'setup') {
            const translatedPath: any = this.localize.translateRoute(
              '/interview/start',
            );
            this.router.navigate([translatedPath]);
          } else if (pathArr[1] === 'start') {
            // alert('Finished');
          }
        }
      }

      return;
    }

    const form = $('#' + currentStep.id);
    let canContinue = true;

    if (form && form.length > 0) {
      form.validate();
      canContinue = form.valid();
    }

    if (canContinue) {
      const validator = this.steps[this.currentPage].validator;
      if (validator) {
        canContinue = await validator();
      }

      if (!canContinue) {
        Swal.fire(
          __('wrapper.validator.errorPopuptitle.title'),
          __('wrapper.validator.errorPopuptitle.text'),
          'error',
        );
      }
    }

    if (canContinue) {
      this.currentPage++;

      if (this.steps[this.currentPage].emoji) {
        this.assistent.setEmoji(this.steps[this.currentPage]);
      } else {
        this.assistent.clearEmoji();
      }

      this.setActiveStep(this.currentPage);
      this.setActivePanel(this.currentPage);
    }

    this.currentStepId = this.steps[this.currentPage].id;

    window.scroll({
      top: 0,
      left: 0,
    });
  }
}
