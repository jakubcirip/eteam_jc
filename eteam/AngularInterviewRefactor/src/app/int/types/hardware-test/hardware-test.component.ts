import { Component, OnInit, Input } from '@angular/core';
import { Step } from '../../base/base.component';
import { AssistentService } from 'src/app/assistent.service';
import { InterviewService, InterviewType } from 'src/app/interview.service';
import { CamService } from 'src/app/hardware/cam.service';
import { __ } from 'src/app/utils.service';
import { MicService } from 'src/app/hardware/mic.service';

@Component({
  selector: 'app-hardware-test',
  templateUrl: './hardware-test.component.html',
  styleUrls: ['./hardware-test.component.scss'],
})
export class HardwareTestComponent implements OnInit {
  @Input() step: Step;

  InterviewType = InterviewType;

  constructor(
    public assistent: AssistentService,
    public int: InterviewService,
    private cam: CamService,
    private mic: MicService,
  ) {}

  ngOnInit() {
    $('#cam-modal').on('hidden.bs.modal	', () => {
      $('#cam-preview').html(
        '<p>' + __('hardwareTestPage.modal.loading') + ' ...</p>',
      );
    });
  }

  async onStartCameraInit() {
    await this.cam.init();
  }

  async onShowCameraPreview() {
    if (this.cam.stream) {
      const el = this.cam.stream.getPreview({ source: 'original' });
      el.style.width = '100%';
      $('#cam-preview').html(el);
      $('#cam-modal').modal('show');
    }
  }

  async toggleCameraStickyPreview() {
    this.int.setStickyHardware(!this.int.stickyHardwarePreview, this.cam);
  }

  async onStartMicInit() {
    await this.mic.init();
  }
  async onShowMinPreview() {
    $('#mic-modal').modal('show');
  }
}
