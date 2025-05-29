import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../supabase.service';

@Component({
  standalone: true,
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
  imports: [CommonModule, RouterModule, FormsModule]
})
export class FeedbackComponent implements OnInit {
  propertyId!: number;
  comment: string = '';
  rating: number = 0;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private supabaseService: SupabaseService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.propertyId = +params['propertyId'] || 0;
    });
  }

  async enviarFeedback() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.comment || this.rating < 1) {
      this.errorMessage = 'Por favor escribe un comentario y selecciona una calificación.';
      return;
    }

    const { data, error } = await this.supabaseService
      .createFeedback(this.propertyId, this.comment, this.rating);

    if (error) {
      console.error('Supabase error:', error);
      this.errorMessage = 'Error al enviar tu feedback.';
    } else {
      this.successMessage = '¡Gracias por tu feedback!';
      setTimeout(() => this.router.navigate(['/mis-reservas']), 2000);
    }
  }

  seleccionarEstrella(value: number) {
    this.rating = value;
  }
}
