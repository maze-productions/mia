import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';


import * as config from '../config';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, AfterViewInit, OnDestroy {
  errorTitle = config.errorTitle;
  errorSubtitle = config.errorSubtitle;
  errorButton = config.errorButton;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    document.querySelector('body').classList.add('white');
  }

  ngOnDestroy(): void {
    document.querySelector('body').classList.remove('white');
  }

}
