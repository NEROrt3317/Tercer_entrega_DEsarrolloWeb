import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../supabase.service';
import { RouterModule } from '@angular/router'; 

@Component({
  standalone: true,
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class RegistrarComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private supabaseService: SupabaseService, private router: Router) {}

  async onRegister() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    const { data, error } = await this.supabaseService.registerUser(
      this.name,
      this.email,
      this.password
    );

    if (error) {
      this.errorMessage = 'Error al registrar: ' + error.message;
    } else {
      this.router.navigate(['/page']);
    }
  }
}
