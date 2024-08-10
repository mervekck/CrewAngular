import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CrewCardPageComponent } from './crew-card-page/crew-card-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'crew-card/:id', component: CrewCardPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
