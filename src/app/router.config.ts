import {Route} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {DesafiosComponent} from "./desafios/desafios.component";

export const routerConfig: Route[] =[
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'desafios',
    component: DesafiosComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
