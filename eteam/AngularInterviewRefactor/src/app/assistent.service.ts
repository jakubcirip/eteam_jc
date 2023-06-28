import { Injectable } from '@angular/core';
import API, { InterviewEmoji } from './services/API';
import { Step } from './int/base/base.component';

export interface Text {
  text: string;
  emoji: InterviewEmoji;
  cb: any;
}

@Injectable({
  providedIn: 'root',
})
export class AssistentService {
  apiData: InterviewEmoji[] = [];

  currentEmojiImages: string[] = [];
  currentEmojiIndex = 0;
  currentEmojiMp3 = null;
  didRequestEmoji = true;
  isFirstMp3 = true;

  emojiTimerInt = null;
  emojiTimerPerc = 0;

  loopFrame = null;
  isSecondStep = 0;

  isPlaying = false;
  didSkip = false;
  currentStep = null;

  private emojiSrc = '';

  constructor() {}

  getEmojiSrc(): string {
    this.didRequestEmoji = true;

    if (!this.emojiSrc) {
      return null;
    }

    return 'data:image/png;base64,' + this.emojiSrc;
  }

  async loadEmojis() {
    if (this.apiData.length === 0) {
      this.apiData = (await API.getEmojis()).emojis;
      this.startAnimation();
    }
  }

  startAnimation() {
    if (!this.loopFrame) {
      this.loopFrame = requestAnimationFrame(this.step.bind(this));
    }
  }

  step() {
    this.isSecondStep++;
    if (this.isSecondStep % 2 === 0) {
      this.emojiStep();
    }

    this.loopFrame = requestAnimationFrame(this.step.bind(this));
  }

  emojiStep() {
    if (this.didRequestEmoji === false) {
      return;
    }

    this.didRequestEmoji = false;

    if (this.currentEmojiImages.length === 0) {
      return;
    }

    if (!this.currentEmojiImages[this.currentEmojiIndex]) {
      this.currentEmojiIndex = 0;
    }

    this.emojiSrc = this.currentEmojiImages[this.currentEmojiIndex];
    this.currentEmojiIndex++;
  }

  async registerEmojiMp3(mp3Path: string) {
    return new Promise((res, rej) => {
      if (createjs.Sound.loadComplete(mp3Path)) {
        res();
        return;
      }
      let didRes = false;

      setTimeout(() => {
        if (!didRes) {
          console.log('Not loaded', mp3Path);
          res();
        }
      }, 5000);

      if (mp3Path) {
        createjs.Sound.on(
          'fileload',
          (event) => {
            if (event.id === mp3Path) {
              didRes = true;
              res();
            }
          },
          this,
        );
        createjs.Sound.registerSound(mp3Path, mp3Path);
      } else {
        didRes = true;
        res();
      }
    });
  }

  skipCurrentText() {
    if (this.isPlaying && this.currentStep) {
      this.didSkip = true;

      this.emojiTimerPerc = 100;

      if (this.currentEmojiMp3) {
        try {
          this.currentEmojiMp3.stop();
          this.currentEmojiMp3.destroy();
        } catch (err) {
          // no problem, it was stopped on some tick somewhere else
        }
      }

      if (this.currentStep.emojiTimerStart) {
        this.currentStep.emojiTimerStart();
      }

      if (this.currentStep.emojiCallback) {
        this.currentStep.emojiCallback();
      }

      this.isPlaying = false;
    }
  }

  setEmoji(step: any) {
    const imagesData = this.apiData.find((e) => e.name === step.emoji);
    if (imagesData) {
      this.currentStep = step;
      if (step.startCallback) {
        step.startCallback();
      }

      if (step.data && step.data.title === 'NULL') {
        if (step.emojiTimerStart) {
          step.emojiTimerStart();
        }

        if (step.emojiCallback) {
          setTimeout(() => {
            this.isPlaying = false;
            this.currentStep = null;
            step.emojiCallback();
          }, 150);
        }

        return;
      }

      this.currentEmojiImages = imagesData.images;
      this.currentEmojiIndex = 0;
      if (step.emojiMp3) {
        if (this.currentEmojiMp3) {
          try {
            this.currentEmojiMp3.stop();
            this.currentEmojiMp3.destroy();
          } catch (err) {
            // no problem, it was stopped on some tick somewhere else
          }
        }

        let i = 0;
        const int = setInterval(() => {
          i++;
          if (i > 25) {
            clearInterval(int);
            return;
          }

          if (createjs.Sound.loadComplete(step.emojiMp3)) {
            clearInterval(int);
            this.emojiTimerPerc = 0;
            if (this.isFirstMp3) {
              this.isFirstMp3 = false;
              this.currentEmojiMp3 = createjs.Sound.play(step.emojiMp3);
            } else {
              this.currentEmojiMp3 = createjs.Sound.play(step.emojiMp3);
            }

            this.isPlaying = true;
            this.didSkip = false;

            this.currentEmojiMp3.on('complete', () => {
              if (this.didSkip) {
                return;
              }

              if (step.emojiTimerStart) {
                step.emojiTimerStart();
              }

              if (step.emojiTimer) {
                const totalLength = this.currentEmojiMp3.duration / 1000;
                let timerLength = totalLength * 0.5;

                if (step.emojiAddationalTime) {
                  timerLength += step.emojiAddationalTime;
                }

                let stepLength = 0;

                this.emojiTimerPerc = 0;
                if (this.emojiTimerInt) {
                  clearInterval(this.emojiTimerInt);
                }

                this.emojiTimerInt = setInterval(() => {
                  if (this.didSkip) {
                    clearInterval(this.emojiTimerInt);
                    return;
                  }

                  stepLength += 0.02;
                  this.emojiTimerPerc = (stepLength / timerLength) * 100;

                  if (stepLength >= timerLength) {
                    this.emojiTimerPerc = 100;
                    if (step.emojiCallback) {
                      setTimeout(() => {
                        this.isPlaying = false;
                        this.currentStep = null;
                        step.emojiCallback();
                      }, 1000);
                    }

                    if (this.emojiTimerInt) {
                      clearInterval(this.emojiTimerInt);
                    }
                  }
                }, 20);
              } else {
                if (step.emojiCallback) {
                  setTimeout(() => {
                    this.isPlaying = false;
                    this.currentStep = null;
                    step.emojiCallback();
                  }, 1000);
                }
              }
            });

            return;
          }
        }, 300);
      }
    }
  }

  clearEmoji() {
    this.currentEmojiIndex = 0;
    this.currentEmojiImages = [];
    this.emojiSrc = '';
  }
}
