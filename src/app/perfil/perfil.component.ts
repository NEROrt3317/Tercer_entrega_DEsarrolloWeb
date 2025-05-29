import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ¡Importante para ngModel!

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
  imports: [CommonModule, RouterModule, FormsModule], // Añade FormsModule aquí
})
export class ProfileComponent implements OnInit {
  currentUser: UserProfile | null = null;
  editedUser: UserProfile | null = null; // Copia para la edición
  isEditing: boolean = false; // Estado para controlar el modo de edición

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      try {
        const user = JSON.parse(stored);
        this.currentUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          avatarUrl: user.avatarUrl,
        };
        // Siempre crea una copia inicial para la edición
        this.editedUser = { ...this.currentUser };
      } catch (e) {
        console.error('No se pudo parsear currentUser:', e);
        this.currentUser = null;
        this.editedUser = null;
      }
    }
  }

  // Método para activar el modo de edición
  startEditing(): void {
    if (this.currentUser) {
      // Clona el usuario actual para evitar modificar el original directamente
      this.editedUser = { ...this.currentUser };
      this.isEditing = true;
    }
  }

  // Método para cancelar la edición
  cancelEditing(): void {
    if (this.currentUser) {
      // Restaura la copia editada a los valores originales
      this.editedUser = { ...this.currentUser };
    }
    this.isEditing = false;
  }

  // Método para guardar los cambios
  saveChanges(): void {
    if (this.editedUser) {
      // Actualiza el currentUser con los cambios de editedUser
      this.currentUser = { ...this.editedUser };

      // Simula guardar en localStorage (en un caso real, aquí llamarías a un servicio)
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

      console.log('Perfil actualizado:', this.currentUser);
      this.isEditing = false; // Sale del modo de edición
      alert('Perfil actualizado con éxito!'); // O un mensaje más elegante
    }
  }
}