import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private router: Router, private authService: AuthService) {}

  logout() {
    this.authService.logout(); // Llama al método de logout del servicio de autenticación
    this.router.navigate(['/login']); // Redirige al usuario al login
  }
}
