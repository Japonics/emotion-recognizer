import {Routes} from '@angular/router';
import {TrainerOutletComponent} from './trainer/trainer-outlet/trainer-outlet.component';
import {TesterOutletComponent} from './tester/tester-outlet/tester-outlet.component';
import {StartOutletComponent} from './general/start-outlet/start-outlet.component';

export const Routing: Routes = [
  {path: '', component: StartOutletComponent},
  {path: 'training', component: TrainerOutletComponent},
  {path: 'tester', component: TesterOutletComponent}
];
