import { Routes } from '@angular/router';

import { HomeComponent } from 'src/app/pages/home/home.component';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { RegisterComponent } from 'src/app/pages/register/register.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
  },

  {
    path: 'reto-diario',
    loadComponent: () =>
      import('src/app/pages/reto-diario/reto-diario.component').then((m) => m.RetoDiarioComponent),
  },

  {
    path: 'recomendaciones',
    loadComponent: () =>
      import('src/app/pages/recomendaciones/recomendaciones.component').then(
        (m) => m.RecomendacionesComponent
      ),
  },

  {
    path: 'dinobot',
    loadComponent: () =>
      import('src/app/pages/dinobot/dinobot.component').then((m) => m.DinobotComponent),
  },
];
