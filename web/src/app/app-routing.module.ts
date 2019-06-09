import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlayComponent } from './play/play.component';
import { ErrorComponent } from './error/error.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
  { path: '',     component: HomeComponent },
  { path: 'play', component: PlayComponent },
  { path: 'project', component: ProjectComponent },
  { path: '**',   component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
