import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private themeElemento = document.querySelector('#theme') || null;
  private links!: NodeListOf<Element>;

  constructor() {
    const _theme: string = localStorage.getItem('theme') || './assets/css/colors/red.css';

    if (this.themeElemento) {
      this.themeElemento.setAttribute('href', _theme);
    }    
  }

  changeTheme(theme: string): void {
    console.log(theme);
    const url = `./assets/css/colors/${theme}.css`

    if (this.themeElemento) {
      this.themeElemento.setAttribute('href', url);
      localStorage.setItem('theme', url);
    }
    this.checkCurrentTheme();
  }

  checkCurrentTheme(): void {
    //malas-practicas:: como es un servicio no debe saltar continuamente al dom
    ///como son 10 elementos o menos no es un problema
    this.links = document.querySelectorAll('.selector');
    this.links.forEach(element => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`
      const currentTheme = this.themeElemento?.getAttribute('href');
      if (btnThemeUrl === currentTheme) {
        element.classList.add('working');
      }
    });
  }
}