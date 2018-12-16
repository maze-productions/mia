import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IndividualComponent } from './individual/individual.component';
import { GroupComponent } from './group/group.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: '',           component: HomeComponent },
  { path: 'individual', component: IndividualComponent },
  { path: 'group',      component: GroupComponent },
  { path: '**',         component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
