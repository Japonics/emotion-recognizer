import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {StartOutletComponent} from './general/start-outlet/start-outlet.component';
import {TesterOutletComponent} from './tester/tester-outlet/tester-outlet.component';
import {TrainerOutletComponent} from './trainer/trainer-outlet/trainer-outlet.component';
import {CanvasDrawComponent} from './general/canvas-draw/canvas-draw.component';
import {Routing} from './routes';
import {WebWorkerService} from 'angular2-web-worker';
import {StorageService} from './services/storage.service';

@NgModule({
  declarations: [
    AppComponent,
    TesterOutletComponent,
    TrainerOutletComponent,
    StartOutletComponent,
    CanvasDrawComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Routing)
  ],
  providers: [
    WebWorkerService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
