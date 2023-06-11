import { Component, OnInit, OnDestroy } from '@angular/core';
import API, {
  Mp3Array,
  HrCanEditMp4Response,
  HrCanEditMp3Response,
} from 'src/services/API';
import { Utils } from 'src/services/Utils';
import { Router } from '@angular/router';
import { DivisionPage } from 'src/classes/DivisionPage';
import { SocketService } from '../socket.service';
import { Subscriber, Subscription } from 'rxjs';

declare var Swal: any;
declare var MediaRecorder: any;

@Component({
  selector: 'app-hr-fm-mp3',
  templateUrl: './hr-fm-mp3.component.html',
  styleUrls: ['./hr-fm-mp3.component.scss'],
})
export class HrFmMp3Component implements OnInit, OnDestroy {
  files: Mp3Array = null;

  stream;

  socketType = 'mp3List';
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
    this.files = await API.getMp3();
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
            record: 'Record Using Microphone',
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
              title: 'Select MP3 File',
              input: 'file',
              inputAttributes: {
                accept: 'audio/mp3,audio/*;capture=microphone',
                'aria-label': 'Upload your MP3 File',
              },
            });

            if (file) {
              const reader = new FileReader();
              reader.onload = async (e: any) => {
                const data = e.target.result;

                Swal.showLoading();

                await Utils.sendRequest(
                  'File Upload',
                  API.uploadMp3(
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
              title: 'Record Microphone',
              text:
                'Allow website to use microphone. We wont start recording until you press "Start Recording" button. You can delete and record new mp3 at anytime.',
            });

            if (!navigator.mediaDevices.getUserMedia) {
              Swal.fire({
                type: 'error',
                title: 'Record Microphone',
                text:
                  'Recording failed, your browser doesnt support some features. Google Chrome is tested and should work properly.',
              });
            }

            navigator.mediaDevices
              .getUserMedia({ audio: true })
              .then((stream) => {
                this.stream = stream;
                Swal.fire({
                  title: 'Record Microphone',
                  text:
                    'Microphone is ready, you can start recording. After you click "Start Recording" you will have 6 seconds to prepare.',
                  confirmButtonText: 'Start Recording',
                }).then((res) => {
                  if (res.value) {
                    let timerInterval;
                    Swal.fire({
                      title: 'Record Microphone',
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
                          type: 'audio/mp3',
                        });

                        const reader = new FileReader();
                        reader.readAsDataURL(audioBlob);
                        reader.onloadend = async () => {
                          const base64data = reader.result;

                          await Utils.sendRequest(
                            'File Upload (Microphone)',
                            API.uploadMp3(
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

                      Swal.fire({
                        title: 'Record Microphone',
                        text:
                          'Recording Started. Press "Stop" to stop recording',
                        showConfirmButton: false,
                        showCancelButton: true,
                        cancelButtonText: 'Stop',
                      }).then(() => {
                        mediaRecorder.stop();
                        this.stopRecording();
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
    const res: HrCanEditMp3Response = await Utils.sendRequestSilent(
      'Validate File',
      API.hrCanEditMp3(id),
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
      title: 'Edit MP3 File',
      input: 'text',
      inputValue: name,
      inputPlaceholder: 'Enter new MP3 File Name',
      showCancelButton: true,
      confirmButtonText: 'Save',
      showLoaderOnConfirm: true,
      preConfirm: (newName) => {
        return API.updateMp3(id, {}, { newName })
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
          title: `Edit MP3 File`,
          text: result.value.message,
        });

        this.socket.change(this.socketType);
        this.reloadList();
      }
    });
  }

  async beforeDeleteFile(id) {
    let canDelete = true;
    const res: HrCanEditMp3Response = await Utils.sendRequestSilent(
      'Validate File',
      API.hrCanEditMp3(id),
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
      text: 'If you delete this MP3, its permanent!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return API.deleteMp3(id)
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
