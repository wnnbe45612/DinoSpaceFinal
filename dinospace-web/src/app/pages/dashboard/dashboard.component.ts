import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: any = null;
  consejo: string = '';
  isMenuOpen: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Validar sesión
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    // Obtener el usuario
    this.user = this.authService.getUser();
    console.log('Usuario en el Dashboard:', this.user);

    // Generar un consejo por defecto
    this.consejo = 'Hoy es un buen día para aprender algo nuevo';
  }

  // Control del menú responsive
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  // Cerrar menú al hacer clic fuera de él
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.navbar') && !target.closest('.menu-toggle')) {
      this.isMenuOpen = false;
    }
  }

  // Cerrar sesión
  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.clearSession();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error en logout:', error);
        this.authService.clearSession();
        this.router.navigate(['/login']);
      },
    });
  }
}
