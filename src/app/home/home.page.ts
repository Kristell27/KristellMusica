import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular'
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {
  genres = [
    {
      title: "Salsa",
      image: "https://th.bing.com/th/id/R.6949a34dfcaa5a050dea54eda3b040c0?rik=kEZ1D5DBu2PZUA&pid=ImgRaw&r=0",
      description: "La salsa es un género musical y de baile que fusiona ritmos afrocaribeños como el son cubano, el mambo, la guaracha y el guaguancó, con influencias del jazz y la música latina de Nueva York en los años 60 y 70. Aunque su raíz es cubana, su desarrollo como “salsa” se consolidó en Puerto Rico y Nueva York. Hoy se baila con variantes en Colombia (estilo caleño), Venezuela, Panamá y otros países latinos, combinando percusión vibrante, metales potentes y letras de amor, fiesta y vida cotidiana."
    },
    {
      title: "Merengue",
      image: "https://f4.bcbits.com/img/0035067531_0",
      description: "El merengue es un ritmo y baile originario de República Dominicana, considerado su música nacional. Usa instrumentos como la güira, tambora y acordeón (especialmente en el merengue típico o cibaeño) o saxofón y metales en el merengue moderno de orquesta. Se caracteriza por su compás rápido en 2/4 y pasos sencillos con movimientos de cadera constantes. Ha influenciado géneros centroamericanos y caribeños, y forma parte de fiestas, tradiciones patrias y vida popular dominicana."
    },
    {
      title: "Champeta",
      image: "https://uvp.mx/uvpblog/wp-content/uploads/2020/04/Champeta-2.png",
      description: "La champeta es un género musical y cultural nacido en Cartagena de Indias, Colombia, con raíces profundas en ritmos africanos como el soukous congoleño, el highlife ghanés y el afrobeat nigeriano, mezclados con sonidos criollos y caribeños. Originalmente marginal, se baila con movimientos de cadera, pies rápidos y giros en pareja o en grupo, celebrando la resistencia y alegría de las comunidades afrodescendientes. Hoy es símbolo de identidad cartagenera y costeña, con fusiones modernas en champeta urbana y electrónica."
    },
    {
      title:  "Bachata",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDpDySERv2yrCR917KuWb2tD_r4WgrMjf82Q&s",
      description: "La Bachata  es un género musical y baile originario de la República Dominicana, considerado su baile nacional. Es muy popular por su ritmo rápido, pegadizo y sus pasos sencillos, lo que lo convierte en uno de los bailes latinos más accesibles y alegres para aprender."
    },
  ]
  storage: any;
async showIntroAgain() {
    // Borrar del Storage la variable que indica que ya se vio la intro
    await this.storage.remove('introSeen');
    // Recargar la página de intro
    window.location.reload();
  }
  constructor() {}
}


