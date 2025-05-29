import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'page', pathMatch: 'full' },
  { path: 'feedback', loadComponent: () => import('./feedback/feedback.component').then(m => m.FeedbackComponent) },
  { path: 'reserva', loadComponent: () => import('./reserva/reserva.component').then(m => m.ReservaComponent) },
  { path: 'mis-reservas', loadComponent: () => import('./mis-reservas/mis-reservas.component').then(m => m.MisReservasComponent) },
  { path: 'detalles', loadComponent: () => import('./detalles/detalles.component').then(m => m.DetallesComponent) },
  { path: 'page', loadComponent: () => import('./page/page.component').then(m => m.PageComponent) },
  { path: 'iniciar-sesion', loadComponent: () => import('./iniciar-sesion/iniciar.sesion.component').then(m => m.IniciarSesionComponent) },
  { path: 'registrar', loadComponent: () => import('./registrar/registrar.component').then(m => m.RegistrarComponent) },
  { path: 'perfil', loadComponent: () => import('./perfil/perfil.component').then(m => m.ProfileComponent) },
];
