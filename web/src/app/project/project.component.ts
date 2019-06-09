import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, AfterViewInit, OnDestroy  {

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
