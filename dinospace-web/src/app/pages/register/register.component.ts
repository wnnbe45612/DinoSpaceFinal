import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [FormsModule, RouterModule, CommonModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  step = 1;

  formData = {
    nombre: '',
    edad: null as number | null,
    genero: '',
    correo: '',
    ciclo: '',
    estadoEmocional: '',
    horasSueno: '',
    actividad: '',
    motivacion: '',
    password: '',
    confirmarPassword: '',
  };

  errors: any = {};

  constructor(private router: Router, private authService: AuthService) {}

  get progressPercentage(): number {
    return (this.step / 8) * 100;
  }

  // --- VALIDACIONES ---

  onlyLetters(event: KeyboardEvent) {
    const char = event.key;
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/.test(char)) {
      event.preventDefault();
    }
  }

  onPaste(event: ClipboardEvent) {
    const pasted = event.clipboardData?.getData('text') || '';
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(pasted)) {
      event.preventDefault();
    }
  }

  onFieldChange(field: string) {
    if (this.errors[field]) delete this.errors[field];
  }

  validateAge(): boolean {
    this.errors.edad = '';

    if (
      this.formData.edad === null ||
      this.formData.edad === undefined ||
      this.formData.edad === 0
    ) {
      this.errors.edad = 'La edad es obligatoria';
      return false;
    }

    const edad = Number(this.formData.edad);

    if (isNaN(edad)) {
      this.errors.edad = 'Debes ingresar un número válido';
      return false;
    } else if (edad < 17 || edad > 65) {
      this.errors.edad = 'La edad debe estar entre 17 y 65 años';
      return false;
    }

    return true;
  }

  validateEmail(): boolean {
    this.errors.correo = '';
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!this.formData.correo.trim()) {
      this.errors.correo = 'El correo es obligatorio';
      return false;
    } else if (!pattern.test(this.formData.correo)) {
      this.errors.correo = 'Ingresa un correo válido';
      return false;
    }

    return true;
  }

  validatePassword(): boolean {
    this.errors.password = '';

    if (!this.formData.password) {
      this.errors.password = 'La contraseña es obligatoria';
      return false;
    } else if (this.formData.password.length < 6) {
      this.errors.password = 'La contraseña debe tener al menos 6 caracteres';
      return false;
    }

    return true;
  }

  validateConfirmPassword(): boolean {
    this.errors.confirmarPassword = '';

    if (!this.formData.confirmarPassword) {
      this.errors.confirmarPassword = 'Debes confirmar la contraseña';
      return false;
    } else if (this.formData.password !== this.formData.confirmarPassword) {
      this.errors.confirmarPassword = 'Las contraseñas no coinciden';
      return false;
    }

    return true;
  }

  // --- NAVEGACIÓN ENTRE PASOS ---

  nextStep(): void {
    if (this.validateCurrentStep()) {
      this.step++;
    }
  }

  prevStep(): void {
    if (this.step > 1) this.step--;
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  validateCurrentStep(): boolean {
    this.errors = {};
    let isValid = true;

    switch (this.step) {
      case 1:
        if (!this.formData.nombre.trim()) {
          this.errors.nombre = 'El nombre es obligatorio';
          isValid = false;
        }
        if (!this.validateAge()) {
          isValid = false;
        }
        if (!this.formData.genero) {
          this.errors.genero = 'Selecciona un género';
          isValid = false;
        }
        break;

      case 2:
        if (!this.validateEmail()) {
          isValid = false;
        }
        break;

      case 3:
        if (!this.formData.ciclo) {
          this.errors.ciclo = 'Selecciona tu ciclo';
          isValid = false;
        }
        break;

      case 4:
        if (!this.formData.estadoEmocional) {
          this.errors.estadoEmocional = 'Selecciona cómo te sientes';
          isValid = false;
        }
        break;

      case 5:
        if (!this.formData.horasSueno) {
          this.errors.horasSueno = 'Selecciona tus horas de sueño';
          isValid = false;
        }
        break;

      case 6:
        if (!this.formData.actividad) {
          this.errors.actividad = 'Selecciona una opción';
          isValid = false;
        }
        break;

      case 7:
        if (!this.formData.motivacion) {
          this.errors.motivacion = 'Selecciona el tipo de motivación';
          isValid = false;
        }
        break;

      case 8:
        if (!this.validatePassword()) {
          isValid = false;
        }
        if (!this.validateConfirmPassword()) {
          isValid = false;
        }
        break;
    }

    return isValid;
  }

  // --- ENVÍO DEL FORMULARIO FINAL ---
  submitForm(): void {
    if (this.validateCurrentStep()) {
      const dataToSend = {
        nombre: this.formData.nombre,
        edad: this.formData.edad,
        genero: this.formData.genero,
        correo: this.formData.correo, // El AuthController espera 'correo' para registro
        ciclo: this.formData.ciclo,
        estadoEmocional: this.formData.estadoEmocional,
        horasSueno: this.formData.horasSueno,
        actividad: this.formData.actividad,
        motivacion: this.formData.motivacion,
        password: this.formData.password,
      };

      this.authService.register(dataToSend).subscribe({
        next: (resp: any) => {
          localStorage.setItem('token', resp.token);
          localStorage.setItem('user', JSON.stringify(resp.user));

          alert('¡Registro exitoso! Bienvenido a DinoSpace');
          this.router.navigate(['/dashboard']);
        },
        error: (error: any) => {
          console.error('❌ Error en el registro:', error);

          if (error.error?.errors) {
            this.errors = error.error.errors;
          } else {
            alert('Error en el servidor. Intenta nuevamente.');
          }
        },
      });
    }
  }
}
