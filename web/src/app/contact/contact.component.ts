import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import * as config from '../config';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, AfterViewInit, OnDestroy  {

  instagramUser = config.instagramUser;
  emailAddress = config.emailAddress;

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
