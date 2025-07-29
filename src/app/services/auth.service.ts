import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private storage: Storage,
    private router: Router
  ) {}

  async logout(): Promise<void> {
    try {
      await this.storage.create();
      // Borrar datos de login del Storage
      await this.storage.remove('login');
      await this.storage.remove('userEmail');
      await this.storage.remove('userData');
      
      // Redireccionar a login
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  async isLoggedIn(): Promise<boolean> {
    await this.storage.create();
    const loginStatus = await this.storage.get('login');
    return !!loginStatus;
  }

  async getUserEmail(): Promise<string | null> {
    await this.storage.create();
    return await this.storage.get('userEmail');
  }

  async getUserData(): Promise<any> {
    await this.storage.create();
    return await this.storage.get('userData');
  }
}

