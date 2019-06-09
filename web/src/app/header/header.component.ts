import { Component, OnInit } from '@angular/core';
import * as config from '../config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  producer = config.producer;
  project = config.project;
  team = config.team;
  contact = config.contact;

  emailAddress = config.emailAddress;

  constructor() { }

  ngOnInit() {
  }

}
