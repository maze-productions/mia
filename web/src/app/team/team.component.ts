import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit, AfterViewInit, OnDestroy  {

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
