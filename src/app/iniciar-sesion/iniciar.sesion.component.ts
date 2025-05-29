import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../supabase.service';
import { RouterModule } from '@angular/router'; 

@Component({
  standalone: true,
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css'],
  imports: [CommonModule, FormsModule, RouterModule] 
})
export class IniciarSesionComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private supabaseService: SupabaseService, private router: Router) {}

  async onLogin() {
  this.errorMessage = '';

  const { data, error } = await this.supabaseService.loginUser(this.email, this.password);

  if (error || !data) {
    this.errorMessage = 'Correo o contraseña incorrectos.';
    return;
  }

  if (typeof data === 'object') {
    localStorage.setItem('currentUser', JSON.stringify(data));
    this.router.navigate(['/page']);
  } else {
    console.error('Data no válida al hacer login:', data);
    this.errorMessage = 'Error interno al iniciar sesión.';
  }
}
}