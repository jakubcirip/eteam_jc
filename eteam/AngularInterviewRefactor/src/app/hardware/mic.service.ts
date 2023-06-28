import { Injectable } from '@angular/core';
import { InterviewService } from '../interview.service';
import { __ } from '../utils.service';

declare const MediaRecorder: any;

@Injectable({
  providedIn: 'root',
})
export class MicService {
  stream;
  mediaRecorder;
  audioChunks: any = [];

  // volume is 0-100
  previewData = {
    volume: 0,
  };

  constructor(private int: InterviewService) {}

  async init() {
    try {
      await Swal.fire({
        icon: 'info',
        title: __('micService.accessPopup.title'),
        text: __('micService.accessPopup.text'),
        footer: __('micService.accessPopup.footer'),
      });

      Swal.fire({
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      this.stream = stream;

      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024;

      microphone.connect(analyser);
      analyser.connect(javascriptNode);
      javascriptNode.connect(audioContext.destination);
      javascriptNode.onaudioprocess = () => {
        const array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        let values = 0;

        const length = array.length;
        for (let i = 0; i < length; i++) {
          values += array[i];
        }

        const average = values / length;

        this.previewData.volume = Math.round(average);
      };

      Swal.fire({
        icon: 'success',
        title: __('micService.accessSuccessPopup.title'),
        text: __('micService.accessSuccessPopup.text'),
        footer: __('micService.accessSuccessPopup.footer'),
      });

      this.int.isHardwareWorking = true;
      this.int.dataChangeSubject.next();
    } catch (err) {
      console.log(err);
      await Swal.fire({
        icon: 'error',
        title: __('micService.accessErrorPopup.title'),
        text: __('micService.accessErrorPopup.text'),
        footer: __('micService.accessErrorPopup.footer'),
      });
    }
  }

  startRecording() {
    try {

      if (this.mediaRecorder) {
        this.mediaRecorder.stop();
      }
    } catch(err) {
// its okay, already stopped
    }

    this.mediaRecorder = new MediaRecorder(this.stream);

    this.audioChunks = [];

    this.mediaRecorder.addEventListener('dataavailable', (event) => {
      this.audioChunks.push(event.data);
    });

    this.mediaRecorder.start();
  }

  stopRecording(): Promise<string> {
    return new Promise((res, rej) => {
      this.mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(this.audioChunks, {
          type: 'audio/mp3',
        });

        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result as string;
          res(base64data);
        };
        reader.readAsDataURL(audioBlob);
      });
      this.mediaRecorder.stop();
    });
  }
}
