import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from '../supabase.service';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 



@Component({
  standalone: true,
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css'],
  imports: [CommonModule, RouterModule], 
})
export class DetallesComponent implements OnInit {
  currentProperty: any = null;
  feedback: any[] = [];

  constructor(private route: ActivatedRoute, private supabaseService: SupabaseService) {}

  async ngOnInit() {
  this.route.queryParams.subscribe(async (params) => {
    const id = params['id'];
    if (id) {
      const { data } = await this.supabaseService.getPropertyById(id);
      if (data) {
        this.currentProperty = {
          id: data.id,
          title: data.name,
          price: `$${data.Price} por noche`,
          priceNumber: data.Price,
          description: 'Una propiedad hermosa para tu estadía.',
          address: 'Dirección de ejemplo',
          img: data.Img,
          amenities: ['Wifi', 'Cocina', 'Aire acondicionado'],
        };

        const feedbackResult = await this.supabaseService.getFeedbackByProperty(data.id);
        if (!feedbackResult.error) {
          this.feedback = feedbackResult.data ?? [];
        }
      }
    }
  });
}
}
