import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import API, { GetHrInterviewImagesResponse } from 'src/services/API';
import { DomSanitizer } from '@angular/platform-browser';
import { Utils } from 'src/services/Utils';

declare const $: any;
declare const Swal: any;

@Component({
  selector: 'app-fast-interview-settings',
  templateUrl: './fast-interview-settings.component.html',
  styleUrls: ['./fast-interview-settings.component.scss'],
})
export class FastInterviewSettingsComponent implements OnInit {
  @Output() onImportEvent = new EventEmitter();
  imageData = '';
  imageType = '';
  nameData = '';
  pageColor = '';
  pageBgColor = '';
  prelogData = '';
  startDate = '';
  endDate = '';
  remindDate = '';

  public Math = Math;

  apiUrl = environment.api;
  maxImages = 4;
  images: GetHrInterviewImagesResponse['images'] = [];

  constructor(private DomSanitizationService: DomSanitizer) {}

  async ngOnInit() {
    this.images = (await API.getHrInterviewImages()).images;
  }

  onSubmit() {
    const canContinue = this.checkData();
    if (!canContinue) {
      return;
    }
    this.onImportEvent.emit({
      imageData: this.imageData,
      imageType: this.imageType,
      name: this.nameData,
      color: this.pageColor,
      isDark: this.pageBgColor === 'dark',
      prelog: this.prelogData,
      startDate: new Date(this.startDate),
      endDate: new Date(this.endDate),
      remindDate: new Date(this.remindDate),
    });
  }

  checkData(): boolean {
    if (
      !this.imageData ||
      !this.imageType ||
      !this.nameData ||
      !this.pageColor ||
      !this.pageBgColor ||
      !this.prelogData ||
      !this.startDate ||
      !this.endDate ||
      !this.remindDate
    ) {
      console.log(
        this.imageData,
        this.imageType,
        this.nameData,
        this.pageColor,
        this.pageBgColor,
        this.prelogData,
        this.startDate,
        this.endDate,
        this.remindDate,
      );
      Swal.fire({
        type: 'error',
        title: 'Fast Interview Error',
        text: 'Please fill in all fields.',
      });

      return false;
    }

    return true;
  }

  onStartDateChange(event: any) {
    this.startDate = event.value;
  }

  onEndDateChange(event: any) {
    this.endDate = event.value;
  }

  onRemindDateChange(event: any) {
    this.remindDate = event.value;
  }

  shortImageData(data: string) {
    if (data.length < 55) {
      return data;
    }

    return data.substring(0, 50) + '...';
  }

  getImageUrl(data: string, type: string) {
    if (type === 'apiurl') {
      return environment.api + '/public/backgrounds/' + data;
    } else if (type === 'externalUrl') {
      return data;
    } else if (type === 'customImage') {
      return data;
    }

    return data;
  }

  loadMoreImages() {
    this.maxImages += 4;
  }

  async onSelectBackgroundImage(
    img: GetHrInterviewImagesResponse['images'][number],
  ) {
    $('#backgrounds-modal').modal('hide');
    setTimeout(async () => {
      this.imageType = 'externalUrl';
      this.imageData = img.url;
    }, 100);
  }

  generatePreviewUrl() {
    const url = this.getImageUrl(this.imageData, this.imageData);
    return this.DomSanitizationService.bypassSecurityTrustUrl(url);
  }

  openImagePreview() {
    if (!this.imageData) {
      Swal.fire({
        title: 'No image provided',
        text: 'Please select image before trying to preview it.',
        type: 'warning',
      });
      return;
    }
    $('#preview-background-modal').modal('show');
  }

  async editImage() {
    const { value: option } = await Swal.fire({
      title: 'Select image type',
      text:
        'Select what kind of image do you want to use on your interview page.',
      input: 'select',
      inputOptions: {
        provided: 'Provided by Unsplash',
        custom: 'Upload your own image',
        externalUrl: 'Enter image URL',
      },
      inputPlaceholder: 'Select type',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (!value) {
            resolve('You need to select some type.');
          } else {
            resolve();
          }
        });
      },
    });

    if (option === 'provided') {
      this.maxImages = 4;
      setTimeout(() => {
        $('#backgrounds-modal').modal('show');
      }, 100);
    } else if (option === 'externalUrl') {
      const { value: name } = await Swal.fire({
        title: 'Enter image URL',
        text:
          'Please keep in mind, this image may stop working when owner of external image decides to remove it.',
        input: 'text',
        inputPlaceholder: 'Enter external URL',
      });

      if (name) {
        this.imageType = 'externalUrl';
        this.imageData = name;
      }
    } else if (option === 'custom') {
      const { value: file } = await Swal.fire({
        title: 'Select image File',
        input: 'file',
        inputAttributes: {
          accept: 'image/x-png,image/gif,image/jpeg',
          'aria-label': 'Upload your image File',
        },
      });

      if (file) {
        const reader = new FileReader();
        reader.onload = async (e: any) => {
          const data = e.target.result;
          this.imageType = 'customImage';
          this.imageData = data;
        };
        reader.readAsDataURL(file);
      }
    }
  }
}
