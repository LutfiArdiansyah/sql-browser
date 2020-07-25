import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ListTableComponent } from './list-table/list-table.component';
import { LandingComponent } from './landing/landing.component';
import { ListColumnComponent } from './list-column/list-column.component';
import { ListDataComponent } from './list-data/list-data.component';

const routes: Routes = [
  { path: 'landing/list-table', redirectTo: 'list-table', pathMatch: 'full' },
  {
    path: 'landing',
    component: LandingComponent,
    children: [
      { path: 'list-table', component: ListTableComponent },
      { path: 'list-column', component: ListColumnComponent },
      { path: 'list-data', component: ListDataComponent },
    ],
  },
  { path: '**', redirectTo: 'landing/list-table', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
