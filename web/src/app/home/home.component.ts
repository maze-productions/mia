import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { InteractionService } from '../interaction.service';
import * as env from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [InteractionService]
})
export class HomeComponent implements OnInit {

  constructor(private interactionService: InteractionService) { }

  ngOnInit() {
    this.interactionService.getInteractionJson().subscribe((data) => {
      this.loadTrailer(data.trailer);
    });
  }

  private loadTrailer(key: string) {
    $('.trailer-player').attr('src', env.environment.server + key);
    const videoPlayer: HTMLVideoElement = <HTMLVideoElement> $('.trailer-player')[0];
    videoPlayer.load();
    videoPlayer.muted = true;
  }

}
