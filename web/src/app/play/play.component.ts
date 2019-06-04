import { Component, OnInit, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  handleFullscreen = this.openFullscreen;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private interactionService: InteractionService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    setTimeout(() => this.toastr.info('<b>Pausar</b>: Barra espaciadora o Clic<br><b>Pantalla completa</b>: F o Doble clic', null, {
      progressBar: true,
      timeOut: 10000,
      enableHtml: true,
      positionClass: 'toast-bottom-center'
    }));

    this.document.addEventListener('click', this.playOrPause.bind(this));
    this.document.addEventListener('dblclick', this.handleFullscreen.bind(this));
    this.document.addEventListener('keyup', (e: any) => this.handleKey(e.keyCode));
    this.document.addEventListener('fullscreenchange', () => {
      if (this.handleFullscreen === this.openFullscreen) {
        this.handleFullscreen = this.closeFullscreen;
      } else {
        this.handleFullscreen = this.openFullscreen;
      }
    });

    this.interactionService.getInteractionJson().subscribe((data) => {
      this.changeVideo(data.init);
    });
  }

  private changeVideo(key: string): boolean {
    $('.container').hide();
    clearTimeout(this.electionTimer);
    this.interactionService.getInteractionJson().subscribe((data) => {
      $('.video-player').attr('src', env.environment.server + key);
      const videoPlayer: HTMLVideoElement = <HTMLVideoElement> $('.video-player')[0];
      videoPlayer.load();

      const nextOptions = data[key];
      if (!nextOptions) {
        $('.video-player').unbind('ended').on('ended', this.showDone.bind(this));
      } else {
        $('.video-player').unbind('ended').on('ended', this.showOptions.bind(this));
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

  private playOrPause(): void {
    const videoPlayer: HTMLVideoElement = <HTMLVideoElement> $('.video-player')[0];
    if (!videoPlayer.ended) {
      if (videoPlayer.paused) {
        videoPlayer.play();
      } else {
        videoPlayer.pause();
      }
    }
  }

  private handleKey(keyCode: number): void {
    if (keyCode === 32 || keyCode === 80) {
      this.playOrPause();
    } else if (keyCode === 70) {
      this.handleFullscreen();
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

  private closeFullscreen(): void {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }

}
