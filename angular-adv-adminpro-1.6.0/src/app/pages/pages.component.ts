import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  public themeElemento = document.querySelector('#theme') || null;
  constructor() { }

  ngOnInit(): void {
    const _theme: string = localStorage.getItem('theme') || './assets/css/colors/red.css';

    if (this.themeElemento){
      this.themeElemento.setAttribute('href', _theme);
    }

  }
}
