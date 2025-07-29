import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonItem, 
  IonInput, 
  IonButton, 
  IonIcon,
  IonToast 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  musicalNotes, 
  mail, 
  lockClosed, 
  eye, 
  eyeOff, 
  logIn, 
  alertCircle 
} from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonItem, 
    IonInput, 
    IonButton, 
    IonIcon,
    IonToast,
    CommonModule, 
    ReactiveFormsModule
  ]
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  showToast = false;
  toastMessage = '';
  toastColor = 'success';

  validation_messages = {
    'email': [
      { type: 'required', message: 'El correo electrónico es obligatorio.' },
      { type: 'email', message: 'Ingresa un correo electrónico válido.' }
    ],
    'password': [
      { type: 'required', message: 'La contraseña es obligatoria.' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres.' },
      { type: 'pattern', message: 'La contraseña debe contener al menos una letra y un número.' }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private storage: Storage
  ) {
    addIcons({
      musicalNotes,
      mail,
      lockClosed,
      eye,
      eyeOff,
      logIn,
      alertCircle
    });

    this.createForm(); // Crear el formulario inmediatamente
  }

  async ngOnInit() {
    await this.storage.create();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/)
      ]]
    });
  }

  isFieldInvalid(field: string): boolean {
    const formField = this.loginForm.get(field);
    return !!(formField && formField.invalid && (formField.dirty || formField.touched));
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Simulación de autenticación básica
      if (email === 'kristell@music.com' && password === 'music123') {
        await this.storage.set('login', true);
        await this.storage.set('userEmail', email);

        this.showSuccessMessage('¡Bienvenida! Inicio de sesión exitoso.');

        setTimeout(() => {
          this.router.navigate(['/intro']);
        }, 1500);
      } else {
        this.showErrorMessage('Credenciales incorrectas. Intenta nuevamente.');
      }
    } else {
      this.showErrorMessage('Por favor, completa todos los campos correctamente.');
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  showSuccessMessage(message: string) {
    this.toastMessage = message;
    this.toastColor = 'success';
    this.showToast = true;
  }

  showErrorMessage(message: string) {
    this.toastMessage = message;
    this.toastColor = 'danger';
    this.showToast = true;
  }
}
