import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {

  constructor(
    private storage: Storage,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    await this.storage.create();
    
    // Verificar si el usuario ya vio la introducción
    const introSeen = await this.storage.get('introSeen');
    
    if (introSeen) {
      // Si ya vio la intro, redirigir al home
      this.router.navigate(['/home']);
      return false;
    }
    
    // Si no ha visto la intro, permitir acceso
    return true;
  }
}

