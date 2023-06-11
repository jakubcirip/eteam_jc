import { Component, OnInit, OnDestroy } from '@angular/core';
import API, {
  Mp4Array,
  HrCanEditMp3Response,
  HrCanEditMp4Response,
} from 'src/services/API';
import { Router } from '@angular/router';
import { Utils } from 'src/services/Utils';
import { SocketService } from '../socket.service';
import { Subscription } from 'rxjs';

declare var Swal: any;
declare var MediaRecorder: any;
declare const window: any;

@Component({
  selector: 'app-hr-fm-mp4',
  templateUrl: './hr-fm-mp4.component.html',
  styleUrls: ['./hr-fm-mp4.component.scss'],
})
export class HrFmMp4Component implements OnInit, OnDestroy {
  files: Mp4Array = null;

  stream: any;

  socketType = 'mp4List';
  sub: Subscription;

  constructor(private router: Router, private socket: SocketService) {}

  async ngOnInit() {
    await this.reloadList();

    this.sub = this.socket.onChange.subscribe((type) => {
      if (type === this.socketType) {
        this.reloadList();
      }
    });
  }

  async ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  async reloadList() {
    this.files = await API.getMp4();
  }

  newFile() {
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2'],
    })
      .queue([
        {
          title: 'Enter Resource Name',
          text: 'This will be used as a name on website',
          inputValidator: (value) => {
            return new Promise((resolve) => {
              if (value) {
                resolve();
              } else {
                resolve('Resource Name is required');
              }
            });
          },
        },
        {
          title: 'Select Upload Method',
          input: 'select',
          inputOptions: {
            file: 'File From Disk',
            record: 'Record Using Camera',
          },
          inputPlaceholder: 'Select Method',
          inputValidator: (value) => {
            return new Promise((resolve) => {
              if (value) {
                resolve();
              } else {
                resolve('You need to select upload method');
              }
            });
          },
        },
      ])
      .then(async (result) => {
        if (result.value) {
          const name = result.value[0];
          const method = result.value[1];

          if (method === 'file') {
            const { value: file } = await Swal.fire({
              title: 'Select MP4 File',
              input: 'file',
              inputAttributes: {
                accept: 'video/mp4,video/*;capture=camera',
                'aria-label': 'Upload your MP4 File',
              },
            });

            if (file) {
              const reader = new FileReader();
              reader.onload = async (e: any) => {
                const data = e.target.result;

                await Utils.sendRequest(
                  'File Upload',
                  API.uploadMp4(
                    {},
                    {
                      name,
                      source: data,
                    },
                  ),
                );

                this.socket.change(this.socketType);
                this.reloadList();
              };
              reader.readAsDataURL(file);
            }
          } else {
            this.stopRecording();

            Swal.fire({
              title: 'Record Camera',
              text:
                'Allow website to use camera and microphone. We wont start recording until you press "Start Recording" button. You can delete and record new mp4 at anytime.',
            });

            if (!navigator.mediaDevices.getUserMedia) {
              Swal.fire({
                type: 'error',
                title: 'Record Camera',
                text:
                  'Recording failed, your browser doesnt support some features. Google Chrome is tested and should work properly.',
              });
            }

            navigator.mediaDevices
              .getUserMedia({ audio: true, video: true })
              .then((stream) => {
                this.stream = stream;
                Swal.fire({
                  title: 'Record Camera',
                  text:
                    'Camera is ready, you can start recording. After you click "Start Recording" you will have 6 seconds to prepare.',
                  confirmButtonText: 'Start Recording',
                }).then((res) => {
                  if (res.value) {
                    let timerInterval;
                    Swal.fire({
                      title: 'Record Camera',
                      html:
                        'Recording will start in <strong></strong> seconds.',
                      timer: 6000,
                      onBeforeOpen: () => {
                        Swal.showLoading();
                        timerInterval = setInterval(() => {
                          Swal.getContent().querySelector(
                            'strong',
                          ).textContent = Math.ceil(Swal.getTimerLeft() / 1000);
                        }, 100);
                      },
                      onClose: () => {
                        clearInterval(timerInterval);
                      },
                      allowOutsideClick: false,
                    }).then(() => {
                      const mediaRecorder = new MediaRecorder(stream);

                      const audioChunks = [];

                      mediaRecorder.addEventListener(
                        'dataavailable',
                        (event) => {
                          audioChunks.push(event.data);
                        },
                      );

                      mediaRecorder.addEventListener('stop', () => {
                        const audioBlob = new Blob(audioChunks, {
                          type: 'video/mp4',
                        });

                        const reader = new FileReader();
                        reader.readAsDataURL(audioBlob);
                        reader.onloadend = async () => {
                          const base64data = reader.result;

                          await Utils.sendRequest(
                            'File Upload (Camera)',
                            API.uploadMp4(
                              {},
                              {
                                name,
                                source: base64data.toString(),
                              },
                            ),
                          );

                          this.socket.change(this.socketType);
                          this.reloadList();
                        };
                      });

                      mediaRecorder.start();

                      setTimeout(() => {
                        const canvas: any = document.getElementById(
                          'camrecord_canvas',
                        );
                        const ctx = canvas.getContext('2d');

                        const width = canvas.width;
                        const height = canvas.height;

                        const video: any = document.createElement('video');
                        video.setAttribute('autoplay', true);
                        window.vid = video;

                        let loopFrame;

                        const loop = () => {
                          if (!this.stream) {
                            return;
                          }

                          loopFrame = requestAnimationFrame(loop.bind(this));
                          // ctx.globalAlpha = 0.005;
                          ctx.drawImage(video, 0, 0, width, height);
                          ctx.restore();
                        };

                        const startLoop = () => {
                          loopFrame = requestAnimationFrame(loop.bind(this));
                        };

                        video.addEventListener('loadedmetadata', () => {
                          startLoop();
                        });

                        const newStream = new MediaStream(
                          stream.getVideoTracks(),
                        );
                        video.srcObject = newStream;
                        video.play();
                      }, 100);

                      Swal.fire({
                        title: 'Record Camera',
                        html:
                          '<canvas id="camrecord_canvas" width="640" height="480" style="width: 100%;"></canvas> <br><br>Recording Started. Press "Stop" to stop recording.',
                        showConfirmButton: false,
                        showCancelButton: true,
                        cancelButtonText: 'Stop',
                      }).then(() => {
                        mediaRecorder.stop();
                        this.stopRecording();
                        stream = null;
                      });
                    });
                  }
                });
              })
              .catch(() => {
                Swal.fire({
                  type: 'error',
                  title: 'Record Microphone',
                  text: 'Recording failed, you deined access to microphone',
                });
              });
          }
        }
      });
  }

  stopRecording() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
    }
  }

  async beforeEditFile(id, name) {
    let canEdit = true;
    const res: HrCanEditMp4Response = await Utils.sendRequestSilent(
      'Validate File',
      API.hrCanEditMp4(id),
    );
    console.log(id, res);
    if (res) {
      canEdit = res.canEdit;
    }

    if (canEdit) {
      this.editFile(id, name);
    } else {
      Swal.fire({
        type: 'warning',
        title: 'Validate File',
        text:
          'You cant edit file while it is being used by one or more of your active interviews. Wait for interview end please.',
      });
    }
  }

  editFile(id, name) {
    Swal.fire({
      title: 'Edit MP4 File',
      input: 'text',
      inputValue: name,
      inputPlaceholder: 'Enter new MP4 File Name',
      showCancelButton: true,
      confirmButtonText: 'Save',
      showLoaderOnConfirm: true,
      preConfirm: (newName) => {
        return API.updateMp4(id, {}, { newName })
          .then((data) => {
            return data;
          })
          .catch((err) => {
            Swal.showValidationMessage(`Whoops! ${Utils.getErrorMessage(err)}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          type: 'success',
          title: `Edit MP4 File`,
          text: result.value.message,
        });

        this.socket.change(this.socketType);
        this.reloadList();
      }
    });
  }

  async beforeDeleteFile(id) {
    let canDelete = true;
    const res: HrCanEditMp4Response = await Utils.sendRequestSilent(
      'Validate File',
      API.hrCanEditMp4(id),
    );
    console.log(id, res);
    if (res) {
      canDelete = res.canDelete;
    }

    if (canDelete) {
      this.deleteFile(id);
    } else {
      Swal.fire({
        type: 'warning',
        title: 'Validate File',
        text:
          'You cant delete file while it is being used by one or more of your formulars. Edit or delete the formular in the first place.',
      });
    }
  }

  deleteFile(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'If you delete this MP4, its permanent!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return API.deleteMp4(id)
          .then((data) => {
            return data;
          })
          .catch((err) => {
            Swal.showValidationMessage(`Whoops! ${Utils.getErrorMessage(err)}`);
          });
      },
    }).then((result) => {
      if (result.value) {
        Swal.fire('Deleted!', result.value.message, 'success');

        this.socket.change(this.socketType);
        this.reloadList();
      }
    });
  }

  goBack() {
    this.router.navigate(['/hr', 'files']);
  }
}
