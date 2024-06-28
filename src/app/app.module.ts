import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PredictionComponent } from '../app/prediction/prediction.component';  // Adjust the path as necessary

const routes: Routes = [
  { path: '', redirectTo: '/prediction', pathMatch: 'full' },
  { path: 'prediction', component: PredictionComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PredictionComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)],
  providers: [
    provideClientHydration()
  ],
    bootstrap: [AppComponent]
})
export class AppModule { }
