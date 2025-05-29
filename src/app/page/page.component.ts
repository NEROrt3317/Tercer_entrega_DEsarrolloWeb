import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SupabaseService } from '../supabase.service';
import { Router } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  imports: [CommonModule, RouterModule]
})

export class PageComponent implements OnInit {
  isLoggedIn = false;
  userName = '';
  properties: {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
  }[] = [];

  constructor(private supabaseService: SupabaseService, private router: Router) {}

  async ngOnInit() {
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    this.userName = user.name || '';
    this.isLoggedIn = true;
  }

  const { data, error } = await this.supabaseService.getProperties();
  if (data) {
    this.properties = data.map((p: any) => ({
      id: p.id,
      title: p.name,
      description: `Precio: $${p.Price} por noche`,
      imageUrl: p.Img ?? 'https://via.placeholder.com/300x180?text=Sin+Imagen'
    }));
  }
}

  logout() {
    localStorage.removeItem('currentUser');
    this.isLoggedIn = false;
    this.userName = '';
    this.router.navigate(['/iniciar-sesion']); // Redirige al login
  }
}
