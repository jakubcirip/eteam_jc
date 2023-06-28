import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import API, {
  HrCanEditMp3Response,
  ImgArray,
  Mp3Array,
} from 'src/services/API';
import { Utils } from 'src/services/Utils';
import { SocketService } from '../socket.service';

declare const Swal: any;
declare const MediaRecorder: any;

@Component({
  selector: 'app-hr-fm-img',
  templateUrl: './hr-fm-img.component.html',
  styleUrls: ['./hr-fm-img.component.scss'],
})
export class HrFmImgComponent implements OnInit {
  files: ImgArray = null;

  stream;

  socketType = 'imgList';
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
    this.files = await API.getImg();
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
      ])
      .then(async (result) => {
        if (result.value) {
          const name = result.value[0];

          const { value: file } = await Swal.fire({
            title: 'Select Image File',
            input: 'file',
            inputAttributes: {
              accept: 'image/png',
              'aria-label': 'Upload your Image File',
            },
          });

          if (file) {
            const reader = new FileReader();
            reader.onload = async (e: any) => {
              const data = e.target.result;

              Swal.showLoading();

              await Utils.sendRequest(
                'File Upload',
                API.uploadImg(
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
        }
      });
  }

  async beforeEditFile(id, name) {
    let canEdit = true;
    const res: HrCanEditMp3Response = await Utils.sendRequestSilent(
      'Validate File',
      API.hrCanEditImg(id),
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
      title: 'Edit Image File',
      input: 'text',
      inputValue: name,
      inputPlaceholder: 'Enter new Image File Name',
      showCancelButton: true,
      confirmButtonText: 'Save',
      showLoaderOnConfirm: true,
      preConfirm: (newName) => {
        return API.updateImg(id, {}, { newName })
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
          title: `Edit Image File`,
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
      API.hrCanEditImg(id),
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
      text: 'If you delete this Image, its permanent!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return API.deleteImg(id)
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
