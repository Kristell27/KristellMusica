import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private storage: Storage,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    await this.storage.create();
    const isLoggedIn = await this.storage.get('login');
    
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

