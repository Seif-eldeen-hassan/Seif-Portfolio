import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ServiceComponent } from './components/service/service.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
  {path : "home" , component : HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path : "about" , component : AboutComponent},
  {path : "services" , component : ServiceComponent},
  {path : "projects" , component : ProjectsComponent},
  {path : "projects/:project-category/:id/:name", component : ProjectDetailsComponent},
  {path : "projects/:project-type", component : ProjectsComponent},
  {path : "explore/contact" , component : ContactComponent},
];
