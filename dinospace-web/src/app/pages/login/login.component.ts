import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    // Validaciones básicas
    if (!this.email.trim() || !this.password.trim()) {
      this.errorMessage = 'Por favor, completa todos los campos';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (resp: any) => {
        this.isLoading = false;

        // Verificar que la respuesta tenga token y user
        if (resp.token && resp.user) {
          // Guardar token y datos del usuario en localStorage
          localStorage.setItem('token', resp.token);
          localStorage.setItem('user', JSON.stringify(resp.user));

          console.log('✅ Login exitoso:', resp.user);
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Respuesta inválida del servidor';
        }
      },
      error: (error: any) => {
        this.isLoading = false;
        console.error('❌ Error en el login:', error);

        // Manejar diferentes tipos de errores
        if (error.status === 401) {
          this.errorMessage = 'Credenciales incorrectas. Verifica tu email y contraseña.';
        } else if (error.status === 404) {
          this.errorMessage = 'Usuario no encontrado.';
        } else if (error.status === 422) {
          // Manejar errores de validación de Laravel
          if (error.error.errors) {
            const firstError = Object.values(error.error.errors)[0];
            this.errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
          } else {
            this.errorMessage = error.error.message || 'Error de validación';
          }
        } else if (error.error?.message) {
          this.errorMessage = error.error.message;
        } else if (error.status === 0) {
          this.errorMessage = 'No se puede conectar al servidor. Verifica tu conexión.';
        } else {
          this.errorMessage = 'Error del servidor. Intenta nuevamente.';
        }
      },
    });
  }

  // Método para regresar al home
  goToHome(): void {
    this.router.navigate(['/']);
  }
  // Método para limpiar el mensaje de error cuando el usuario escribe
  onInputChange() {
    if (this.errorMessage) {
      this.errorMessage = '';
    }
  }
}
