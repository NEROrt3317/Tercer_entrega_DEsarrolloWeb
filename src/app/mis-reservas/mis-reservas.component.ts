import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { SupabaseService } from '../supabase.service';

@Component({
  standalone: true,
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css'],
  imports: [CommonModule, RouterModule],
})
export class MisReservasComponent implements OnInit {
  reservations: Array<{
    id: number;
    property_id: number;
    property_name: string;
    img: string;
    in_time: string;
    out_time: string;
    coordinates?: [number, number];
  }> = [];

  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) {}

  async ngOnInit() {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      this.router.navigate(['/iniciar-sesion']);
      return;
    }
    const user = JSON.parse(userData);

    const { data, error } = await this.supabase.getBookingsByUser(user.id);
    if (error || !data) return;

    this.reservations = data.map((b: any) => ({
      id: b.id,
      property_id: b.property_id,
      property_name: b.Property.name,
      img: b.Property.Img,
      in_time: new Date(b.in_time).toLocaleDateString(),
      out_time: new Date(b.out_time).toLocaleDateString(),
      coordinates:
        b.Property.latitude != null && b.Property.longitude != null
          ? [b.Property.latitude, b.Property.longitude]
          : undefined,
    }));
  }

  leaveFeedback(reservation: any) {
    this.router.navigate(['/feedback'], {
      queryParams: {
        bookingId: reservation.id,
        propertyId: reservation.property_id,
      },
    });
  }
}
