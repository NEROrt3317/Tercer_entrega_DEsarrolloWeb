import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../supabase.service';

@Component({
  standalone: true,
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class ReservaComponent implements OnInit {
  price: number = 0;
  propertyId: number = 0;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private supabaseService: SupabaseService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.propertyId = +params['id'] || 0;
      this.price = +params['price'] || 0;

      const subtotalElement = document.getElementById('subtotal');
      if (subtotalElement) {
        subtotalElement.textContent = `Subtotal: $${this.price}`;
      }
    });
  }

  async pagar() {
    const cardNumber = (document.getElementById('card-number') as HTMLInputElement).value.trim();
    const expiry = (document.getElementById('card-expiry') as HTMLInputElement).value.trim();
    const cvc = (document.getElementById('card-cvc') as HTMLInputElement).value.trim();

    this.successMessage = '';
    this.errorMessage = '';

    if (!cardNumber || !expiry || !cvc) {
      this.errorMessage = 'Por favor completa todos los campos de pago.';
      return;
    }

    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      this.errorMessage = 'Debes iniciar sesión para reservar.';
      return;
    }

    const user = JSON.parse(userData);
    const userId = user.id;

    const { data, error } = await this.supabaseService.createBooking(userId, this.propertyId);

    if (error) {
      this.errorMessage = 'Error al guardar la reserva.';
    } else {
      this.successMessage = '¡Reserva realizada con éxito!';
      setTimeout(() => this.router.navigate(['/mis-reservas']), 2000);
    }
  }
}
