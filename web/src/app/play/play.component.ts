import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { InteractionService } from '../interaction.service';
import * as config from '../config';
import * as env from '../../environments/environment';


@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
  providers: [InteractionService]
})
export class PlayComponent implements OnInit {

  doneButtonText = config.doneButtonText;
  electionTimer = null;

  constructor(private interactionService: InteractionService) { }

  ngOnInit() {
    this.interactionService.getInteractionJson().subscribe((data) => {
      this.changeVideo(data.init);
    });
  }

  private changeVideo(key: string) {
    $('.container').hide();
    if (this.electionTimer) {
      clearTimeout(this.electionTimer);
      this.electionTimer = null;
    }
    this.interactionService.getInteractionJson().subscribe((data) => {
      $('.video-player').attr('src', env.environment.server + key);
      const videoPlayer: HTMLVideoElement = <HTMLVideoElement> $('.video-player')[0];
      videoPlayer.load();

      const nextOptions = data[key];
      if (!nextOptions) {
        $('.video-player').unbind('ended').on('ended', this.showDone);
      } else {
        $('.video-player').unbind('ended').on('ended', this.showOptions);
        for (let i = 0; i < nextOptions.length; i++) {
          const buttonElement: HTMLAreaElement = <HTMLAreaElement> $('.options a').get(i);
          buttonElement.innerHTML = nextOptions[i].value;
          buttonElement.addEventListener('click', (e: Event) => this.changeVideo(nextOptions[i].key), {'once': true});
        }
      }
    });
    return false;
  }

  private showOptions() {
    $('.options').show();
    this.electionTimer = setTimeout(
      () => {
        const options = $('.options a');
        const optionToSelect = Math.floor(Math.random() * options.length);
        const buttonElement: HTMLAreaElement = <HTMLAreaElement> options.get(optionToSelect);
        buttonElement.click();
      }, config.timeToSelectInSeconds * 1000
    );
    return false;
  }

  private showDone() {
    $('.done').show();
    return false;
  }

}
