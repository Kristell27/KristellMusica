import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
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
  IonToast,
  IonButtons 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  personAdd, 
  person,
  mail, 
  lockClosed, 
  eye, 
  eyeOff, 
  alertCircle,
  arrowBack
} from 'ionicons/icons';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
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
    IonButtons,
    CommonModule, 
    ReactiveFormsModule
  ]
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  showToast = false;
  toastMessage = '';
  toastColor = 'success';

  validation_messages = {
    'nombre': [
      { type: 'required', message: 'El nombre es obligatorio.' },
      { type: 'minlength', message: 'El nombre debe tener al menos 2 caracteres.' },
      { type: 'pattern', message: 'El nombre solo puede contener letras.' }
    ],
    'apellido': [
      { type: 'required', message: 'El apellido es obligatorio.' },
      { type: 'minlength', message: 'El apellido debe tener al menos 2 caracteres.' },
      { type: 'pattern', message: 'El apellido solo puede contener letras.' }
    ],
    'email': [
      { type: 'required', message: 'El correo electrónico es obligatorio.' },
      { type: 'email', message: 'Ingresa un correo electrónico válido.' }
    ],
    'password': [
      { type: 'required', message: 'La contraseña es obligatoria.' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 8 caracteres.' },
      { type: 'pattern', message: 'La contraseña debe contener al menos una letra mayúscula, una minúscula y un número.' }
    ],
    'confirmPassword': [
      { type: 'required', message: 'Confirma tu contraseña.' }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private storage: Storage,
    private registerService: RegisterService
  ) {
    addIcons({
      personAdd,
      person,
      mail,
      lockClosed,
      eye,
      eyeOff,
      alertCircle,
      arrowBack
    });
  }

  async ngOnInit() {
    await this.storage.create();
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      nombre: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      ]],
      apellido: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]/)
      ]],
      confirmPassword: ['', [
        Validators.required
      ]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): {[key: string]: any} | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  isFieldInvalid(field: string): boolean {
    const formField = this.registerForm.get(field);
    return !!(formField && formField.invalid && (formField.dirty || formField.touched));
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  async onRegister() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      
      try {
        const result = await this.registerService.register(formData);
        
        if (result.accept) {
          // Registro exitoso
          await this.storage.set('userData', {
            nombre: formData.nombre,
            apellido: formData.apellido,
            email: formData.email
          });
          
          this.showSuccessMessage('¡Cuenta creada exitosamente! Redirigiendo al login...');
          
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        } else {
          // Registro fallido
          this.showErrorMessage(result.message || 'Error al crear la cuenta. Intenta nuevamente.');
        }
      } catch (error) {
        this.showErrorMessage('Error de conexión. Verifica tu internet e intenta nuevamente.');
      }
    } else {
      this.showErrorMessage('Por favor, completa todos los campos correctamente.');
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
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

