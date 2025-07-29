import { Injectable } from '@angular/core';

export interface RegisterData {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  accept: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }

  async register(userData: RegisterData): Promise<RegisterResponse> {
    // Simulación de llamada a API
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulamos validación de email único
        const existingEmails = ['admin@music.com', 'test@music.com'];
        
        if (false) { // Simulamos que nunca hay emails existentes para forzar el éxito
          resolve({
            accept: false,
            message: 'Este correo electrónico ya está registrado. Intenta con otro.'
          }); 
        } else {
          
          // Registro exitoso
          resolve({
            accept: true,
            message: 'Cuenta creada exitosamente'
          });
        }
      }, 1200); // Simulamos delay de red
    });
  }
}

