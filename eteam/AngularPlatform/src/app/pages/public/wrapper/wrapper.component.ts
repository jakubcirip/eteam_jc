import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
// Wrapper component used to wrap login, register and forgot-password components for company page if company is not logged in
export class WrapperComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
