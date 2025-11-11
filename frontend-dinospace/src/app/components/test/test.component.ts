import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface FormData {
  nombre: string;
  edad: number | null;
  genero: string;
  correo: string;
  ciclo: string;
  estadoEmocional: string;
  horasSueno: string;
  actividad: string;
  motivacion: string;
  password: string;
  confirmarPassword: string;
}

interface FormErrors {
  nombre?: string;
  edad?: string;
  genero?: string;
  correo?: string;
  ciclo?: string;
  estadoEmocional?: string;
  horasSueno?: string;
  actividad?: string;
  motivacion?: string;
  password?: string;
  confirmarPassword?: string;
  [key: string]: string | undefined;
}

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent {
  step = 1;

  formData: FormData = {
    nombre: '',
    edad: null,
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

  errors: FormErrors = {};

  // Inyección del Router
  constructor(private router: Router) {}

  // Método para volver al home
  goToHome(): void {
    this.router.navigate(['/']);
  }

  // Cálculo del progreso dinámico
  get progressPercentage(): number {
    const total = this.getTotalFieldsForCurrentStep();
    const completed = this.getCompletedFieldsForCurrentStep();
    const base = ((this.step - 1) / 8) * 100;
    const stepProgress = (completed / total) * (100 / 8);
    return Math.min(base + stepProgress, 100);
  }

  private getTotalFieldsForCurrentStep(): number {
    const map: Record<number, number> = {
      1: 3,
      2: 1,
      3: 1,
      4: 1,
      5: 1,
      6: 1,
      7: 1,
      8: 2,
    };
    return map[this.step] ?? 1;
  }

  private getCompletedFieldsForCurrentStep(): number {
    const f = this.formData;
    let c = 0;
    switch (this.step) {
      case 1:
        if (f.nombre) c++;
        if (f.edad) c++;
        if (f.genero) c++;
        break;
      case 2:
        if (f.correo) c++;
        break;
      case 3:
        if (f.ciclo) c++;
        break;
      case 4:
        if (f.estadoEmocional) c++;
        break;
      case 5:
        if (f.horasSueno) c++;
        break;
      case 6:
        if (f.actividad) c++;
        break;
      case 7:
        if (f.motivacion) c++;
        break;
      case 8:
        if (f.password) c++;
        if (f.confirmarPassword) c++;
        break;
    }
    return c;
  }

  onlyLetters(event: KeyboardEvent): void {
    const char = event.key;
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/.test(char)) event.preventDefault();
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const text = event.clipboardData?.getData('text') ?? '';
    const clean = text.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    this.formData.nombre += clean;
  }

  validateAge(): void {
    const edad = this.formData.edad;
    if (edad == null) {
      this.errors.edad = '';
      return;
    }
    if (edad < 17) this.errors.edad = 'Debes tener al menos 17 años';
    else if (edad > 65) this.errors.edad = 'Debe ser menor a 66 años';
    else this.errors.edad = '';
  }

  validateEmail(): void {
    const correo = this.formData.correo;
    if (!correo) {
      this.errors.correo = '';
      return;
    }
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.errors.correo = !pattern.test(correo)
      ? 'Formato de correo inválido. Ejemplo: usuario@email.com'
      : '';
  }

  validatePassword(): void {
    const p = this.formData.password;
    if (!p) {
      this.errors.password = '';
      return;
    }
    if (p.length < 6) this.errors.password = 'La contraseña debe tener al menos 6 caracteres';
    else if (!/[A-Z]/.test(p)) this.errors.password = 'Debe incluir al menos una letra mayúscula';
    else if (!/[0-9]/.test(p)) this.errors.password = 'Debe incluir al menos un número';
    else this.errors.password = '';

    if (this.formData.confirmarPassword) this.validateConfirmPassword();
  }

  validateConfirmPassword(): void {
    const cp = this.formData.confirmarPassword;
    if (!cp) {
      this.errors.confirmarPassword = '';
      return;
    }
    this.errors.confirmarPassword =
      cp !== this.formData.password ? 'Las contraseñas no coinciden' : '';
  }

  clearError(f: keyof FormErrors): void {
    this.errors[f] = '';
  }

  onFieldChange(field: keyof FormErrors): void {
    this.clearError(field);
  }

  validateCurrentStep(): boolean {
    const f = this.formData;
    const e = this.errors;
    let valid = true;

    const setErr = (key: keyof FormErrors, msg: string) => {
      e[key] = msg;
      valid = false;
    };

    switch (this.step) {
      case 1:
        if (!f.nombre.trim()) setErr('nombre', 'El nombre es obligatorio');
        if (!f.edad) setErr('edad', 'La edad es obligatoria');
        else if (f.edad < 17 || f.edad > 65) setErr('edad', 'Debe tener entre 17 y 65 años');
        if (!f.genero) setErr('genero', 'Selecciona un género');
        break;
      case 2:
        const pat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!f.correo) setErr('correo', 'El correo es obligatorio');
        else if (!pat.test(f.correo)) setErr('correo', 'Correo inválido');
        break;
      case 3:
        if (!f.ciclo) setErr('ciclo', 'Selecciona un ciclo');
        break;
      case 4:
        if (!f.estadoEmocional) setErr('estadoEmocional', 'Selecciona un estado emocional');
        break;
      case 5:
        if (!f.horasSueno) setErr('horasSueno', 'Selecciona una opción');
        break;
      case 6:
        if (!f.actividad) setErr('actividad', 'Selecciona una opción');
        break;
      case 7:
        if (!f.motivacion) setErr('motivacion', 'Selecciona una opción');
        break;
      case 8:
        this.validatePassword();
        this.validateConfirmPassword();
        if (e.password || e.confirmarPassword) valid = false;
        break;
    }
    return valid;
  }

  nextStep(): void {
    if (this.validateCurrentStep() && this.step < 8) this.step++;
  }

  prevStep(): void {
    if (this.step > 1) this.step--;
  }

  submitForm(): void {
    if (!this.validateCurrentStep()) return;
    console.log('Formulario enviado:', this.formData);
    alert('¡Bienvenido a DINOSPACE!');
  }
}
