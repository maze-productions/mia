import { Component, OnInit } from '@angular/core';
import * as config from '../config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  facebookUser = config.facebookUser;
  instagramUser = config.instagramUser;
  twitterUser = config.twitterUser;
  emailAddress = config.emailAddress;

  constructor() { }

  ngOnInit() {
  }

}
