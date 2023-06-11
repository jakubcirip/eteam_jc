import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal, [modal]',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() title = '';
  @Input() text = '';
  @Input() image: string = null;
  @Input() id: string;

  constructor() {}

  ngOnInit() {}
}
