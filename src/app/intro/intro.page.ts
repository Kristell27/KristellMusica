import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButton, 
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  musicalNotesOutline, 
  headsetOutline, 
  heartOutline, 
  homeOutline,
  colorPaletteOutline,
  refreshOutline
} from 'ionicons/icons';

interface Slide {
  id: number;
  title: string;
  content: string;
  icon: string;
  image?: string;
  backgroundColor: string;
}

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButton, 
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    CommonModule, 
    FormsModule
  ]
})
export class IntroPage implements OnInit {

  slides: Slide[] = [
    {
      id: 1,
      title: '¡Bienvenido a KristellMusica!',
      content: 'Descubre un mundo de música increíble con nuestra aplicación. Explora géneros, artistas y canciones que te emocionarán.',
      icon: 'musical-notes-outline',
      backgroundColor: 'primary'
    },
    {
      id: 2,
      title: 'Experiencia Musical Única',
      content: 'Disfruta de audio de alta calidad y una interfaz intuitiva diseñada para los amantes de la música como tú.',
      icon: 'headset-outline',
      backgroundColor: 'secondary'
    },
    {
      id: 3,
      title: 'Tu Música Favorita',
      content: 'Crea listas de reproducción personalizadas, guarda tus canciones favoritas y descubre nueva música basada en tus gustos.',
      icon: 'heart-outline',
      backgroundColor: 'tertiary'
    },
    {
      id: 4,
      title: '¡Comienza tu Viaje Musical!',
      content: 'Todo está listo para que comiences. Explora, escucha y disfruta de la mejor experiencia musical.',
      icon: 'musical-notes-outline',
      backgroundColor: 'success'
    }
  ];

  currentTheme: string = 'light';
  isDarkTheme: boolean = false;
  currentSlideIndex: number = 0;

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    spaceBetween: 20,
    centeredSlides: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    }
  };

  constructor(
    private router: Router,
    private storage: Storage
  ) {
    addIcons({
      musicalNotesOutline,
      headsetOutline,
      heartOutline,
      homeOutline,
      colorPaletteOutline,
      refreshOutline
    });
  }

  async ngOnInit() {
    await this.storage.create();
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.currentTheme = this.isDarkTheme ? 'dark' : 'light';
    
    // Aplicar el tema al documento
    document.body.classList.toggle('dark', this.isDarkTheme);
  }

  async goToHome() {
    // Guardar en Storage que el usuario ya vio la intro
    await this.storage.set('introSeen', true);
    this.router.navigate(['/home']);
  }

  async showIntroAgain() {
    // Borrar del Storage la variable que indica que ya se vio la intro
    await this.storage.remove('introSeen');
    // Recargar la página de intro
    window.location.reload();
  }

  getSlideClass(slide: Slide): string {
    return `slide-${slide.backgroundColor} ${this.isDarkTheme ? 'dark-theme' : 'light-theme'}`;
  }

  onSlideChange(event: any) {
    this.currentSlideIndex = event.detail[0].activeIndex;
  }
}

