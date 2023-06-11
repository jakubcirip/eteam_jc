import { Injectable } from '@angular/core';
import { __ } from '../utils.service';
import { InterviewService } from '../interview.service';

@Injectable({
  providedIn: 'root',
})
export class CamService {
  stream;

  constructor(private int: InterviewService) {}

  async init() {
    await Swal.fire({
      icon: 'info',
      title: __('camService.accessPopup.title'),
      text: __('camService.accessPopup.text'),
      footer: __('camService.accessPopup.footer'),
    });

    Swal.fire({
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    const devices = await camerakit.getDevices();

    if (!devices || !devices.audio[0] || !devices.video[0]) {
      await Swal.fire({
        icon: 'error',
        title: __('camService.accessErrorPopup.title'),
        text: __('camService.accessErrorPopup.text'),
        footer: __('camService.accessErrorPopup.footer'),
      });
    }

    this.stream = await camerakit.createCaptureStream({
      audio: devices.audio[0],
      video: devices.video[0],
    });

    Swal.fire({
      icon: 'success',
      title: __('camService.accessSuccessPopup.title'),
      text: __('camService.accessSuccessPopup.text'),
      footer: __('camService.accessSuccessPopup.footer'),
    });

    this.int.isHardwareWorking = true;
    this.int.dataChangeSubject.next();
  }

  startRecording() {
    if (this.stream) {
      this.stream.recorder.start({ source: 'original' });
    }
  }

  stopRecording(): Promise<string> {
    return new Promise((res, rej) => {
      try {
        if (this.stream) {
          this.stream.recorder.stop();
          const data = this.stream.recorder.getLatestRecording();

          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result as string;
            res(base64data);
          };

          reader.readAsDataURL(data);
        }
      } catch (err) {
        rej(err);
      }
    });
  }
}
