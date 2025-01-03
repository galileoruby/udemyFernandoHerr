import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  public themeElemento = document.querySelector('#theme');
  public links: NodeListOf<Element>;

  //inicializa valores para la clase
  constructor() { }

  //todo::los elementos del componente ahora estan disponibles
  // que el .selector no esta disponible en el constructor en onInit ya esta visible/disponible/creado
  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector');
    this.checkCurrentTheme();
  }

  changeTheme(theme: string): void {
    console.log(theme);
    const url = `./assets/css/colors/${theme}.css`

    if (this.themeElemento) {
      this.themeElemento.setAttribute('href', url);
      localStorage.setItem('theme', url);
      this.checkCurrentTheme();
    }
  }

  checkCurrentTheme(): void {

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