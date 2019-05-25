import { Component, OnInit, Inject } from '@angular/core';
import * as $ from 'jquery';

import { InteractionService } from '../interaction.service';
import * as config from '../config';
import * as env from '../../environments/environment';
import { DOCUMENT } from '@angular/platform-browser';


@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss'],
  providers: [InteractionService]
})
export class PlayComponent implements OnInit {

  doneButtonText = config.doneButtonText;
  electionTimer = null;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private interactionService: InteractionService
  ) { }

  ngOnInit() {
    document.addEventListener('keyup', (e) => this.handleKey(e.keyCode));
    this.interactionService.getInteractionJson().subscribe((data) => {
      this.changeVideo(data.init);
    });
  }

  private changeVideo(key: string): boolean {
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

  private showOptions(): boolean {
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

  private showDone(): boolean {
    $('.done').show();
    return false;
  }

  private handleKey(keyCode: number): void {
    if (keyCode === 32 || keyCode === 80) {
      const videoPlayer: HTMLVideoElement = <HTMLVideoElement> $('.video-player')[0];
      if (videoPlayer.paused) {
        videoPlayer.play();
      } else {
        videoPlayer.pause();
      }
    } else if (keyCode === 70) {
      this.openFullscreen();
    }
  }

  private openFullscreen(): void {
    const elem: HTMLElement | any = this.document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  }

}
