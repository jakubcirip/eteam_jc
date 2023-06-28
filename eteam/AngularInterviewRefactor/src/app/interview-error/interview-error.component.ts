import { saveAs as importedSaveAs } from 'file-saver';

import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../interview.service';
import { Utils } from '../services/Utils';
import API from '../services/API';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { __ } from '../utils.service';

@Component({
  selector: 'app-interview-error',
  templateUrl: './interview-error.component.html',
  styleUrls: ['./interview-error.component.scss'],
})
export class InterviewErrorComponent implements OnInit {
  constructor(private int: InterviewService, private http: HttpClient) {}

  ngOnInit(): void {
    this.int.isDark
      ? $('body').addClass('dark-version')
      : $('body').removeClass('dark-version');
  }

  async generateZip() {
    Swal.fire({
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    const url2 = environment.api + '/public/generate-interview-zip';

    fetch(url2, {
      method: 'POST',
      body: JSON.stringify({
        data: JSON.stringify(this.int.generateResponseData()),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'interview-export.zip';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);

        Swal.fire(
          __('interviewError.successPopup.title'),
          __('interviewError.successPopup.text'),
          'success',
        );
      })
      .catch((err) => {
        console.log(err);
        Swal.fire(
          __('interviewError.errorPopup.title'),
          __('interviewError.errorPopup.text'),
          'error',
        );
      });
  }
}
