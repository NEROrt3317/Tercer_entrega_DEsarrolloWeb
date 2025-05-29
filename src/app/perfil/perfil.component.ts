import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  avatarUrl?: string;
}

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  imports: [CommonModule, RouterModule],
})
export class ProfileComponent implements OnInit {
  currentUser: UserProfile | null = null;

  ngOnInit(): void {
    // Suponiendo que guardas el usuario en localStorage al iniciar sesión:
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      try {
        const user = JSON.parse(stored);
        this.currentUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          // Si tienes más campos en tu objeto:
          phone: user.phone,
          address: user.address,
          avatarUrl: user.avatarUrl,
        };
      } catch (e) {
        console.error('No se pudo parsear currentUser:', e);
      }
    }
  }
}
