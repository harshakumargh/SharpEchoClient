import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchdetailsComponent } from './matchdetails/matchdetails.component';
import { MatchupsComponent } from './matchups/matchups.component';

const routes: Routes = [
  { path:'matchdetails', component:MatchdetailsComponent},
  { path:'matchups', component:MatchupsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
