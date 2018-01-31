import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { TrashComponent } from './trash/index';
import { ArchiveComponent } from './archive/index';
import{SearchComponent}from './search/index';
// import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
  //    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'trash', component: TrashComponent },
  { path: 'archive', component: ArchiveComponent },
{path:'search',component:SearchComponent},
  // otherwise redirect to home
  { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);
